import express from "express"
import { toggleSavedCompany, getAllStudents, getStudent, getStudentPfp } from "./student.controller.js"

const studentsRouter = express.Router()
studentsRouter.get("/", getAllStudents)
studentsRouter.get("/:studentId", getStudent)
studentsRouter.get("/pfp/:picturePath", getStudentPfp)
studentsRouter.post("/togglecompanysaved", toggleSavedCompany)

export default studentsRouter