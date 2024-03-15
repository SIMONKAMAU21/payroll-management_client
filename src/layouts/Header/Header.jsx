import React, { useState } from 'react';
import './Header.scss';
import img from '../../assets/img1.jpg';
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
// import ProfileManagement from '../ProfileManagement/ProfileManagement';
import ProfileManagement from '../../pages/Profile/ProfileManagement';

const Header = () => {
  const navigate = useNavigate();
  const [showProfileManagement, setShowProfileManagement] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const toggleProfileManagement = () => {
    setShowProfileManagement(!showProfileManagement);
  };

  return (
    <div className='container'>
      <div className="logo">
        <div className="text">
          <h1>logo</h1>
        </div>
      </div>
      <div className="profile">
        <div className="search">
          <input type="text" placeholder='search...' />
        </div>
        <div className="images" onClick={toggleProfileManagement}>
          <img src={img} alt="Profile" />
          {showProfileManagement && <ProfileManagement />}
        </div>
        <div className='logout'> 
          <RiLogoutBoxRFill size='40px' color='rgba(255, 153, 0, 1)' onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Header;
