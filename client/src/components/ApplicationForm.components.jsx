import React from 'react';
import "../styles/applicationform.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { httpSubmitApplication } from '../hooks/requests.hooks';
import { formDataToJson } from '../utils';


function ApplicationForm(props) {
    const [formDetails, setFormDetails] = React.useState({
        messageContent: "",
        cv: null
    })
    const [connected, setConnected] = React.useState(false)

    function handleChange(event) {
        const { value, name, files } = event.target;

        setFormDetails(prevFormDetails => ({
            ...prevFormDetails,
            [name]: name === "cv" ? files[0] : value,
        }));
        console.log(formDetails)
    }

    async function submitApplication() {
        try {
            if(props.submissionLoading) {
                return
            }
            if(!connected) {
                alert("ensure you connect your student validation for validation")
                return
            }
            if(!formDetails.messageContent) {
                alert("Type in a cover letter")
                return
            }
            if(!formDetails.cv) {
                alert("You didn't attach your CV")
                return
            }
    
            

            const formData = new FormData();
            formData.append('picturePath', props.picturePath)
            formData.append('companyId', props.companyId)
            formData.append('companyName', props.companyName)
            formData.append('studentId', props.studentId)
            formData.append('studentSchoolId', props.studentSchoolId)
            formData.append('times', props.amountOfTimesApplied)
            formData.append('studentFullName', props.studentFullName)
            formData.append('cvFile', formDetails.cv)
            formData.append('messageContent', formDetails.messageContent)
    
            console.log(formDataToJson(formData))
            props.handleOpen(true)
            props.handleSubmissionLoading(true)
            const response = await httpSubmitApplication(formData)
            console.log(response?.body)
            console.log("waiting...")
            console.log("done")
        } catch (error) {
            console.log(error)
        } finally {
            
            setFormDetails({messageContent: "", cv: null})
            setConnected(false)
            setTimeout(() => props.handleSubmissionLoading(false), 2000)
        }
        
    }

    return <div style={{position: "relative", top: "40px"}} className="apply_job_form white-bg">
                <h4 style={{textAlign: "center"}}>Connect your student profile, Upload your CV and type in a convincing cover letter to secure your internship</h4>
                <form action="#">
                    <div className="row my-row">
                     
                        <div style={{width: "100%", marginTop: "30px"}} className="col-md-12">
                            <div style={{borderStyle: "dashed", borderWidth: "2px", height: "100px"}} className="input-group">
                                <div className="custom-file">
                                    <label style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1px"}} className="custom-file-label" htmlFor="inputGroupFile03">
                                        <span style={{marginTop: "10px"}}><CloudUploadIcon/> Upload your CV</span>
                                        <input
                                            type="file"
                                            style={{display: "none"}}
                                            name="cv"
                                            onChange={handleChange}
                                            className="custom-file-input"
                                            id="inputGroupFile03"
                                            aria-describedby="inputGroupFileAddon03"/><br></br>
                                            <span style={{marginTop: "-80px", color: "black"}} id="fileName">{formDetails["cv"]?.name}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div style={{width: "100%"}} className="col-md-12">
                            <div className="input_field">
                                <textarea
                                    value={formDetails.messageContent}
                                    onChange={handleChange}
                                    name="messageContent"
                                    cols="30"
                                    rows="10" placeholder="Coverletter"
                                ></textarea>
                            </div>
                        </div>
                        <a 
                            style={{width: "100%", color: "white", padding: connected && "15px", marginBottom: "20px", background: connected ? "green" : (props.isLoggedIn ? "#242b5e" : "grey")}} 
                            onClick={()=>setConnected(prev=>!prev)} 
                            href 
                            className="btn head-btn1"
                        >
                            {connected ? <><CheckCircleIcon/>&nbsp; Student Profile Connected</> : (props.isLoggedIn ? "Connect Student Profile for quicker validation" : "You need to be logged in to connect your student profile")}
                        </a>
                        <a 
                            style={{width: "100%", color: "white", background: props.isLoggedIn ? "#fb246a" : "grey", padding: props.submissionLoading && "20px"}} 
                            onClick={submitApplication} 
                            href 
                            className="btn head-btn1"
                        >
                            {props.isLoggedIn ? "Submit Application" : "You need to be logged in, in order to apply"}
                        </a>
                        
                    </div>
                </form>
            </div>
}


export default ApplicationForm