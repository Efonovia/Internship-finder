const API_URL = "http://localhost:8000"
const limit = 10


export const httpGetFeaturedCompanies = async (page) => {
    try {
        const response = await fetch(`${API_URL}/companies?page=${page}&limit=${limit}`)
        if (response.error) {
            throw new Error('Failed to fetch data');
        }
        const results = await response.json()
        return results;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpSearchCompanies = async (query, categories, state, page) => {
    try {
        const response = await fetch(`${API_URL}/companies/search?query=${query}&categories=${categories}&state=${state}&page=${page}&limit=${limit}`)
        if (response.error) {
            throw new Error('Failed to fetch data');
        }
        const results = await response.json()
        return results;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpCompaniesByCategory = async (categories, page) => {
    try {
        const response = await fetch(`${API_URL}/companies/tags?categories=${categories}&page=${page}&limit=${limit}`)
        if (response.error) {
            throw new Error('Failed to fetch data');
        }
        const results = await response.json()
        return results;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpCompaniesByState = async (state, page) => {
    try {
        const response = await fetch(`${API_URL}/companies/state?state=${state}&page=${page}&limit=${limit}`)
        if (response.error) {
            throw new Error('Failed to fetch data');
        }
        const results = await response.json()
        return results;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpGetCompanyById = async (companyId) => {
    try {
        const response = await fetch(`${API_URL}/companies/id/${companyId}`)
        if (response.error) {
            throw new Error('Failed to fetch data');
        }
        const result = await response.json()
        return result;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpPostReview = async (review, companyId) => {
    try {
        const response = await fetch(`${API_URL}/companies/addreview/${companyId}`, {
            method: "post",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(review)
        })
        if (response.error) {
            throw new Error('Failed to post review');
        }
        const result = await response.json()
        return result;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpSignUpStudent = async (studentDetails) => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            body: studentDetails
        })
        if (response.error) {
            throw new Error('Failed to sign you up. try again');
        }
        const result = await response.json()
        return result;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}

export const httpLoginStudent = async (studentDetails) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(studentDetails)
        })
        if (response.error) {
            throw new Error('Failed to sign you up. try again');
        }
        const result = await response.json()
        return result;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}