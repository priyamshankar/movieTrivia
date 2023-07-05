import React from 'react';
import "./style/Navbar.css";
import logo from "../../Global/GlobalImages/logo50.png"

const Navbar = () => {
  return (
    <div className="navbar-container">
        <div className="grid-right-half-nav">

            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            <div className="BrandName">
                SmartSharads
            </div>
        
        </div>
        <div className="gridlefthalf-nav">
                <div className="font-nav-links">
                    Github
                </div>
                <div className="font-nav-links">
                    Linkedin
                </div>
                <div className="font-nav-links">
                    Leetcode
                </div>
                <button>Support</button>
        </div>
    </div>
  )
}

export default Navbar