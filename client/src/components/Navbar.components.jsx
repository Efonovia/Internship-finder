import React from 'react';
import logo from "../assets/img/logo/logo.png"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function Navbar() {
    const isLoggedIn = true

    return 	<header>
    <div className="header-area header-transparent">
        <div className="header-top header-sticky">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-3 col-md-2">
                        <div className="logo">
                            <a href="index-2.html"><img src={logo} alt="pic"/></a>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-9">
                        <div className="menu-wrapper">
                            <div className="main-menu">
                                <nav className="d-none d-lg-block">
                                    <ul id="navigation">
                                        <li>
                                            <a href="index-2.html">Home</a>
                                        </li>
                                        <li>
													<a href>Find Companies <ArrowDropDownIcon /></a>
													<ul className="submenu">
														<li>
															<a href="blog.html">By Search</a>
														</li>
														<li>
															<a href="single-blog.html">By State</a>
														</li>
														<li>
															<a href="elements.html">By Category</a>
														</li>
													</ul>
												</li>
                                        {isLoggedIn && <li>
                                            <a href="about.html">My Applications</a>
                                        </li>}
                                        <li>
                                            <a href="about.html">About</a>
                                        </li>
                                        <li>
                                            <a href="contact.html">Contact</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                            {!isLoggedIn && <div
                                className="header-btn d-none f-right d-lg-block">
                                <a href="/" className="btn head-btn1"
                                    >Register</a>
                                <a href="/" className="btn head-btn2">Login</a>
                            </div>}
                        </div>
                    </div>

                    <div className="col-12">
                        <div
                            className="mobile_menu d-block d-lg-none"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
}


export default Navbar