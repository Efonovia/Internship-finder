import React from 'react';
import "../styles/myapplications.css"
import ArticleIcon from '@mui/icons-material/Article';
import { httpGetandUpdateApplications, httpViewAllUnreadMessages } from '../hooks/requests.hooks';
import { useDispatch, useSelector } from 'react-redux';
import defaultLogo from "../assets/img/post.png"
import { setApplications } from '../state';
import { CircularProgress } from '@mui/material';
import { capitalizeWords, formatDate, formatTime } from '../utils';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';


function MyApplications() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ showBox, setShowBox ] = React.useState(false)
    const [ loading, setLoading ] = React.useState(true)
    const [ marking, setMarking ] = React.useState(false)
    const [ currentApplication, setCurrentApplication ] = React.useState(null)
    const userInfo = useSelector(state => state.user)
    const applications = useSelector(state => state.applications)
    console.log("ze applicatins", applications)
    // if(applications === null || userInfo === null) {
    //     navigate("/auth/login")
    // }

    function onChatClick(application) {
        setShowBox(prev => !prev)
        setCurrentApplication(application)
    }

    async function markMessagesAsRead() {
        if(!applications?.length || marking) {
            return
        }
        try {
            setMarking(true)
            let unreadMessages = []
            applications.forEach(application => {
                application.briefMessages.forEach(msg => {
                    if(!msg.seen) {
                        unreadMessages.push({
                            id: application._id,
                            mailId: msg.gmailId
                        })
                    }
                })
            })
    
            console.log(unreadMessages)
            const responses = await Promise.all(
                unreadMessages.map(async message => {
                    const response = await httpViewAllUnreadMessages(message)
                    return response
                })
            )
    
            console.log(responses)

            const updatedApplications = await httpGetandUpdateApplications(userInfo._id)
            dispatch(setApplications({ applications: updatedApplications?.body }))
        } catch (error) {
            console.log(error)
        } finally {
            setMarking(false)
        }
    }

    async function refreshPage() {
        if(!applications?.length) {
            return
        }
        try {
            if(userInfo) {
                setLoading(true)
                const result = await httpGetandUpdateApplications(userInfo._id);
                dispatch(setApplications({ applications: result?.body }))
                console.log("running...")
            }
        } catch (error) {
            alert('Error loading your applications. refresh page:', error);
            console.error('Error loading your applications. refresh page:', error);
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if(userInfo) {
                    const result = await httpGetandUpdateApplications(userInfo._id);
                    dispatch(setApplications({ applications: result?.body }))
                    console.log("running...")
                }
            } catch (error) {
                alert('Error loading your applications. refresh page:', error);
                console.error('Error loading your applications. refresh page:', error);
            } finally {
                setLoading(false)
            }
        }

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps

        
    }, [dispatch, userInfo, userInfo._id])

    const applicationsToSort = [...applications]
    const applicationsHtml = applicationsToSort?.sort((a,b) => new Date(b.dateMade)-new Date(a.dateMade)).map(application => {
        const unreadMessagesCount = application?.briefMessages.filter(msg => !msg.seen).length
        return <a key={application._id} onClick={() => onChatClick(application)} href className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                        <img 
                            className="img-fluid"
                            height={60}
                            width={60}
                            src={application?.companyLogo !== "/images/no-image-available.jpg" ? `https://www.finelib.com${application?.companyLogo}` : defaultLogo} 
                            alt="user img"
                        >
                        </img>
                    </div>
                    <div className="flex-grow-1 ms-3">
                        <h3>{application?.companyName}{application?.times > 1 && ` #${application?.times}`}</h3>
                    </div>
                        {Boolean(unreadMessagesCount) && <span className="notification-count">{unreadMessagesCount}</span>}
                </a>
    })

    const messagesHtml = currentApplication?.briefMessages.map(message => {
        const isSender = currentApplication?.applicationId === message.gmailId
        return <li className={isSender ? "sender" : "reply"}>
                    <div style={{background: !isSender && "#1f2b7b", color: !isSender && "white"}} className='application-message'>
                        <div className="application-header">{isSender ? "Application Overview" : "Application response"}</div>
                        <p>{message.messageContent}</p>
                        {isSender && <div className="attachment">Attached: <span><ArticleIcon /> {capitalizeWords(`${userInfo.firstName} ${userInfo.lastName}`)}'s CV.pdf</span></div>}
                        <span style={{ color: !isSender && "white" }} className="time">{`Sent on: ${formatDate(message.dateSent)} at ${formatTime(message.dateSent)}`}</span>
                    </div>
                </li>
    })

    return loading ? <CircularProgress sx={{marginTop: "300px", marginLeft: "800px", color: "#fb246a"}} size={100} /> : <div className="chat-area">
                <div className="chatlist">
                    <div className="modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="chat-header">My Applications</div>

                            <div className="modal-body">
                                <div className="chat-lists">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="Open" role="tabpanel" aria-labelledby="Open-tab">
                                            <div className="chat-list">{applicationsHtml}</div>
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
                                            <span onClick={()=>setShowBox(prev => !prev)} className="chat-icon"><img height={50} width={50} className="img-fluid" src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg" alt="title"></img></span>
                                            {Boolean(currentApplication) ? <>
                                                <div className="flex-shrink-0">
                                                    <img 
                                                        className="img-fluid"
                                                        height={60}
                                                        width={60}
                                                        src={currentApplication?.companyLogo !== "/images/no-image-available.jpg" ? `https://www.finelib.com${currentApplication?.companyLogo}` : defaultLogo} 
                                                        alt="user img"
                                                    >
                                                    </img>                                            
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h3 onClick={() => {navigate(`/companies/details/${currentApplication?.companyId}`)}} className="companyname-header">{currentApplication?.companyName}{currentApplication?.times > 1 && ` #${currentApplication?.times}`}</h3>
                                                </div>
                                            </> : <div className="flex-grow-1 ms-3">
                                                    <h3>.</h3>
                                                </div>}

                                                <div className='tool-buttons'>
                                                    <div 
                                                        style={{ background: !applications?.length && "grey", cursor: !applications?.length && "not-allowed" }}
                                                        onClick={refreshPage} 
                                                        className="refresh"
                                                    >
                                                        Check for new responses
                                                    </div>
                                                    <div 
                                                        style={{ background: !applications?.length && "grey", cursor: !applications?.length && "not-allowed" }}
                                                        onClick={markMessagesAsRead} 
                                                        className="mark-read"
                                                    >
                                                        {marking ? <><CircularProgress sx={{color: "white"}} size={20} />&nbsp;Marking...</> : "Mark all messages as read"}
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="modal-body">
                                <div className="msg-body">
                                    {
                                        applications?.length ? 
                                        (Boolean(currentApplication) ? <ul>{messagesHtml}</ul> : <h1>Select an application to view it's details</h1>) :
                                        <h1>You haven't applied to any companies yet</h1>
                                        }
                                    {currentApplication?.briefMessages.length < 2 && <h1 style={{fontSize: "30px", textAlign: "center", marginTop: "50px"}}>You haven't gotten a response yet, check back later</h1>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
}


export default MyApplications