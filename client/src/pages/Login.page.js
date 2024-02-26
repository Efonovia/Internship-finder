import React from 'react';
import "../styles/applicationform.css"
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { useDispatch } from 'react-redux';
import { checkFormFields } from '../utils';
import { setApplications, setUser } from '../state';
import { httpGetandUpdateApplications, httpLoginStudent } from '../hooks/requests.hooks';
import { CircularProgress } from '@mui/material';

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const [formDetails, setFormDetails] = React.useState({
        studentId: "",
        password: "",
    })

    function handleChange(event) {
        const { value, name } = event.target;

        setFormDetails(prevFormDetails => ({
            ...prevFormDetails,
            [name]: value,
        }));
        console.log(formDetails)
    }

    async function submitForm() {
        try {
            const formData = new FormData();
            formData.append('studentId', formDetails.studentId);
            formData.append('password', formDetails.password);
            console.log(formDetails, formData)

            const emptyFields = checkFormFields(formDetails);
            if (emptyFields.length > 0) {
                const emptyFieldNames = emptyFields.join(', ');
                alert(`Please fill in the following fields: ${emptyFieldNames}`);
                return
            }

            setLoading(true)
            console.log(...formData)
            const response = await httpLoginStudent(formDetails)
            dispatch(setUser({ user: response.body }))
            const applicationsResponse = await httpGetandUpdateApplications(response.body._id)
            console.log("application response", applicationsResponse)
            dispatch(setApplications({ applications: applicationsResponse.body }))
            navigate("/")
         

            console.log(response)
        } catch (error) {
            setLoading(false)
            console.error('Failed to log you in:', error);
            alert('Failed to log you in try again:', error);
        } finally {
            setLoading(false)
        }
    }


    return loading ? <div style={{position: "absolute", marginTop: "300px", marginLeft: "20vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <h1 style={{textAlign: "center"}}>Signing you in. Hold on...</h1>
                        <br></br>
                        <CircularProgress sx={{color: "#fb246a"}} size={100} />
                    </div>:
    <div style={{position: "relative", top: "100px", width: "60%", margin: "auto"}} className="apply_job_form white-bg">
                <h4 style={{textAlign: "center"}}>Login to Internship Finder</h4>
                <form action="#">
                    <div style={{gap: "50px"}} className="row my-row">
                        <div className="col-md-12">
                            <div className="input_field">
                                <input onChange={handleChange} value={formDetails.studentId} name='studentId' type="text" placeholder="Nile Student ID"/>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="input_field">
                                <input onChange={handleChange} value={formDetails.password} name='password' type="text" placeholder="Password"/>
                            </div>
                        </div>
                        <a onClick={submitForm} style={{width: "100%", marginTop: "30px", color: "white"}} href className="btn head-btn1">Log in</a>
                    </div>
                </form>
                <a onClick={()=>navigate("/auth/signup")} style={{color: "blue", cursor: "pointer"}} href>Or create an account if you don't have one</a>
            </div>
}


export default Login