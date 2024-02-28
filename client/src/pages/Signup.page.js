import React from 'react';
import "../styles/applicationform.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { httpSignUpStudent } from '../hooks/requests.hooks';
import { useDispatch } from "react-redux"
import { setUser } from '../state';
import { CircularProgress } from '@mui/material';
import { checkFormFields } from '../utils';

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [formDetails, setFormDetails] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        studentId: "",
        password: "",
        picturePath: null
    })

    function handleChange(event) {
        const { value, name, files } = event.target;

        setFormDetails(prevFormDetails => ({
            ...prevFormDetails,
            [name]: name === "picturePath" ? files[0] : value,
        }));
        console.log(formDetails)
    }

    async function submitForm() {
        try {
            const formData = new FormData();
            formData.append('firstName', formDetails.firstName);
            formData.append('lastName', formDetails.lastName);
            formData.append('email', formDetails.email);
            formData.append('studentId', formDetails.studentId);
            formData.append('password', formDetails.password);
            formData.append('picturePath', formDetails.picturePath)
            console.log(formDetails, formData)

            const emptyFields = checkFormFields(formDetails);
            if (emptyFields.length > 0) {
                const emptyFieldNames = emptyFields.join(', ');
                alert(`Please fill in the following fields: ${emptyFieldNames}`);
                return
            }

            setLoading(true)
            const response = await httpSignUpStudent(formData)
            if(response.exists) {
                alert("Student already exists. try logging in instead")
                navigate("/auth/login")
            } else if(!response.exists) {
                dispatch(setUser({ user: response.body }))
                navigate("/")
            }

            console.log(response)
        } catch (error) {
            setLoading(false)
            console.error('Failed to register:', error);
            alert('Failed to register try again:', error);
        } finally {
            setLoading(false)
        }
    }

    return loading ? <div style={{position: "absolute", marginTop: "300px", marginLeft: "20vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <h1 style={{textAlign: "center"}}>Creating your account and signing you in. Hold on...</h1>
                        <br></br>
                        <CircularProgress sx={{color: "#fb246a"}} size={100} />
                    </div>:
            <div style={{position: "relative", top: "100px", width: "60%", margin: "auto"}} className="apply_job_form white-bg">
                <h4 style={{textAlign: "center"}}>Sign up for Internship Finder</h4>
                <form action="#">
                    <div className="row my-row">
                        <div className="col-md-6">
                            <div className="input_field">
                                <input onChange={handleChange} value={formDetails.firstName} name='firstName' type="text" placeholder="First Name"/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="input_field">
                                <input onChange={handleChange} value={formDetails.lastName} name='lastName' type="text" placeholder="Last Name"/>
                            </div>
                        </div>
                        <div style={{width: "100%", marginTop: "30px"}} className="col-md-6">
                            <div className="input_field">
                                <input onChange={handleChange} value={formDetails.studentId} name='studentId' type="text" placeholder="Nile Student ID"/>
                            </div>
                        </div>
                        <div style={{width: "100%", marginTop: "30px"}} className="col-md-6">
                            <div className="input_field">
                                <input onChange={handleChange} value={formDetails.email} name="email" type="text" placeholder="Personal Email"/>
                            </div>
                        </div>
                        <div style={{width: "100%", marginTop: "30px"}} className="col-md-12">
                            <div style={{borderStyle: "dashed", borderWidth: "2px", height: "100px"}} className="input-group">
                                <div className="custom-file">
                                    <label style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1px"}} className="custom-file-label" htmlFor="inputGroupFile03">
                                        <span style={{marginTop: "10px"}}><CloudUploadIcon/> Upload a picture of yourself for companies to know you better</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{display: "none"}}
                                            name="picturePath"
                                            onChange={handleChange} 
                                            className="custom-file-input"
                                            id="inputGroupFile03"
                                            aria-describedby="inputGroupFileAddon03"/><br></br>
                                            <span style={{marginTop: "-80px", color: "black"}} id="imageName">{formDetails["picturePath"]?.name}</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div style={{width: "100%", marginTop: "30px"}} className="col-md-12">
                            <div className="input_field">
                                <input onChange={handleChange} value={formDetails.password} name='password' type="text" placeholder="Password"/>
                            </div>
                        </div>
                        <a onClick={submitForm} style={{width: "100%", marginTop: "30px", color: "white"}} href className="btn head-btn1">Register</a>
                        
                    </div>
                </form>
                <a onClick={()=>navigate("/auth/login")} style={{color: "blue", cursor: "pointer"}} href>Or log in if you already have an account</a>
            </div>
}


export default Signup