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
import multer from "multer";
import { sendAndCreateNewApplication } from "./src/routes/application.controller.js";
import cloudinary from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"


// CONFIGURATION
dotenv.config()
const app = express()

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

  // Multer storage configuration with dynamic `public_id`
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: async (req, file) => {
        const userId = req.body.studentId;
        const timestamp = Date.now();
        const customFileName = `${userId}_${timestamp}`;
        const customPublicId = customFileName; // Use provided public_id or default to a timestamp

        return {
            folder: 'internship_finder', // Cloudinary folder name
            public_id: customPublicId, // Set the custom public_id
        };
    },
  });


const upload = multer({ storage: storage });
const applicationUpload = multer()
app.use(express.json())
app.use(helmet())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())


//ROUTES
app.get("/", (req, res) => {
    res.send("Welcome to Internship Finder...")
})
app.use("/students", studentsRouter)
app.use("/companies", companyRouter)
app.post("/application/create", applicationUpload.single("cvFile"), sendAndCreateNewApplication)
app.use("/application", applicationRouter)
app.post("/students/signup", upload.single("picturePath"), createNewStudent)
app.post("/students/login", loginStudent)


//MONGOOSE SETUP
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL).then(() => app.listen(PORT, () => {
    console.log("Connected to mongo database")
    console.log('Server running at PORT: '+PORT)
}))
.catch(err => console.log(err+ " failed to connect to database"))