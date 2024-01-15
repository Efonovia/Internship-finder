import express from "express"
import { getAllStudents, getStudent } from "./student.controller.js"

const studentsRouter = express.Router()
studentsRouter.get("/", getAllStudents)
studentsRouter.get("/:studentId", getStudent)

export default studentsRouter