// AdminSidebar.js
import React, { useState } from 'react';
import './AdminSidebar.css';
import AdminHeader from '../Header/AdminHeader';
import { FaHome, FaUser, FaHotel, FaBook, FaMoneyBillAlt, FaChartBar, FaEnvelope } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import AdminLogout from '../../pages/admin/AdminLogout';

function AdminSidebar() {
  const [isIconsOnly, setIsIconsOnly] = useState(false);

  const toggleIconsOnly = () => {
    setIsIconsOnly(!isIconsOnly);
  };

  const handleLogout = () => {
    // Add logic for logging out
    console.log('Logout clicked');
  };

  return (
    <>
      <AdminHeader />
      <aside className={`admin-sidebar ${isIconsOnly ? 'icons-only' : ''} w-24 sm:w-36 lg:w-44`}>
        <div className="toggle-button" onClick={toggleIconsOnly}>
          {isIconsOnly ? '☰' : '✖'}
        </div>
        <ul>
          <NavLink to='/admin/dashboard' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>
            <li>
              <FaHome className="sidebar-icon" />
              <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Dashboard</span>
            </li>
          </NavLink>
          <NavLink to='/admin/usermanagement' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>
            <li>
              <FaUser className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
              <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>User Management</span>
            </li>
          </NavLink>
          <NavLink to='/admin/room-category' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>
            <li>
              <FaHotel className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
              <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Room Types</span>
            </li>
          </NavLink>
          <NavLink to='/admin/room-list' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>
          <li>
            <HiOutlineCurrencyRupee className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Room List</span>
          </li>
          </NavLink>
          <NavLink to='/admin/room-amenities' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>
          <li>
            <FaBook className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Features</span>
          </li>
          </NavLink>
      
          <NavLink to='/admin/categorylist' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>
          <li>
            <FaMoneyBillAlt className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Payments</span>
          </li>
          </NavLink>
          {/* New li tags with corresponding icons */}
          <NavLink to='/admin/categorylist' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>
          <li>
            <FaChartBar className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Sales Report</span>
          </li>
          </NavLink>
          <NavLink to='/admin/categorylist' className="active-link" style={{ textDecoration: 'none', color: 'black' }}>
          <li>
            <FaEnvelope className={`sidebar-icon ${isIconsOnly ? 'hidden' : ''}`} />
            <span className={`menu-text ${isIconsOnly ? 'hidden' : ''}`}>Messages</span>
          </li>
          </NavLink>
          
            <AdminLogout />
          
        </ul>
      </aside>
    </>
  );
}

export default AdminSidebar;
