import React from 'react';
import "./style/Navbar.css";
import logo from "../../Global/GlobalImages/logo50.png"

const Navbar = () => {
  return (
    <div className="navbar-container">
        <div className="grid-right-half-nav">

            <div className="logo">
               <a href="/"> <img src={logo} alt="Logo" /></a>
            </div>
            <div className="BrandName">
               <a href="/"> SmartSharads </a>
            </div>
        
        </div>
        <div className="gridlefthalf-nav">
                <div className="font-nav-links">
                    <a href="/suggest">Suggest Movies</a> 
                </div>
                <div className="font-nav-links">
                   <a href="/howto">How to Play</a> 
                </div>
                {/* <div className="font-nav-links">
                    Leetcode
                </div> */}
                <a href="http://github.com/priyamshankar" target="_blank">
                <button>Contact us</button>    </a>
        </div>
    </div>
  )
}

export default Navbar