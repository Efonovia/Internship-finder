import React from 'react';
import defaultLogo from "../assets/img/post.png"
import ApplicationForm from '../components/ApplicationForm.components';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import { httpGetCompanyById, httpGetandUpdateApplications } from '../hooks/requests.hooks';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { capitalizeWords, shortenText } from '../utils';
import Reviews from '../components/Reviews.component';
import { useDispatch, useSelector } from 'react-redux';
import { setApplications } from '../state';
import ApplicationSubmissionModal from '../components/mui/ApplicationSubmissionModal.components';


function CompanyDetailsPage() {
    const { companyId } = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(true)
    const [submissionLoading, setSubmissionLoading] = React.useState(false)
    const [company, setCompany] = React.useState(true)
    const [open, setOpen] = React.useState(false)
    const applicationFormRef = React.useRef(null)
    const userInfo = useSelector(state => state.user)
    const applications = useSelector(state => state.applications)
    // console.log(applications)


    function getNumberOfTimesApplied() {
        return applications?.filter(application => application.companyId === companyId).length
    }

    // console.log("times applied, ", getNumberOfTimesApplied())

    function scrollToApplicationForm() {
        applicationFormRef.current.scrollIntoView({ behaviour: "smooth" })
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await httpGetCompanyById(companyId);
                setCompany(result);
                if(userInfo) {
                    const applicationsResult = await httpGetandUpdateApplications(userInfo._id)
                    dispatch(setApplications({ applications: applicationsResult.body }))
                }
            } catch (error) {
                alert('Error fetching featured companies:', error);
                console.error('Error fetching featured companies:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [companyId])

    return <main>
            <ApplicationSubmissionModal 
                open={open} 
                handleOpen={bool=>setOpen(bool)}
                submissionLoading={submissionLoading}
            />
            {loading ? <CircularProgress sx={{marginTop: "300px", marginLeft: "800px", color: "#fb246a"}} size={100}/> : <>
                <div className="slider-area">
                    <div
                        className="single-slider section-overly slider-height2 d-flex align-items-center"
                        data-background="assets/img/hero/about.jpg"
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-12">
                                    <div className="hero-cap text-center">
                                        {company?.logo !== "/images/no-image-available.jpg" && <img alt="logo" src={`https://www.finelib.com${company?.logo}`}></img>}
                                        <h2>{company?.name}</h2>
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
                                {getNumberOfTimesApplied()>=1 && <h4 style={{ textAlign: "center" }}>You've already applied here before. Do you still want to apply again?</h4>}
                                <div className="single-job-items mb-50">
                                    <div className="job-items">
                                        <div
                                            className="company-img company-img-details"
                                        >
                                            <a href
                                                ><img
                                                    src={company?.logo !== "/images/no-image-available.jpg" ? `https://www.finelib.com${company?.logo}` : defaultLogo}
                                                    alt="pic"
                                            /></a>
                                        </div>
                                        <div className="job-tittle">
                                            <a href>
                                                <h4>{company?.name}</h4>
                                            </a>
                                            <ul>
                                                <li><EmailIcon/>{company?.email === "null" ? "none available" : company?.email}</li>
                                                <li>
                                                    <LocationOnIcon/>{[company?.street, company?.city, company?.state].join(", ")}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="job-post-details">
                                    <div className="post-details1 mb-50">
                                        <div className="small-section-tittle">
                                            <h4>Description</h4>
                                        </div>
                                        <p>{company?.description !== "null" ? company?.description : "none available"}</p>
                                    </div>
                                </div>

                            </div>

                            <div style={{marginRight: "50px"}} className="col-xl-4 col-lg-4">
                                <div style={{width: "450px"}} className="post-details3 mb-50">
                                    <div className="small-section-tittle">
                                        <h4>Internship Overview</h4>
                                    </div>
                                    <ul>
                                        <li>
                                            <span><EmailIcon/> Email : </span><span>{company?.email === "null" ? "none available" : company?.email}</span>
                                        </li>
                                        <li><span><LocationOnIcon/> Location : </span><span>{shortenText(30, [company?.street, company?.city, company?.state].join(", "))}</span></li>
                                        <li><span><PhoneIcon/> Phone : </span><span>{company?.phoneNumbers ? company?.phoneNumbers.join(", ") : "none available"}</span></li>
                                        <li><span><LanguageIcon/> Website : </span><a target={company?.website === "null" ? true : "_blank"} rel='noreferrer' style={{color: "blue"}} href={company?.website === "null" ? true : company?.website}>{company?.website === "null" ? "none available" : company?.website}</a></li>
                                        <li><span><AccessTimeIcon/> Working Hours : </span><span>{company?.workingHours === "null" ? "none available" : company?.workingHours}</span></li>
                                    </ul>
                                    <div style={{marginLeft: "200px"}} className="apply-btn2">
                                        <a style={{color: "white"}} href onClick={scrollToApplicationForm} className="btn">Apply Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-between'>
                            <div ref={applicationFormRef} className="col-xl-6 col-lg-8">
                                <ApplicationForm 
                                    open={open}
                                    handleOpen={bool=>setOpen(bool)}
                                    submissionLoading={submissionLoading}
                                    handleSubmissionLoading={bool=>setSubmissionLoading(bool)}
                                    isLoggedIn={Boolean(userInfo)}
                                    picturePath={userInfo?.picturePath}
                                    companyId={companyId}
                                    companyName={company?.name}
                                    companyEmail={company?.email === "null" ? null : company?.email}
                                    studentId={userInfo?._id}
                                    studentSchoolId={userInfo?.studentId}
                                    amountOfTimesApplied={getNumberOfTimesApplied()}
                                    studentFullName={capitalizeWords(userInfo?.firstName + " " + userInfo?.lastName)}
                                />
                            </div>
                            <Reviews 
                                companyId={companyId}
                                userInfo={userInfo}
                                reviews={company?.reviews}
                            />
                        </div>
                    </div>
                </div>
            </>}
            </main>

}


export default CompanyDetailsPage