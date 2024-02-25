import mongoose from "mongoose";
import CompanyDatabase from "../models/company.mongo.js";


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
    times: {
        type: Number,
        default: 1
    },
    companyLogo: {
        type: String,
        default: ""
    },
    companyName: {
        type: String,
        default: ""
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

ApplicationSchema.pre('save', async function(next) {
    try {
        const company = await CompanyDatabase.findById(this.companyId);
        if (company) {
            this.companyLogo = company.logo;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Application = mongoose.model("Applications", ApplicationSchema, "Applications")
export default Application