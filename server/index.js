import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet";
import morgan from "morgan";
import studentsRouter from "./src/routes/student.route.js";
import { createNewStudent, loginStudent } from "./src/routes/student.controller.js";
import companyRouter from "./src/routes/company.route.js";
import applicationRouter from "./src/routes/application.route.js";


// CONFIGURATION
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())



//ROUTES
app.get("/", (req, res) => res.send("hello"))
app.use("/students", studentsRouter)
app.use("/companies", companyRouter)
app.use("/application", applicationRouter)
app.post("/signup", createNewStudent)
app.post("/login", loginStudent)


//MONGOOSE SETUP
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL).then(() => app.listen(PORT, () => {
    console.log("Connected to mongo database")
    console.log('Server running at PORT: '+PORT)
}))
.catch(err => console.log(err+ " failed to connect to database"))