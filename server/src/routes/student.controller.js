import StudentDatabase from "../models/student.mongo.js";
import bcrypt from "bcrypt"

export const createNewStudent = async (req, res) => {
    try {
      const {
        studentId,
        firstName,
        lastName,
        password,
        picturePath
      } = req.body
  
      console.log(req.body)
  
      const salt = await bcrypt.genSalt()
      const passwordHash = await bcrypt.hash(password, salt)
  
      StudentDatabase.findOne({ studentId: studentId })
      .then((student) => {
        if (student) {
          console.log(student); // Found student
          return res.status(200).json({exists: true, body: student})
        } else {
            console.log(`Student with studentId ${studentId} not found.`);
  
            const newStudent = new StudentDatabase({
              studentId,
              firstName,
              lastName,
              password: passwordHash,
              picturePath: picturePath || "",
            })
  
            newStudent.save().then(() => {
              console.log('New student added successfully');
            }).catch((error) => {
                console.log(error);
              });
  
          return res.status(201).json({exists: false, body: newStudent})
        }
      })
      .catch((error) => {
        console.log(`Error finding student with studentId ${studentId}: ${error}`);
        return res.status(500).json({error: error.message})
      });
  
    } catch (error) {
      return res.status(500).json({error: error.message})
    }
}

export const loginStudent = async(req, res) => {
    try {
      const { studentId, password } = req.body
      //Check if the student exists by using their studentId
      const student = await StudentDatabase.findOne({ studentId: studentId })
      if(!student) {
        return res.status(400).json({ok: false, msg: "invalid studentId" })
      }
  
      //Check if password is correct
      const isMatch = await bcrypt.compare(password, student.password)
      if(!isMatch) return res.status(400).json({ok: false, msg: "Invalid credentials" })
  
      
      return await res.status(200).json({ ok: true, student: student })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getAllStudents = async (req, res) => {
    try {
        return res.status(200).json(await StudentDatabase.find({}, { '_id': 0, '__v': 0 }))
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const getStudent = async (req, res) => {
    try {
        const { studentId } = req.params
        const student = await StudentDatabase.findOne({ studentId: studentId })
        return res.status(200).json(student)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}