import React from 'react';
import logo from "../assets/img/icon/job-list1.png"
import ApplicationForm from '../components/ApplicationForm.components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
function CompanyDetailsPage() {


    return <main>
                <div className="slider-area">
                    <div
                        className="single-slider section-overly slider-height2 d-flex align-items-center"
                        data-background="assets/img/hero/about.jpg"
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-cap text-center">
                                        <h2>UI/UX Designer</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="job-post-company pt-120 pb-120">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-7 col-lg-8">
                                <div className="single-job-items mb-50">
                                    <div className="job-items">
                                        <div
                                            className="company-img company-img-details"
                                        >
                                            <a href="/"
                                                ><img
                                                    src={logo}
                                                    alt="pic"
                                            /></a>
                                        </div>
                                        <div className="job-tittle">
                                            <a href="/">
                                                <h4>Digital Marketer</h4>
                                            </a>
                                            <ul>
                                                <li><EmailIcon/> gunn@gmail.com</li>
                                                <li>
                                                    <LocationOnIcon/> Athens, Greece
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="job-post-details">
                                    <div className="post-details1 mb-50">
                                        <div className="small-section-tittle">
                                            <h4>Job Description</h4>
                                        </div>
                                        <p>
                                            It is a long established fact that a
                                            reader will beff distracted by vbthe
                                            creadable content of a page when looking
                                            at its layout. The pointf of using Lorem
                                            Ipsum is that it has ahf mcore or-lgess
                                            normal distribution of letters, as
                                            opposed to using, Content here content
                                            here making it look like readable.
                                        </p>
                                    </div>
                                </div>

                            </div>

                            <div className="col-xl-4 col-lg-4">
                                <div className="post-details3 mb-50">
                                    <div className="small-section-tittle">
                                        <h4>Internship Overview</h4>
                                    </div>
                                    <ul>
                                        <li>
                                            <span><EmailIcon/> Email : </span><span>12 Aug 2019</span>
                                        </li>
                                        <li><span><LocationOnIcon/> Location : </span><span>New York</span></li>
                                        <li><span><PhoneIcon/> Phone : </span><span>02</span></li>
                                        <li><span><LanguageIcon/> Website : </span><a style={{color: "blue"}} href='link.com'>link.com</a></li>
                                        <li><span><AccessTimeIcon/> Working Hours : </span><span>02-92400</span></li>
                                    </ul>
                                    <div className="apply-btn2">
                                        <a href="/" className="btn">Apply Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-between'>
                            <div className="col-xl-7 col-lg-8">
                                <ApplicationForm />
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                {/* put the reviews here */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
}


export default CompanyDetailsPage