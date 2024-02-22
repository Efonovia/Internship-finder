import React from 'react';
import "../styles/companiescontainer.css"
import CompanyCard from '../components/CompanyCard.components';
import ComboBox from '../components/mui/Autocomplete.components.mui';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import nigerianStates from "../data/nigeria_states"
import { httpCompaniesByState, httpGetFeaturedCompanies } from '../hooks/requests.hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CircularProgress, Pagination, Stack } from '@mui/material';
import { nanoid } from 'nanoid';

function CompaniesByState() {

    const [searchParams] = useSearchParams()
    const { page, state } = Object.fromEntries(searchParams)
    const [loading, setLoading] = React.useState(true)
    const [searchState, setSearchState] = React.useState(state || "")
    const [companies, setCompanies] = React.useState([])
    const navigate = useNavigate()
    console.log(state, searchState)
    function executeSearch() {
        if(!searchState.length) {
            return
        }
        navigate(`/companies/state?state=${searchState}&page=1`)
        setLoading(true)
    }

    function goToState(state) {
        navigate(`/companies/state?state=${state}&page=1`)
        setLoading(true)
    }

    function onSearchStateChange(value) {
        setSearchState(value)
        console.log(value)
    }

    const handleChange = (event, value) => {
        navigate(`/companies/state?state=${searchState}&page=${value}`)
        setLoading(true)
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if(state) {
                    setSearchState(state)
                }
                const results = (state&&page) ? await httpCompaniesByState(state, page) : await httpGetFeaturedCompanies(4);
                setCompanies(results);
            } catch (error) {
                alert('Error fetching featured companies:', error);
                console.error('Error fetching featured companies:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
        
    }, [state, page])

    const jobsByState = Object.keys(nigerianStates).slice(0,50).map(tag => {
        return <div onClick={()=>goToState(tag)} key={nanoid()} className='my-jobbylocation'><span>{tag}:</span><span>{nigerianStates[tag]}</span></div>
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
                                        <h2>{state ? state : "Choose a company based on where you live"}</h2>
                                    </div>
                                    <div className='my-searchinputholder'>
                                        <ComboBox 
                                            width={800} 
                                            options={Object.keys(nigerianStates)} 
                                            label="States"
                                            value={searchState}
                                            onStateChange={onSearchStateChange}
                                        />
                                        <a 
                                            onClick={executeSearch} 
                                            style={{width: "150px", background: searchState ? '#fb246a' : "grey"}} 
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
                            <div className="row">
                                <div className="col-12">
                                    <div className="small-section-tittle2 mb-45">
                                        <div className="ion">
                                            <FmdGoodRoundedIcon />
                                        </div>
                                        <h4>Internships By Location</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="job-category-listing mb-50">{jobsByState}</div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-8">
                            <div className="container">
                                <div style={{width: "1100px"}} className="row justify-content-center d-flex">
                                    {loading ? <CircularProgress sx={{color: "#fb246a"}} size={100} /> :
                                    <>
                                        <div style={{fontSize: "20px", marginBottom: "40px", textAlign: "center"}}>{companies.totalResults} companies found</div>
                                        <div style={{maxWidth: "90%"}} className="col-lg-8 post-list" id='my-col'>
                                            {companyCardsHtml}
                                            {(state&&page&&Boolean(companies["data"]?.length&&!loading)) && <Stack marginBottom={7} spacing={2}>
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