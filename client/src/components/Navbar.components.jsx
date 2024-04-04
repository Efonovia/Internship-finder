import React from 'react';
import logo from "../assets/img/app_logo.png"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setApplications } from '../state';
import { CircularProgress } from '@mui/material';
import "../styles/navbar.css"


function Navbar() {
    const userInfo = useSelector(state => state.user)
    const isLoggedIn = Boolean(userInfo)
    const applications = useSelector(state => state.applications)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [logoutClicked, setLogoutClicked] = React.useState(false)
    const [showMenu, setShowMenu] = React.useState(false)
    const [showSubMenu, setShowSubMenu] = React.useState(false)

    const unreadMessagesCount = React.useMemo(() => {
        let amount = 0;
    
        applications?.forEach((application) => {
          application?.briefMessages.forEach((message) => {
            if (!message.seen) {
              amount += 1;
            }
          });
        });
    
        return amount;
      }, [applications])


    function logoutClick() {
        setLogoutClicked(true)
        setTimeout(() => {
            navigate("/")
            dispatch(setUser({ user: null }))
            dispatch(setApplications({ applications: null }))
            setLogoutClicked(false)
        }, 2500)
    }

    return 	<header>
    <div className="header-area header-transparent">
        <div className="header-top header-sticky">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-3 col-md-2">
                        <div className="logo">
                            <p style={{cursor: "pointer"}} onClick={()=>navigate("/")}><img style={{ height: "7vh", marginTop: "10px" }} src={logo} alt="pic"/></p>
                        </div>
                        
                    </div>
                    <div className="col-lg-9 col-md-9">
                        <div className="menu-wrapper">
                            <div className="main-menu">
                                <nav className="d-none d-lg-block">
                                    <ul id="navigation">
                                        <li>
                                            <a href onClick={()=>navigate("/")}>Home</a>
                                        </li>
                                        <li>
													<a href>Find Companies <ArrowDropDownIcon /></a>
													<ul className="submenu">
														<li>
															<a href onClick={()=>navigate("/companies/search")}>By Search</a>
														</li>
														<li>
															<a href onClick={()=>navigate("/companies/state")}>By State</a>
														</li>
														<li>
															<a href onClick={()=>navigate("/companies/categories")}>By Category</a>
														</li>
													</ul>
												</li>
                                        {isLoggedIn && <li className='applications-nav'>
                                            {Boolean(unreadMessagesCount) && <span className="notifications">{unreadMessagesCount}</span>}
                                            <a href onClick={()=>navigate("/applications")}>My Applications</a>
                                        </li>}
                                        {isLoggedIn && <li>
                                            <a href onClick={()=>navigate("/saves")}>Saved Companies</a>
                                        </li>}
                                    </ul>
                                </nav>
                            </div>

                            {isLoggedIn && <a onClick={logoutClick} style={{color: "white", padding: "2%"}} href className="btn head-btn1">{logoutClicked ? <><CircularProgress sx={{color:'white'}} size={20} /> Logging out</> : <><LogoutIcon /> Logout</>}</a>}

                            {!isLoggedIn && <div
                                className="header-btn d-none f-right d-lg-block">
                                <a style={{color: "white"}} href onClick={()=>navigate("/auth/signup")} className="btn head-btn1">Register</a>
                                <a href onClick={()=>navigate("/auth/login")} className="btn head-btn2">Login</a>
                            </div>}
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="mobile_menu d-block d-lg-none">
                            <div className="slicknav_menu">
                                <a onClick={()=> setShowMenu(prev => !prev)} href aria-haspopup="true" role="button" tabIndex="0" className="slicknav_btn slicknav_open" style={{outline: "none"}}>
                                    <span className="slicknav_menutxt">MENU</span>
                                    <span className="slicknav_icon">
                                        <span className="slicknav_icon-bar"></span>
                                        <span className="slicknav_icon-bar"></span>
                                        <span className="slicknav_icon-bar"></span>
                                    </span>
                                </a>
                                {showMenu && <ul className="slicknav_nav" aria-hidden="false" role="menu" style={{display: "block"}}>
                                    <li onClick={()=>navigate("/")}>
                                        <a href role="menuitem" tabIndex="0">Home</a>
                                    </li>
                                    {!isLoggedIn && <li onClick={()=>navigate("/auth/signup")}>
                                        <a href role="menuitem" tabIndex="0">Register</a>
                                    </li>}
                                    {!isLoggedIn && <li onClick={()=>navigate("/auth/login")}>
                                        <a href role="menuitem" tabIndex="0">Log In</a>
                                    </li>}
                                    <li className="slicknav_parent slicknav_collapsed">
                                        <a href role="menuitem" aria-haspopup="true" tabIndex="0" className="slicknav_item slicknav_row" style={{outline: "none"}}>
                                            <a onClick={()=> setShowSubMenu(prev => !prev)} href tabIndex="0">Find Companies</a>
                                            <span className="slicknav_arrow">{showSubMenu ? "-" : "+"}</span>
                                        </a>
                                        {showSubMenu && <ul className="submenu slicknav_hidden" role="menu" aria-hidden="true">
                                            <li onClick={()=>navigate("/companies/search")}>
                                                <a href role="menuitem" tabIndex="0">By Search</a>
                                            </li>
                                            <li onClick={()=>navigate("/companies/categories")}>
                                                <a href role="menuitem" tabIndex="0">By Categories</a>
                                            </li>
                                            <li onClick={()=>navigate("/companies/state")}>
                                                <a href role="menuitem" tabIndex="0">By States</a>
                                            </li>
                                        </ul>}
                                    </li>
                                    {isLoggedIn && <li onClick={()=>navigate("/applications")}>
                                        {Boolean(unreadMessagesCount) && <span className="notifications-mobile">{unreadMessagesCount}</span>}
                                        <a href role="menuitem" tabIndex="0">My Applications</a>
                                    </li>}
                                    {isLoggedIn && <li onClick={()=>navigate("/saves")}>
                                        <a href role="menuitem" tabIndex="0">Saved Companies</a>
                                    </li>}
                                </ul>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
}


export default Navbar