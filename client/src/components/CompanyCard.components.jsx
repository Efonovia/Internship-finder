import React from 'react';
import logo from "../assets/img/post.png"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LanguageIcon from '@mui/icons-material/Language';


function CompanyCard() {

    return <div className="single-post d-flex flex-row">
                <div style={{marginRight: "10px", width: "30%"}} className="thumb">
                    <img src={logo} alt="pic" />
                    <ul className="tags">
                        <li>
                            <a href="/">Art</a>
                        </li>
                        <li>
                            <a href="/">Media</a>
                        </li>
                        <li>
                            <a href="/">Design</a>
                        </li>
                    </ul>
                </div>
                <div className="details">
                    <div className="title d-flex flex-row justify-content-between">
                        <div className="titles">
                            <a href="single.html"><h4>Creative Art Designer</h4></a>
                            <h6 className="my-h6"><LocationOnIcon /> Premium Labels Limited</h6>
                        </div>
                        <ul className="btns">
                            <li>
                                <a href="/"><FavoriteBorderIcon /></a>
                            </li>
                            <li><a href="/">Apply</a></li>
                        </ul>
                    </div>
                    <p style={{width: "90%"}}>
                        Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit, sed do eiusmod temporinc
                        ididunt ut dolore magna aliqua.
                        ididunt ut dolore magna aliqua.
                        ididunt ut dolore magna aliqua.
                        
                    </p>
                    <h6 className='my-h6'><EmailIcon /> Email: Full time</h6>
                    <h6 className="my-h6"><PhoneIcon /> Phone Numbers: 12345678, 234567898, 23456356</h6>
                    <h6 className="my-h6"><AccessTimeIcon/> Working Hours: 4h6m - 12h6m</h6>
                    <h6 className="my-h6"><LanguageIcon/> Website: <a href='denzel.com'>denzel.com</a></h6>
                </div>
            </div>
}


export default CompanyCard