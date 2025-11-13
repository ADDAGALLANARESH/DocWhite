import React from "react";
import "./Fotter.css";

import { FaHandshake, FaInstagram, FaYoutube, FaTelegramPlane, FaLinkedinIn, FaFacebookF, FaPhoneAlt } from "react-icons/fa";

const Fotter = () => {
  return (
    <footer className="footer-container">

      {/* ✅ TOP MENU */}
      <div className="footer-top-menu">
        <span className="lift-item">Blogs</span>
        <span className="lift-item">FAQs</span>
        <span className="lift-item">Terms and conditions</span>
        <span className="lift-item">Contact Us</span>
        <span className="lift-item">Privacy Policy</span>
      </div>

      {/* ✅ MIDDLE ROW (Left – Center – Right) */}
      <div className="footer-middle-row">

        {/* LEFT - Email */}
        <div className="footer-email">
          <FaHandshake className="footer-handshake" />
          <span>help@doctutorials.com</span>
        </div>

        {/* CENTER - Social Icons */}
        <div className="footer-social">
          <FaInstagram className="social-icon" />
          <FaYoutube className="social-icon" />
          <FaTelegramPlane className="social-icon" />
          <FaLinkedinIn className="social-icon" />
          <FaFacebookF className="social-icon" />
        </div>

        {/* RIGHT - Phone Numbers */}
        <div className="footer-phone">
          <FaPhoneAlt className="footer-phone-icon" />
          <span>7097434567, 7097634567 (10 AM TO 7 PM)</span>
        </div>

      </div>
    </footer>
  );
};

export default Fotter;
