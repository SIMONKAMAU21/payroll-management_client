import React from 'react'
import './Header.scss'
import img from '../../assets/img1.jpg'

const Header = () => {
  return (
    <div className='container'>
<div className="logo">
  <div className="text">
    {/* <img src="" alt="nopic" srcset="" /> */}
    <h1>logo</h1>
  </div>
</div>
<div className="profile">
  <div className="search">
    <input type="text" placeholder='search...' />
  </div>
  <div className="images">
    <img src={img} alt="nopic" srcset="" />
  </div>
</div>

    </div>
  )
}

export default Header