import React, { useState } from 'react';
import './Header.scss';
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UpdateEmployee from '../../components/Editprofile/editProfile';
import { LoadingToast,SuccessToast,ErrorToast } from '../../components/toaster/Toaster';

const Header = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      setEmployeeData(userDetails);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsUpdateProfileOpen(true);
  };

  const handleCloseUpdateProfile = () => {
    setIsUpdateProfileOpen(false);
    setShowSuccessToast(true);
  };

  const handleToastClose = () => {
    setShowSuccessToast(false);
  };

  return (
    <div className='container'>
      <div className="logo">
        <div className="text">
          <img src="" alt="nolog" srcSet="no logo" />
        </div>
      </div>
      <div className="profile">
        <div className="search">
          <input type="text" placeholder='search...' />
        </div>
        <div className="images" onClick={handleProfileClick}>
          {employeeData && <img src={employeeData.PhotoURL} alt="Profile" />}
        </div>
        <div className='logout'>
          <RiLogoutBoxRFill size='30px' color='aliceblue' onClick={handleLogout} />
        </div>
      </div>
      {isUpdateProfileOpen && <UpdateEmployee onClose={handleCloseUpdateProfile} />}
    </div>
  );
};

export default Header;
