import React from 'react';
import "../styles/searchbar.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function Searchbar() {


    return <div className="input-box">
                <i className="uil uil-search"><SearchOutlinedIcon /></i>
                <input type="text" placeholder="Search here..." />
                <button className="button">Search</button>
            </div>
}


export default Searchbar