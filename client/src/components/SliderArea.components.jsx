import React from 'react';
import ComboBox from './mui/Autocomplete.components.mui';
import importantTagsDetails from '../data/important_tags_details';
import nigerianStates from '../data/nigeria_states';
import { useNavigate } from 'react-router-dom';
import CheckboxesTags from './mui/CategoriesInput.components';
import nileBanner from "../assets/img/nile-banner.jpg"


function SliderArea() {
    const navigate = useNavigate()
    const [searchState, setSearchState] = React.useState(undefined)
    const [searchCategories, setSearchCategories] = React.useState([])

    function onSearchStateChange(value) {
        setSearchState(value)
        console.log(value)
    }

    function onSearchCategoriesChange(value) {
        if(value.length < 4) {
            setSearchCategories(value)
        }
        console.log(searchCategories)
    }

    function executeFilter() {
        console.log(searchCategories, searchState)
        if(!searchCategories.length && !searchState) {
            return
        }
        let urlQueries = []
        if(searchCategories) {
            urlQueries.push(`categories=${searchCategories.join(",")}`)
        }
        if(searchState) {
            urlQueries.push(`state=${searchState}`)
        }
        urlQueries.push("page=1")
        navigate(`/companies/search?${urlQueries.join("&")}`)
    }


    return <div className="slider-area">
    <div className="slider-active">
        <div
            className="single-slider slider-height d-flex align-items-center"
            style={{
                backgroundImage: `url(${nileBanner})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-9 col-md-10">
                        <div className="hero__caption">
                            <h1 style={{ color: "white" }}>
                                Find the best internship opportunities
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-8">
                        <form style={{ background: "white" }} action="#" className="search-box">
                            <div  className="select-form">
                                <CheckboxesTags
                                    placeholder="Categories"
                                    value={searchCategories}
                                    onCategoriesChange={onSearchCategoriesChange}
                                    options={Object.keys(importantTagsDetails)} 
                                    width={340} 
                                    label="Categories" 
                                />
                            </div>
                            <div className="select-form">
                                <ComboBox 
                                    options={Object.keys(nigerianStates)} 
                                    width={340} 
                                    label="States"
                                    value={searchState}
                                    onStateChange={onSearchStateChange}
                                />
                            </div>
                            <div className="search-form">
                                <a href onClick={executeFilter} style={{ color: "white", cursor: "pointer" }}>Find internship</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
}


export default SliderArea