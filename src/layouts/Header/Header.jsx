import React, { useState } from 'react';
import './Header.scss';
import img from '../../assets/img1.jpg';
import { RiLogoutBoxRFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Header = () => {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      setEmployeeData(userDetails);
    }
  }, []);

  const handleLogout = () => {
    navigate('/');
  };



  return (
    <div className='container'>
      <div className="logo">
        <div className="text">
<img src="" alt="nolog" srcSet="no logo" />        </div>
      </div>
      <div className="profile">
        <div className="search">
          <input type="text" placeholder='search...' />
        </div>
        <div className="images">
          {employeeData && <img src={employeeData.PhotoURL} alt="Profile" />}
        </div>
        <div className='logout'> 
          <RiLogoutBoxRFill size='40px' color='rgba(255, 153, 0, 1)' onClick={handleLogout} />
        </div>
      
        </div>
        
      </div>
  );
};

export default Header;
