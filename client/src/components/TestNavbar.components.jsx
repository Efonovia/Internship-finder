import React from "react"
import "../styles/navbar.css"


function TestNavbar() {

    return <div className="nav">
            <input type="checkbox" id="nav-check"></input>
            <div className="nav-header">
                <div className="nav-title">
                    JoGeek
                </div>
            </div>
            <div className="nav-btn">
                <label for="nav-check">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
            
            <div className="nav-links">
                <a href="//github.io/jo_geek">Home</a>
                <a href="http://stackoverflow.com/users/4084003/">Companies</a>
                <a href="https://codepen.io/jo_Geek/">Signup</a>
                <a href="https://jsfiddle.net/user/jo_Geek/">Login</a>
            </div>
        </div>
}


export default TestNavbar