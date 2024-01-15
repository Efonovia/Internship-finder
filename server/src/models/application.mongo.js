import mongoose from "mongoose";

const ApplicationSchema = mongoose.Schema({
    applicationId: {
        type: String,
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Students',
        required: true
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Companies',
        required: true
    },
    briefMessages: {
        type: Array,
        required: true,
        default: []
    },
    detailedMessages: {
        type: Array,
        required: true,
        default: []
    },
    dateMade: {
        type: Date,
        required: true
    }
}, { timestamps: true })

const Application = mongoose.model("Applications", ApplicationSchema, "Applications")
export default Application