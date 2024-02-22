import React from 'react';
import "../styles/applicationform.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function ApplicationForm() {


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
                        <div style={{width: "95%"}} className="col-md-12">
                            <div className="input_field">
                                <input type="text" placeholder="Website/Portfolio link"/>
                            </div>
                        </div> 
                        <div style={{width: "95%"}} className="col-md-12">
                            <div style={{borderStyle: "dashed", borderWidth: "2px"}} className="input-group">
                                <div className="input-group-prepend">
                                    <button
                                        type="button"
                                        id="inputGroupFileAddon03"
                                    >
                                        <i
                                            className="fa fa-cloud-upload"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </div>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="inputGroupFile03"
                                        aria-describedby="inputGroupFileAddon03"
                                    />
                                    <label
                                        className="custom-file-label"
                                        htmlFor="inputGroupFile03"
                                        ><CloudUploadIcon/> Upload CV</label>
                                </div>
                            </div>
                        </div>
                        <div style={{width: "95%"}} className="col-md-12">
                            <div className="input_field">
                                <textarea
                                    name="#"
                                    cols="30"
                                    rows="10" placeholder="Coverletter"
                                ></textarea>
                            </div>
                        </div>
                        <a style={{width: "95%",marginBottom: "20px", background: "#242b5e"}} href="/" className="btn head-btn1">Connect Student Profile for quick validation</a>
                        <a style={{width: "95%"}} href="/" className="btn head-btn1">Apply Now</a>
                        
                    </div>
                </form>
            </div>
}


export default ApplicationForm