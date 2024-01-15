import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    name: {
        type: String,
        min: 2,
        max: 50
    },
    tags: {
        type: Array,
        default: []
    },
    logo: {
        type: String,
        default: ""
    },
    street: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    phoneNumbers: {
        type: Array,
        default: []
    },
    website: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    workingHours: {
        type: String,
        default: ""
    },
    reviews: {
        type: Array,
        default: []
    },
}, { timestamps: true })

const Company = mongoose.model("Companies", CompanySchema, "Companies")
export default Company