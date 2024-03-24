import React from 'react';
import '../Sidebar/sidebar.scss';
import { NavLink } from 'react-router-dom';
import { FaApple } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
// import { FaPeopleRoof } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { RiGitRepositoryFill } from "react-icons/ri";
import { FaCcAmazonPay } from "react-icons/fa";

const Sidebar = () => {

  const Menu = [
    {
      title: "Dashbord",
      path: "/Dashbord",
      icon: <RxDashboard size='34px' color='aliceblue' />,
      id: 1,
    },
    {
      title: "Employee management",
      path: "/Employee management",
      // icon: <FaPeopleRoof size='34px' color='aliceblue' />,
      id: 2,
    },
    {
      title: "Attendance reports",
      path: "/Attendance reports",
      icon: <FaApple color='aliceblue' size='34px' />,
      id: 3,
    },
    {
      title: "Overtime management",
      path: "/Overtime management",
      icon: <FaClock size='34px' color='aliceblue' />,
      id: 4,
    },
    {
      title: "Shedule management",
      path: "/Shedule management",
      icon: <IoCalendarNumberOutline size='34px' color='aliceblue' />,
      id: 5,
    },
    {
      title: "Position management",
      path: "/Position management",
      icon: <RiGitRepositoryFill color='aliceblue' size='34px' />,
      id: 6,
    },
    {
      title: "Payroll management",
      icon: <FaCcAmazonPay size='34px' color='aliceblue' />,
      path: "/Payroll management",
      id: 7,
    },
    {
      title: "Profile management",
      path: "/Profile management",
      icon: <FaCcAmazonPay size='34px' color='aliceblue' />,
      id: 8,
    },
  ];

  return (
    <div className='sidebar-holder'>
      {Menu.map((item, index) => (
        <div className="menu" key={item.id}>
          <NavLink
            to={item.path}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div className="holder">
              <div className="value">
                <div>{item.title}</div>
                <div>{item.icon}</div>
              </div>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
