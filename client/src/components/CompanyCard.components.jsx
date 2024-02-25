import React from 'react';
import defaultLogo from "../assets/img/post.png"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import {nanoid} from "nanoid"
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

function CompanyCard(props) {
    const navigate = useNavigate()
    const { _id, name, tags, logo, street, city, state, phoneNumbers, website, email, description, workingHours } = props.data
    const tagsHtml = tags.map(tag => <li key={nanoid()} onClick={() => navigate(`/companies/categories?categories=${tag}&page=1`)}><a href>{tag}</a></li>)
    return <div className="single-post d-flex flex-row">
                <div style={{marginRight: "10px", maxWidth: "150px"}} className="thumb">
                    <img src={logo !== "/images/no-image-available.jpg" ? `https://www.finelib.com${logo}`: defaultLogo} alt="pic" />
                    <ul className="tags">{tagsHtml}</ul>
                </div>
                <div className="details">
                    <div className="title d-flex flex-row justify-content-between">
                        <div className="titles">
                            <a href="single.html"><h4>{name}</h4></a>
                            <h6 className="my-h6"><LocationOnIcon />{[street, city, state].join(", ")}</h6>
                        </div>
                        <ul className="btns">
                            <li>
                                <a href><FavoriteBorderIcon /></a>
                            </li>
                            <li><a onClick={()=>navigate(`/companies/details/${_id}`)} href>Apply</a></li>
                        </ul>
                    </div>
                    <p style={{width: "90%"}}>{description !== "null" ? description : "none available"} </p>
                    <h6 className='my-h6'><EmailIcon /> Email: {email !== "null" ? email : "none available"}</h6>
                    <h6 className="my-h6"><PhoneIcon /> Phone Numbers: {phoneNumbers ? phoneNumbers.join(", ") : "none available"}</h6>
                    <h6 className="my-h6"><AccessTimeIcon/> Working Hours: {workingHours !== "null" ? workingHours : "none available"}</h6>
                    <h6 className="my-h6"><LanguageIcon/> Website: <a target='blank' href={website !== "null" ? website : true}>{website !== "null" ? website : "none available"}</a></h6>
                </div>
            </div>
}


export default CompanyCard