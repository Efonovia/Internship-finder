import React from 'react';
import "../styles/searchbar.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function Searchbar(props) {
    

    return <div className="input-box">
                <i className="uil uil-search"><SearchOutlinedIcon /></i>
                <input name='query' value={props.value} onChange={event => props.onChange(event)} type="text" placeholder="Search here..." />
                <button onClick={() => props.executeSearch()} className="button" style={{background: props.value ? "#fb246a" : "gray"}}>Search</button>
            </div>
}


export default Searchbar