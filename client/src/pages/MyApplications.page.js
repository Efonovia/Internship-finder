import React from 'react';
import "../styles/myapplications.css"
import ArticleIcon from '@mui/icons-material/Article';


function MyApplications() {
    const [ showBox, setShowBox ] = React.useState(false)

    function onChatClick() {
        setShowBox(prev => !prev)
    }

    return <div className="chat-area">
                <div className="chatlist">
                    <div className="modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="chat-header">My Applications</div>

                            <div className="modal-body">
                                <div className="chat-lists">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="Open" role="tabpanel" aria-labelledby="Open-tab">
                                            <div className="chat-list">
                                                <a onClick={onChatClick} href className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"></img>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h3>Mehedi Hasan</h3>
                                                        <p>front end developer</p>
                                                    </div>
                                                </a>
                                                <a onClick={onChatClick} href className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"></img>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h3>Mehedi Hasan</h3>
                                                        <p>front end developer</p>
                                                    </div>
                                                </a>
                                                <a onClick={onChatClick} href className="d-flex align-items-center">
                                                    <div className="flex-shrink-0">
                                                        <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"></img>
                                                    </div>
                                                    <div className="flex-grow-1 ms-3">
                                                        <h3>Mehedi Hasan</h3>
                                                        <p>front end developer</p>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className={showBox ? "chatbox showbox" : "chatbox"}>
                    <div className="modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="msg-head">
                                <div className="row my-cen-row">
                                    <div style={{margin: "auto"}} className="col-8">
                                        <div className="d-flex align-items-center">
                                            <span onClick={()=>setShowBox(prev => !prev)} className="chat-icon"><img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg" alt="title"></img></span>
                                            <div className="flex-shrink-0">
                                                <img className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/user.png" alt="user img"></img>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h3>Mehedi Hasan</h3>
                                                <p>front end developer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="modal-body">
                                <div className="msg-body">
                                    <ul>
                                        <li className="sender">
                                            <div className='application-message'>
                                                <div className="application-header">Application Overview</div>
                                                <p>Mollit anim laborum duis au dolor in voluptate velit ess cillum dolore eu lore dsu quality mollit anim laborumuis au dolor in voluptate velit cillum.

            Mollit anim laborum.Duis aute irufg dhjkolohr in re voluptate velit esscillumlorMollit anim laborum duis au dolor in voluptate velit ess cillum dolore eu lore dsu quality mollit anim laborumuis au dolor in voluptate velit cillum.

            Mollit anim laborum.Duis aute irufg dhjkolohr in re voluptate velit esscillumlore eu quife nrulla parihatur. Excghcepteur signjnt occa cupidatat non inulpadeserunt mollit aboru. temnthp incididbnt ut labore mollit anim laborum suis aute.e eu quife nrulla parihatur. Excghcepteur signjnt occa cupidatat non inulpadeserunt mollit aboru. temnthp incididbnt ut labore mollit anim laborum suis aute.</p>
                                                <div className="attachment">Attached: <span><ArticleIcon /> Igbinovia Efosa CV.pdf</span></div>
                                                <span className="time">Sent on: 10:06 am</span>
                                            </div>
                                        </li>
                                        {/* <h1 style={{fontSize: "30px", textAlign: "center", marginTop: "50px"}}>You haven't gotten a response yet, check back later</h1> */}
                                        <li className="reply">
                                            <div style={{background: "#4b7bec"}} className='application-message'>
                                                <div className="application-header">Application response</div>
                                                <p>Mollit anim laborum duis au dolor in voluptate velit ess cillum dolore eu lore dsu quality mollit anim laborumuis au dolor in voluptate velit cillum.


            Mollit anim laborum.Duis aute irufg dhjkolohr in re voluptate velit esscillumlore eu quife nrulla parihatur. Excghcepteur signjnt occa cupidatat non inulpadeserunt mollit aboru. temnthp incididbnt ut labore mollit anim laborum suis aute.e eu quife nrulla parihatur. Excghcepteur signjnt occa cupidatat non inulpadeserunt mollit aboru. temnthp incididbnt ut labore mollit anim laborum suis aute.</p>
                                                <span className="time">Sent on: 10:06 am</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}


export default MyApplications