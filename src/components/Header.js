import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [doctorName, setDoctorName] = useState("Doctor");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const firstName = localStorage.getItem("firstName") || "";
    const lastName = localStorage.getItem("lastName") || "";
    if (firstName || lastName) {
      setDoctorName(`${firstName} ${lastName}`.trim());
    }

    // ✅ Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const handleProfile = () => {
    navigate("/profile");
    setOpen(false);
  };

  return (
    <header className="header">
      {/* Left Logo */}
      <div className="img">
        <img src="/header-logo.svg" alt="Logo" className="dashLogo" />
      </div>

      {/* Center Title */}
      <div className="cont">
        <h2>NEET SS 2024 Seat Predictor</h2>
      </div>

      {/* Right Profile Dropdown */}
      <div className="profile-section" ref={dropdownRef}>
        <button className="profile-btn" onClick={() => setOpen(!open)}>
          <span className="profile-name">{doctorName}</span>
          <span className="dropdown-icon">▾</span>
        </button>

        {open && (
          <div className="profile-dropdown">
            <button onClick={handleProfile}>👤 Profile</button>
            <button onClick={handleLogout}>🚪 Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
