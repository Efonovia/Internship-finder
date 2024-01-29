import React from 'react';
import "../styles/companiescontainer.css"
import CompanyCard from './CompanyCard.components';

function CompaniesContainer() {


    return <section className="post-area section-gap">
                <div className="section-tittle text-center">
                    <span>FEATURED Companies</span>
                    <h2>Browse through the best companies in Nigeria</h2>
                </div>
                <div className="container">
                    <div className="row justify-content-center d-flex">
                        <div style={{maxWidth: "80%"}} className="col-lg-8 post-list" id='my-col'>
                            
                            <CompanyCard />
                            <CompanyCard />
                            <CompanyCard />
                            <CompanyCard />
                            <CompanyCard />
                            
                            <a
                                className="text-uppercase loadmore-btn mx-auto d-block"
                                href="category.html">Load More job Posts</a>
                        </div>
                        
                    </div>
                </div>
            </section>
}


export default CompaniesContainer