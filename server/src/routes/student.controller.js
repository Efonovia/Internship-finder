import StudentDatabase from "../models/student.mongo.js";
import bcrypt from "bcrypt"

export const createNewStudent = async (req, res) => {
    try {
        const {
            studentId,
            firstName,
            lastName,
            password,
            email,
        } = req.body;

        console.log(req.body);

// Check if the user already exists in the database
        const existingStudent = await StudentDatabase.findOne({ studentId: studentId });

        if (existingStudent) {
            console.log("Student already exists. Will not create a new record.");
            return res.status(200).json({ exists: true, body: existingStudent });
        }

// If the user does not exist, proceed with creating a new record
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        let picturePath = "";
        if (req.file) {
            picturePath = req.file.filename;
        }

        // Create a new student record
        const newStudent = new StudentDatabase({
            studentId,
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath: picturePath || "", // Set picturePath only if a file is uploaded
        });

        // Save the new student record to the database
        await newStudent.save();

        console.log('New student added successfully');
        return res.status(201).json({ exists: false, body: newStudent });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const loginStudent = async(req, res) => {
    try {
      const { studentId, password } = req.body
      console.log(req.body)
      //Check if the student exists by using their studentId
      const student = await StudentDatabase.findOne({ studentId: studentId })
      if(!student) {
        return res.status(400).json({ok: false, msg: "No account exists with that studentId. Create a new account or type the ID correctly" })
      }
  
      //Check if password is correct
      const isMatch = await bcrypt.compare(password, student.password)
      if(!isMatch) return res.status(400).json({ok: false, msg: "Incorrect Password" })
  
      
      return res.status(200).json({ ok: true, body: student })
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