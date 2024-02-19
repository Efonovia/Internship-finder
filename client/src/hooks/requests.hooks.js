const API_URL = "http://localhost:8000"


export const httpGetFeaturedCompanies = async (page) => {
    try {
        const response = await fetch(`${API_URL}/companies?page=${page}&limit=10`)
        if (response.error) {
            throw new Error('Failed to fetch data');
        }
        const results = await response.json(); // Convert response to JSON
        return results;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}


export const httpSearchCompanies = async (query, page) => {
    try {
        const response = await fetch(`${API_URL}/companies/search?query=${query}&page=${page}&limit=10`)
        if (response.error) {
            throw new Error('Failed to fetch data');
        }
        const results = await response.json(); // Convert response to JSON
        return results;
    } catch (error) {
        console.log(error)
        alert(error)
    }
}