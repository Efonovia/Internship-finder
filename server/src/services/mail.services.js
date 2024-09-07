import axios from "axios"
import { generateConfig } from "../utils.js"
import nodemailer from "nodemailer"
import { auth } from "../constants.js"
import { google } from "googleapis"
import dotenv from "dotenv"
import fs from "fs"
import path from "path"
import { getDirname } from '../utils.js';


dotenv.config()

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export const base64urlDecode = input => {
  // Replace base64url-specific characters
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');

  // Add padding if necessary
  const paddedBase64 = base64 + '==='.slice(0, (4 - base64.length % 4) % 4);

  // Decode base64
  const decoded = atob(paddedBase64);

  // Convert to UTF-8 string
  const utf8String = decodeURIComponent(escape(decoded));

  return utf8String;
}

export const getAllMail = async label => {
    const url = `https://gmail.googleapis.com/gmail/v1/users/efonovia18@gmail.com/messages?labelIds=${label}&maxResults=500`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config)
    return response.data.messages;
}

export const getMailById = async id => {
    const url = `https://gmail.googleapis.com/gmail/v1/users/efonovia18@gmail.com/messages/${id}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config)
    return response
}

export const readMailSent = async(nodeMailerId) => {
    try {
      const data = await getAllMail("SENT")
      for(let i=0; i<=data.length; i++) {
        const newResponse = await getMailById(data[i].id)
        const headers = newResponse.data.payload.headers
        const recentlySent = headers.find(header => header.name === "Message-ID" && header.value === nodeMailerId)
        if(recentlySent.value === nodeMailerId) {
          return newResponse.data
        }
      }
      
    } catch (error) {
      console.error('Error in readMail:', error);
      return error
    }
}

export const sendMail = async(picturePath, times, companyName, companyEmail, studentSchoolId, studentFullName, messageContent, cvFile) => {
  try {
      console.log("authenticating...")
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
          ...auth,
          accessToken: accessToken,
      },
      });
      console.log("created transport")
      const mailOptions = {
        from: "NILE UNIVERSITY <efonovia18@gmail.com>",
        subject: `To the office of ${companyName}. ${times===1 ? `An internship application for our student, ${studentFullName}` : `Our student, ${studentFullName} is applying for an internship at your company for the ${getOrdinalSuffix(times)} time`}`,
        to: companyEmail || "lordnovia18@gmail.com",
        html: `
            <main style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
            <h2 style="text-align: center;">Our student, ${studentFullName} would like to intern at your company. Here's what they have to say:</h2>
            <p style="font-size: 17px">${messageContent.replaceAll("\n", "<br/>")}</p>
            <footer>
                You can respond and contact them at <span style="color: blue;">${studentSchoolId}@nileuniversity.edu.ng</span>
            </footer>
            <br/><br/><br/>
            <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;font-weight: 600;font-size: 22px;"><span>Verified By</span><img height="150" width="160" src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Logo_Nile_University_Vert_-01.jpg" alt="Nile University logo"></div>
            </main>
        `,
        attachments: [
            {
              filename: studentFullName + "'s CV." + cvFile.originalname.split('.').pop(),
              content: cvFile.buffer,
            },
            {
              filename: "A picture of " + studentFullName + "." + picturePath.split('.').pop(),
              content: `https://res.cloudinary.com/dn6uuvy0b/image/upload/v1725725696/${picturePath}`,
            }
        ],
      };

      const result = await transport.sendMail(mailOptions);
      console.log("result: ", result)
      console.log("mail has been sent via nodemailer")
      console.log("getting gmail email details...")
      const finalResult = await readMailSent(result.messageId)
      console.log("gmail details gotten")
      const briefMailDetails = {
        from: mailOptions.from,
        subject: mailOptions.subject,
        to: mailOptions.to,
        html: mailOptions.html,
        cvFileName: cvFile.originalname,
        messageContent: messageContent,
        gmailId: finalResult.id,
        threadId: finalResult.threadId,
        historyId: finalResult.historyId,
        snippet: finalResult.snippet,
        nodeMailerid: result.messageId,
        hasAttachment: true,
        seen: true,
        dateSent: new Date()
      }

      console.log("briefMailDetails", briefMailDetails)
      return {
        briefMessage: briefMailDetails,
        detailedMessage: finalResult
      }
  } catch (error) {
      console.error('Error in readMail:', error);
      return error
  }
}

export const abbreviateMessage = message => {
  const headers = message.payload.headers
  const hasAttachment = message.payload.mimeType === "multipart/alternative" ? false : true
  const text = message.payload.parts[0].body.data ? base64urlDecode(message.payload.parts[0].body.data) : message.snippet
  const briefMailDetails = {
    from: headers.find(h=> h.name === "From").value,
    subject: headers.find(h=> h.name === "Subject").value,
    to: "efonovia18@gmail.com",
    messageContent: text.split("\r\n\r")[0],
    gmailId: message.id,
    threadId: message.threadId,
    historyId: message.historyId,
    snippet: message.snippet,
    nodeMailerid: null,
    hasAttachment: hasAttachment,
    seen: false,
    dateSent: new Date(Number(message.internalDate))
  }
  return briefMailDetails
}

function getOrdinalSuffix(number) {
  if (number % 100 >= 11 && number % 100 <= 13) {
      return `${number}th`;
  }

  switch (number % 10) {
      case 1:
          return `${number}st`;
      case 2:
          return `${number}nd`;
      case 3:
          return `${number}rd`;
      default:
          return `${number}th`;
  }
}