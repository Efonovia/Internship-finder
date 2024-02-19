import React from 'react';
import "../styles/companiescontainer.css"
import CompanyCard from '../components/CompanyCard.components';
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';
import CheckboxesTags from '../components/mui/CategoriesInput.components';
import importantTagsDetails from '../data/important_tags_details';

function CompaniesByState() {
    const jobsByCategory = Object.keys(importantTagsDetails).slice(0,50).map(tag => {
        return <div className='my-jobbylocation'><span>{tag}:</span><span>{importantTagsDetails[tag]}</span></div>
    })

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
                                        <h2>Choose a company based on a specific category</h2>
                                    </div>
                                    <div className='my-searchinputholder'>
                                        <CheckboxesTags width={800} options={Object.keys(importantTagsDetails)} label="Categories" placeholder="Categories"/>
                                        <a style={{width: "150px"}} href="/" className="btn head-btn1">Search</a>
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
                                        <h4>Internships By Category</h4>
                                    </div>
                                </div>
                            </div>

                            <div style={{width: "400px", marginLeft: "-100px"}} className="job-category-listing mb-50">{jobsByCategory}</div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-8">
                            <div className="container">
                                <div style={{width: "1100px"}} className="row justify-content-center d-flex">
                                    <div style={{fontSize: "20px", marginBottom: "30px"}}>13454 companies found</div>
                                
                                    <div style={{maxWidth: "90%"}} className="col-lg-8 post-list" id='my-col'>
                                        
                                        {/* <CompanyCard />
                                        <CompanyCard />
                                        <CompanyCard />
                                        <CompanyCard />
                                        <CompanyCard />
                                         */}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </main>
}


export default CompaniesByState