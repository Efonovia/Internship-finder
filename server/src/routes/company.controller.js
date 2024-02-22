import CompanyDatabase from "../models/company.mongo.js";
import { getPagination, getPaginationResults } from "../services/query.services.js";
import importantTags from "../data/important_tags.js"
import badTags from "../data/bad_tags.js"

const tagsQuery = {
    $and: [
        { tags: { $in: importantTags } },
        { tags: { $nin: badTags } }
    ]
};

export const getAllCompanies = async (req, res) => {
    try {
        const { skip, limit, page } = getPagination(req.query)
        console.log({ skip, page, limit })
        const totalDocuments = await CompanyDatabase.countDocuments(tagsQuery)
        const companies = await CompanyDatabase.find(tagsQuery, { '__v': 0 })
            .sort({ "importantTags.length": -1, "name": -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            ...getPaginationResults(page, limit, skip, totalDocuments),
            data: companies,
            totalResults: totalDocuments
    })
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const { companyId } = req.params
        console.log(companyId)
        const company = await CompanyDatabase.findById(companyId)
        return res.status(200).json(company)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
}

export const getCompaniesBySearch = async (req, res) => {
    try {
        const { skip, limit, page } = getPagination(req.query);
        const { query, state, categories } = req.query;

        const filter = {};
        
        if (query && query !== "undefined") {
            filter.$text = { $search: query };
        }

        if (state && state!=="undefined") {
            filter.state = state;
        }

        if (categories && categories!=="undefined") {
            filter.tags = { $in: categories.split(",") };
        }

        console.log(req.query);
        console.log({ query, state, categories, skip, page, limit });

        const totalDocuments = await CompanyDatabase.countDocuments(filter);
        let companiesQuery = CompanyDatabase.find(filter, { '__v': 0 });

        if (query && query !== "undefined") {
            companiesQuery = companiesQuery.sort({ score: { $meta: 'textScore' } });
        }

        const companies = await companiesQuery.skip(skip).limit(limit);


        return res.status(200).json({
            ...getPaginationResults(page, limit, skip),
            data: companies,
            totalResults: totalDocuments
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export const getCompaniesByState = async (req, res) => {
    try {
        const { state }  = req.query
        const companiesQuery = { state: { $regex: state, $options: 'i' }, tags: { $in: importantTags, $nin: badTags } }
        const totalDocuments = await CompanyDatabase.countDocuments(companiesQuery)
        const { skip, limit, page } = getPagination(req.query, totalDocuments);
        console.log(req.query);

        const companies = await CompanyDatabase.find(
            companiesQuery,
            {  '__v': 0 }
        )
        .sort({ 'importantTags.length': -1, 'name': 1 })
        .skip(skip)
        .limit(limit);

        return res.status(200).json({
            ...getPaginationResults(page, limit, skip),
            data: companies,
            totalResults: totalDocuments
        });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

export const getCompaniesByTags = async (req, res) => {
    try {
        const { skip, limit, page } = getPagination(req.query);
        console.log(req.query);
        const tags = req.query.categories.split(",")
        console.log(tags)

        const companies = await CompanyDatabase.find(
            { tags: { $in: tags } },
            { '__v': 0 }
        )
        .sort({
            'tags.length': -1,
        })
        .skip(skip)
        .limit(limit);

        const totalDocuments = await CompanyDatabase.countDocuments({ tags: { $in: tags } });

        return res.status(200).json({
            ...getPaginationResults(page, limit, skip, totalDocuments),
            data: companies,
            totalResults: totalDocuments,
        });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

export const addReviewToCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        const { reviewer, content, rating } = req.body;
        console.log(companyId, req.body)

        if (!companyId || !reviewer || !content || !rating) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        const company = await CompanyDatabase.findById(companyId);
        console.log(company)
        if (!company) {
            return res.status(404).json({ error: 'Company not found' });
        }

        const newReview = {
            reviewer,
            content,
            rating,
            publishDate: new Date(),
        };

        company.reviews.push(newReview);

        await company.save();

        return res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
