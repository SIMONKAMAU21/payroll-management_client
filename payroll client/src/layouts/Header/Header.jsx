import React from 'react';
import './Header.scss';
import img from '../../assets/img1.jpg';
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
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
        <div className="images">
          <img src={img} alt="Profile" />
        </div>
        <RiLogoutBoxRFill size='45px' color='red' onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Header;
