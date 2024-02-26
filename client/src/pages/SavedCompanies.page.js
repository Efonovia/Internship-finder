import React from 'react';
import { useSelector } from 'react-redux';
import CompanyCard from '../components/CompanyCard.components';
import { httpGetCompanyById } from '../hooks/requests.hooks';
import { CircularProgress } from '@mui/material';


function SavedCompanies() {
    const userInfo = useSelector(state => state.user)
    const [loading, setLoading] = React.useState(true)
    const [savedCompanies, setSavedCompanies] = React.useState([])
    const savedCompaniesHtml = savedCompanies?.map(featuredCompany => <CompanyCard 
                                                                                    key={featuredCompany.id} 
                                                                                    data={featuredCompany} 
                                                                                    userId={userInfo?._id}
                                                                                    savedCompanies={userInfo?.savedCompanies}
                                                                                />)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    userInfo.savedCompanies.map(async company => {
                        const response = await httpGetCompanyById(company)
                        return response
                    })
                )
                console.log(responses)
                setSavedCompanies(responses)
            } catch (error) {
                alert('Error fetching data:', error);
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return loading ? <CircularProgress sx={{marginTop: "300px", marginLeft: "800px", color: "#fb246a"}} size={100} /> : <section className="post-area section-gap">
                <div className="section-tittle text-center">
                    <h2>Your saved companies</h2>
                </div>
                <div className="container">
                    <div className="row justify-content-center d-flex">
                        <div style={{maxWidth: "80%"}} className="col-lg-8 post-list" id='my-col'>
                            {Boolean(userInfo.savedCompanies.length) ? savedCompaniesHtml : <h4 style={{ textAlign: "center" }}>You haven't saved any companies yet</h4>}
                        </div>
                        
                    </div>
                </div>
            </section>
}


export default SavedCompanies