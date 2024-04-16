import React, { useEffect, useState } from 'react';
import '../Sidebar/sidebar.scss';
import { NavLink } from 'react-router-dom';
import { TbReportSearch } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiGitRepositoryFill } from "react-icons/ri";
import { FaCcAmazonPay } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { motivationalMessages } from '../../components/Worktime/worktime';

const Sidebar = () => {
  const [motivation, setMotivation] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMotivation = generateRandomMotivation();
      setMotivation(randomMotivation);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const generateRandomMotivation = () => {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    return motivationalMessages[randomIndex];
  };

  const Menu = [
    {
      title: "Home",
      path: "/Dashboard",
      icon: <FaHome  size='34px'  />,
      id: 1,
    },
    {
      title: "Employee management",
      path: "/Employee management",
      icon: <IoPerson size='34px'  />,
      id: 2,
    },
    {
      title: "Attendance reports",
      path: "/Attendance reports",
      icon: <TbReportSearch   size='34px' />,
      id: 3,
    },
    {
      title: "Overtime management",
      path: "/Overtime management",
      icon: <FaClock size='34px'  />,
      id: 4,
    },
    {
      title: "Schedule management", // Corrected spelling
      path: "/Schedule management",
      icon: <IoCalendarNumberOutline size='34px'  />,
      id: 5,
    },
    {
      title: "Position management",
      path: "/Position management",
      icon: <RiGitRepositoryFill  size='34px' />,
      id: 6,
    },
    {
      title: "Payroll management",
      icon: <FaCcAmazonPay size='34px' />,
      path: "/Payroll management",
      id: 7,
    },
    {
      title: "Project overview",
      icon: <FaCcAmazonPay size='34px'  />,
      path: "/overview",
      id: 8,
    },

  ];

  return (
    <div className='sidebar-holder'>
      {Menu.map((item) => (
        <div className="menu" key={item.id}>
          <NavLink
            to={item.path}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div className="holder">
              <div className="value">
                <div className='tittle'>{item.title}</div>
                <div className='icon'>{item.icon}</div>
              </div>
            </div>
          </NavLink>
        </div>
      ))}
      <div className="motivation">
        <div className="mtext">{motivation}</div>
      </div>
    </div>
  );
};

export default Sidebar;
