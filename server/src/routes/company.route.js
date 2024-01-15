import express from "express"
import { 
    addReviewToCompany,
    getAllCompanies, 
    getCompaniesBySearch, 
    getCompaniesByState, 
    getCompaniesByTags,
    getCompanyById 
} from "./company.controller.js"


const companyRouter = express.Router()

companyRouter.get("/id/:companyId", getCompanyById)
companyRouter.get("/", getAllCompanies)
companyRouter.get("/search", getCompaniesBySearch)
companyRouter.get("/state", getCompaniesByState)
companyRouter.get("/tags", getCompaniesByTags)
companyRouter.post("/addreview/:companyId", addReviewToCompany)


export default companyRouter