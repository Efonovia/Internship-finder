import React from 'react';
import "../styles/applicationform.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function Signup() {

    return <div style={{position: "relative", top: "100px", width: "60%", margin: "auto"}} className="apply_job_form white-bg">
                <h4 style={{textAlign: "center"}}>Sign up for [Name of APp]</h4>
                <form action="#">
                    <div className="row my-row">
                        <div className="col-md-6">
                            <div className="input_field">
                                <input type="text" placeholder="First Name"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input_field">
                                <input type="text" placeholder="Last Name"/>
                            </div>
                        </div>
                        <div style={{width: "100%", marginTop: "30px"}} className="col-md-6">
                            <div className="input_field">
                                <input type="text" placeholder="Nile Student ID"/>
                            </div>
                        </div>
                        <div style={{width: "100%", marginTop: "30px"}} className="col-md-6">
                            <div className="input_field">
                                <input type="text" placeholder="Personal Email"/>
                            </div>
                        </div>
                        <div style={{width: "100%", marginTop: "30px"}} className="col-md-12">
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
                                        for="inputGroupFile03"
                                        ><CloudUploadIcon/> Upload a picture of yourself</label>
                                </div>
                            </div>
                        </div>
                        <div style={{width: "100%", marginTop: "30px"}} className="col-md-12">
                            <div className="input_field">
                                <input type="text" placeholder="Password"/>
                            </div>
                        </div>
                        <a style={{width: "100%", marginTop: "30px"}} href="/" className="btn head-btn1">Register</a>
                        
                    </div>
                </form>
                <a style={{color: "blue", cursor: "pointer"}} href>Or log in if you already have an account</a>
            </div>
}


export default Signup