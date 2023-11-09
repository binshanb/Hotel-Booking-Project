import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";
import img from "../../assets/logo7.png";

//import {MdOutlineLogout} from 'react-icons/md';
import Logout from "../../pages/user/Logout";



function Navbar () {

  

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentActive, setCurrentActive] = useState(null);
  

  

  const handleMobileMenuClick = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };
  const { userInfo } = useSelector((state) => state.auth);
  
  const handleClick = (index) => {
    setCurrentActive(index);
  };

  const navLinks = [
    { id: 1, text: 'Home', path: '/' },
    { id: 4, text: 'Rooms', path: '/categorylist' },
    { id: 3, text: 'Services', path: '/services' },
    { id: 2, text: 'About', path: '/about' },
    { id: 5, text: 'Contact', path: '/contact' },
  ];
  
  
  return (
      <>
      <nav className="bg-blue-300 p-4">
        <Link to="/">
          <img src={img} alt="Logo" className="w-20"/>
        </Link> 
        <div>
          <ul
            id="navbar"
            className={mobileMenuOpen ? "active" : ""}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.path}
                  className={
                    link.id === currentActive ? "active-link" : "" // Tailwind CSS classes
                  }
                  onClick={() => {
                    handleClick(link.id);
                    if (window.innerWidth <= 769) {
                      handleMobileMenuClick();
                    }
                  }}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            {/* Add a profile icon here */}
            <li>

    <Link to="/user-profile" className="profile-icon">
      <i className="fas fa-user"></i>
    </Link>
  
</li>
            {userInfo ? (
              // If user is logged in, show the Logout button
              <li>
                <Logout/>
              
              </li>
            ) : (
              // If user is not logged in, show the Login button
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        <div id="mobile" onClick={handleMobileMenuClick}>
          <i
            id="bar"
            className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`} // Tailwind CSS classes
          ></i>

        </div>
      </nav>
    </>
  );
    
            }
export default Navbar;