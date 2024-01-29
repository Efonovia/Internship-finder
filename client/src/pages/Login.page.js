import React from 'react';
import "../styles/applicationform.css"

function Login() {

    return <div style={{position: "relative", top: "100px", width: "60%", margin: "auto"}} className="apply_job_form white-bg">
                <h4 style={{textAlign: "center"}}>Login to [Name of APp]</h4>
                <form action="#">
                    <div className="row my-row">
                        <div className="col-md-12">
                            <div className="input_field">
                                <input type="text" placeholder="Nile Student ID"/>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="input_field">
                                <input type="text" placeholder="Password"/>
                            </div>
                        </div>
                        <a style={{width: "100%", marginTop: "30px"}} href="/" className="btn head-btn1">Register</a>
                    </div>
                </form>
                <a style={{color: "blue", cursor: "pointer"}} href>Or create an account if you don't have one</a>
            </div>
}


export default Login