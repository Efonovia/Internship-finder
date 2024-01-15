import { google } from "googleapis"
import dotenv from "dotenv"
import ApplicationDatabase from "../models/application.mongo.js";
import { abbreviateMessage, getAllMail, getMailById, sendMail } from "../services/mail.services.js"

dotenv.config()

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const sendAndCreateNewApplication = async(req, res) => {
  try {
    const { companyId, studentId, companyMail, studentSchoolId, studentFullName, messageContent } = req.body
    console.log(req.body)
    const result = await sendMail(companyMail, studentSchoolId, studentFullName, messageContent)
    console.log("creating new application...")
    const newApplication = new ApplicationDatabase({
      applicationId: result.briefMessage.threadId,
      studentId: studentId,
      companyId: companyId,
      briefMessages: [result.briefMessage],
      detailedMessages: [result.detailedMessage],
      dateMade: new Date(),
    })
    
    console.log("saving the application...")
    newApplication.save()
    .then(savedApplication => {
      console.log('Application saved successfully:', savedApplication)
    })
    .catch(error => {
      console.error('Error saving application:', error)
    })
    return res.status(201).json({success: true, body: newApplication})
  } catch (error) {
    console.error('Error in readMail:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    })
  }
}

export const getNewMail = async(req, res) => {
  try {
    const studentId = req.params.studentId
    const applications = await ApplicationDatabase.find({ studentId })
    const data = await getAllMail("INBOX")
    let updates = applications.map(app => {
      return {applicationId: app.applicationId, briefMessages: [], detailedMessages: []}
    })
    for(const mail of data) {
      for (const application of applications) {
        if(application.applicationId === mail.threadId) {
          if(application.briefMessages.every(message => message.gmailId !== mail.id)) {
            const detailedMessage = await (await getMailById(mail.id)).data
            const briefMessage = abbreviateMessage(detailedMessage)
            let objToUpdate = updates.find(update => update.applicationId === application.applicationId)
            objToUpdate.briefMessages.push(briefMessage)
            objToUpdate.detailedMessages.push(detailedMessage)
          }
        }
      }
    }
    const updatePromises = updates.map(update => {
      const { applicationId, briefMessages, detailedMessages } = update;
      return ApplicationDatabase.updateOne(
          { applicationId },
          {
              $push: {
                  briefMessages: { $each: briefMessages },
                  detailedMessages: { $each: detailedMessages }
              }
          }
          )
      })
  
      await Promise.all(updatePromises)
      .then(results => {
          console.log("All updates successful:", results);
      })
      .catch(error => {
          console.error("Error updating applications:", error);
      });
    const updatedApplications = await ApplicationDatabase.find({})
    return res.status(201).json({success: true, body: updatedApplications})
  } catch (error) {
    console.error('Error in readMail:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    })
  }
}

export const viewMail = async(req, res) => {
  try {
    const { id, mailId } = req.body
    console.log(req.body)
    ApplicationDatabase.findOneAndUpdate(
        { _id: id, 'briefMessages.gmailId': mailId },
        { $set: { 'briefMessages.$.seen': true } },
      )
        .then(updatedApplication => {
          console.log(updatedApplication.briefMessages)
        })
        .catch(err => {
          console.error(err)
        });

    const formattedApplication = await ApplicationDatabase.findById(id)
    const formattedMessage = formattedApplication.briefMessages.find(message => message.gmailId === mailId)
    return res.status(201).json(formattedMessage)
  } catch (error) {
    console.error('Error in readMail:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    })
  }
}