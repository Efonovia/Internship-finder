import React from 'react';
import defaultLogo from "../assets/img/post.png"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';
import {nanoid} from "nanoid"
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import { httpToggleSavedCompany } from '../hooks/requests.hooks';
import { useDispatch } from 'react-redux';
import { updateSavedCompanies } from '../state';

function CompanyCard(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { _id, name, tags, logo, street, city, state, phoneNumbers, website, email, description, workingHours } = props.data
    const tagsHtml = tags.map(tag => <li key={nanoid()} onClick={() => navigate(`/companies/categories?categories=${tag}&page=1`)}><a href>{tag}</a></li>)
    const isLiked = Boolean(props.savedCompanies?.includes(_id))
    const [likedState, setLikedState] = React.useState(isLiked)

    async function toggleSavedCompany() {
        if(!props.userId || !props.savedCompanies) {
            console.log(props.userId, props.savedCompanies)
            alert("You have to be logged in to save a company")
            return
        }

        try {

            setLikedState(isLiked ? false : true)
            const response = await httpToggleSavedCompany({
                studentId: props.userId,
                companyId: _id, 
                addToSaved: isLiked ? false : true
            })

            console.log("response", response)
            dispatch(updateSavedCompanies({ companyId: _id, addToSaved: isLiked ? false : true }))
            
        } catch (error) {
            console.log(error)
        }
    }


    return <div className="single-post d-flex flex-row">
                <div style={{marginRight: "10px", maxWidth: "150px"}} className="thumb">
                    <img src={logo !== "/images/no-image-available.jpg" ? `https://www.finelib.com${logo}`: defaultLogo} alt="pic" />
                    <ul className="tags">{tagsHtml}</ul>
                </div>
                <div className="details">
                    <div className="title d-flex flex-row justify-content-between">
                        <div className="titles">
                            <a href><h4>{name}</h4></a>
                            <h6 className="my-h6"><LocationOnIcon />{[street, city, state].join(", ")}</h6>
                        </div>
                        <ul className="btns">
                            <li onClick={toggleSavedCompany} id='like-btn-holder'>
                                {likedState ? <FavoriteIcon sx={{ color: "#fb246a" }} /> : <FavoriteBorderIcon />}
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