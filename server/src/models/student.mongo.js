import mongoose from "mongoose";

const StudentSchema = mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    firstName: {
        type: String,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        min: 2,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 50,
    },
    picturePath: {
        type: String,
        default: "",
    },
    savedCompanies: {
        type: Array,
        default: []
    },
}, { timestamps: true })

const Student = mongoose.model("Students", StudentSchema, "Students")
export default Student