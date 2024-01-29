import React from 'react';
import ComboBox from './mui/Autocomplete.components.mui';
import importantTagsDetails from '../data/important_tags_details';
import nigerianStates from '../data/nigeria_states';
function SliderArea() {


    return <div className="slider-area">
    <div className="slider-active">
        <div
            className="single-slider slider-height d-flex align-items-center"
        >
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-9 col-md-10">
                        <div className="hero__caption">
                            <h1>
                                Find the best internship opportunities
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-8">
                        <form action="#" className="search-box">
                            <div className="select-form">
                                <ComboBox options={Object.keys(importantTagsDetails)} width={300} label="Categories"/>
                            </div>
                            <div className="select-form">
                                <ComboBox options={Object.keys(nigerianStates)} width={300} label="States"/>
                            </div>
                            <div className="search-form">
                                <a href="/">Find internship</a>
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