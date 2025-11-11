import React from 'react'
import "./Header.css";

const Header = () => {
  return (
    <div className='header'>
        <div className='img'>
      <img
          src="/header-logo.svg"
          alt="Logo"
          className="dashLogo"
        /></div>
        <div className='cont'>
            <h2>NEET PG 2024 Seat Predictor</h2>
        </div>
    </div>
  )
}

export default Header
