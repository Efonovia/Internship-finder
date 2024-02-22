import React from 'react';
import "../styles/applicationform.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


function ApplicationForm(props) {
    const [formDetails, setFormDetails] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        studentId: "",
        password: "",
        picturePath: null
    })
    const [connected, setConnected] = React.useState(false)

    return <div style={{position: "relative", top: "40px"}} className="apply_job_form white-bg">
                <h4>Apply for the job</h4>
                <form action="#">
                    <div className="row my-row">
                        <div className="col-md-6">
                            <div className="input_field">
                                <input type="text" placeholder="Your name"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input_field">
                                <input type="text" placeholder="Email"/>
                            </div>
                        </div>
                        <div style={{width: "100%"}} className="col-md-12">
                            <div className="input_field">
                                <input type="text" placeholder="Website/Portfolio link"/>
                            </div>
                        </div> 
                        <div style={{width: "100%", marginTop: "30px"}} className="col-md-12">
                            <div style={{borderStyle: "dashed", borderWidth: "2px", height: "100px"}} className="input-group">
                                <div className="custom-file">
                                    <label style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1px"}} className="custom-file-label" htmlFor="inputGroupFile03">
                                        <span style={{marginTop: "10px"}}><CloudUploadIcon/> Upload your CV</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{display: "none"}}
                                            name="picturePath"
                                            className="custom-file-input"
                                            id="inputGroupFile03"
                                            aria-describedby="inputGroupFileAddon03"/><br></br>
                                            <span style={{marginTop: "-80px", color: "black"}} id="imageName">{formDetails["picturePath"]?.name}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div style={{width: "100%"}} className="col-md-12">
                            <div className="input_field">
                                <textarea
                                    name="#"
                                    cols="30"
                                    rows="10" placeholder="Coverletter"
                                ></textarea>
                            </div>
                        </div>
                        <a style={{width: "100%", color: "white", padding: connected && "15px", marginBottom: "20px", background: connected ? "green" : (props.isLoggedIn ? "#242b5e" : "grey")}} onClick={()=>setConnected(prev=>!prev)} href className="btn head-btn1">{connected ? <><CheckCircleIcon/>Student Profile Connected</> : (props.isLoggedIn ? "Connect Student Profile for quicker validation" : "You need to be logged in to connect your student profile")}</a>
                        <a style={{width: "100%", color: "white", background: props.isLoggedIn ? "#fb246a" : "grey"}} href className="btn head-btn1">{props.isLoggedIn ? "Apply Now" : "You need to be logged in, in order to apply "}</a>
                        
                    </div>
                </form>
            </div>
}


export default ApplicationForm