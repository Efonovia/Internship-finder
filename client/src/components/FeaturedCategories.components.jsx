import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categoriesIcon } from '../data/categoriesIcon';


function FeaturedCategories() {
    const navigate = useNavigate()
    const categoriesHtml = categoriesIcon.map(({ name, icon, amount }) => {
        return <div key={name} onClick={()=>navigate(`/companies/categories?categories=${name}&page=1`)} className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                    <div className="single-services text-center mb-30">
                        <div className="services-ion">
                            <span className="flaticon-real">{icon}</span>
                        </div>
                        <div className="services-cap">
                            <h5>
                                <a href>{name}</a>
                            </h5>
                            <span>({amount})</span>
                        </div>
                    </div>
                </div>
    })

    return <div className="our-services section-pad-t30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-tittle text-center">
                                <span>FEATURED TOURS Packages</span>
                                <h2>Browse Top Categories</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-contnet-center">{categoriesHtml}</div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="browse-btn2 text-center mt-50">
                                <a href onClick={()=>navigate("/companies/categories")} className="border-btn2">Browse All Sectors</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}


export default FeaturedCategories