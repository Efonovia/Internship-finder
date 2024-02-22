import React from 'react';
import "../styles/companiescontainer.css"
import CompanyCard from '../components/CompanyCard.components';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import CheckboxesTags from '../components/mui/CategoriesInput.components';
import importantTagsDetails from '../data/important_tags_details';
import { httpCompaniesByCategory, httpGetFeaturedCompanies } from '../hooks/requests.hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CircularProgress, Pagination, Stack } from '@mui/material';

function CompaniesByState() {

    const [searchParams] = useSearchParams()
    const { page, categories } = Object.fromEntries(searchParams)
    const [loading, setLoading] = React.useState(true)
    const [searchCategories, setSearchCategories] = React.useState(categories?.split(",") || [])
    const [companies, setCompanies] = React.useState([])
    const navigate = useNavigate()
    function formatSentenceList(array) {
        if (array.length === 0) return ''
        if (array.length === 1) return array[0]
        const lastElement = array.pop()
        return `${array.join(', ')} and ${lastElement}`
    }
    
    function onSearchCategoriesChange(value) {
        if(value.length < 4) {
            setSearchCategories(value)
        }
        console.log(searchCategories)
    }

    function executeSearch() {
        if(!searchCategories.length) {
            return
        }
        navigate(`/companies/categories?categories=${searchCategories.join(",")}&page=1`)
        setLoading(true)
    }

    function goToCategory(category) {
        navigate(`/companies/categories?categories=${category}&page=1`)
        setLoading(true)
    }

    const handleChange = (event, value) => {
        navigate(`/companies/categories?categories=${searchCategories.join(",")}&page=${value}`)
        setLoading(true)
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if(categories) {
                    setSearchCategories(categories.split(","))
                }
                const results = (categories&&page) ? await httpCompaniesByCategory(categories, page) : await httpGetFeaturedCompanies(3);
                setCompanies(results);
            } catch (error) {
                alert('Error fetching featured companies:', error);
                console.error('Error fetching featured companies:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
        
    }, [categories, page])

    const jobsByCategory = Object.keys(importantTagsDetails).slice(0,50).map(tag => {
        return <div onClick={() => goToCategory(tag)} key={tag} className='my-jobbylocation'><span>{tag}:</span><span>{importantTagsDetails[tag]}</span></div>
    })

    const companyCardsHtml = companies["data"]?.map(company => (
        <CompanyCard key={company.id} data={company} />
    ));

    return <main>
                <div style={{marginBottom: "40px"}} className="slider-area">
                    <div
                        className="single-slider section-overly slider-height2 d-flex align-items-center"
                        data-background="assets/img/hero/about.jpg"
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-cap text-center">
                                        <h2>{categories ? formatSentenceList(categories.split(",")) : "Choose a company based on a specific category"}</h2>
                                    </div>
                                    <div className='my-searchinputholder'>
                                        <CheckboxesTags 
                                            width={800} 
                                            options={Object.keys(importantTagsDetails)} 
                                            label="Categories" 
                                            placeholder="Categories"
                                            value={searchCategories}
                                            onCategoriesChange={onSearchCategoriesChange}
                                        />
                                        <a 
                                            onClick={executeSearch} 
                                            style={{width: "150px", background: searchCategories.length ? '#fb246a' : "grey"}} 
                                            href 
                                            className="btn head-btn1"
                                        >Search</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>

                    <div className='row my-companiesbyrow'>
                        <div className="col-xl-3 col-lg-3 col-md-4">
                            <div style={{marginLeft: "-100px"}} className="row">
                                <div className="col-12">
                                    <div className="small-section-tittle2 mb-45">
                                        <div className="ion">
                                            <FmdGoodRoundedIcon />
                                        </div>
                                        <h4>Popular Internships By Category</h4>
                                    </div>
                                </div>
                            </div>

                            <div style={{width: "400px", marginLeft: "-100px"}} className="job-category-listing mb-50">{jobsByCategory}</div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-8">
                            <div className="container">
                                <div style={{width: "1100px"}} className="row justify-content-center d-flex">
                                    {loading ? <CircularProgress sx={{color: "#fb246a"}} size={100} /> :
                                    <>
                                        <div style={{fontSize: "20px", marginBottom: "40px", textAlign: "center"}}>{companies.totalResults} companies found</div>
                                        <div style={{maxWidth: "90%"}} className="col-lg-8 post-list" id='my-col'>
                                            {companyCardsHtml}
                                            {(categories&&page&&Boolean(companies["data"]?.length&&!loading)) && <Stack marginBottom={7} spacing={2}>
                                                <Pagination
                                                    sx={{ 
                                                    '& .MuiPaginationItem-root': { color: 'black' },
                                                    '& .MuiPaginationItem-page.Mui-selected': { backgroundColor: '#fb246a', color: 'white' }
                                                    }} 
                                                    size='large' 
                                                    variant='outlined' 
                                                    shape='rounded' 
                                                    count={Math.ceil(companies.totalResults/10)} 
                                                    page={Number(page)} 
                                                    onChange={handleChange} 
                                                />
                                            </Stack>}
                                        </div>
                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </main>
}


export default CompaniesByState