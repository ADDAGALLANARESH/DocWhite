import React, { useState } from "react";
import "./NeetSS.css";
import Fotter from "./Fotter";
import Header from "./Header";
import { FaUser, FaEnvelope, FaPhoneAlt, FaUniversity, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Seat = () => {
  const [formData, setFormData] = useState({
    name: "",
    rank: "",
    email: "",
    mobile: "",
    group: "",
    specialization: "",
  });

  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);    // ✅ NEW
  const navigate = useNavigate();

  const handle = () => {
    navigate("/NeetPg", { replace: true });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Please enter name";
    if (!formData.rank.trim()) newErrors.rank = "Enter valid rank";

    if (!formData.email.trim()) {
      newErrors.email = "Please enter valid email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter valid email";
    }

    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid mobile number";
    }

    if (!formData.group) newErrors.group = "Select a group";
    if (!formData.specialization) newErrors.specialization = "Select specialization";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {

      // ✅ Add row to table
      setTableData((prev) => [
        ...prev,
        {
          Srno: prev.length + 1,
          rank: formData.rank,
          group: formData.group,
          specialization: formData.specialization,
          institute: "Will be Updated After API", // ✅ Placeholder
        },
      ]);
    }
  };

  return (
    <>
      <Header />

      <div className="seat-page">

        {/* ✅ Header */}
        <div className="seat-header">
          <p className="header-title">
            Just received your NEET SS 2024 result? It’s time to find out where your rank can take you.
          </p>

          <p className="header-desc">
            Our NEET SS Seat Predictor helps you shortlist the most likely institutes and hospitals based on your score — using real data from NEET SS 2023 seat allotments.
          </p>

          <p className="header-subtitle">How it works:</p>

          <ul>
            <li>Select your speciality and preferences</li>
            <li>Enter your Rank and Email ID</li>
            <li>Instantly view a personalized list of probable colleges</li>
          </ul>

          <p className="info-text">
            Make informed decisions and plan your next steps with confidence.
            We recommend using a desktop or tablet for the best experience.
          </p>
        </div>

        {/* ✅ Form Card */}
        <div className="form-container">
          <h2 className="form-title">Check Your Seat Allotment</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">

              {/* NAME */}
              <div className="form-field">
                <label>Name *</label>
                <div className="input-box">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              {/* RANK */}
              <div className="form-field">
                <label>NEET SS 2024 Rank *</label>
                <div className="input-box">
                  <FaPen className="input-icon" />
                  <input
                    type="text"
                    name="rank"
                    placeholder="Rank"
                    value={formData.rank}
                    onChange={handleChange}
                  />
                </div>
                {errors.rank && <p className="error-text">{errors.rank}</p>}
              </div>

              {/* EMAIL */}
              <div className="form-field">
                <label>Email Id *</label>
                <div className="input-box">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              {/* GROUP */}
              <div className="form-field">
                <label>Qualifying Group *</label>
                <div className="input-box">
                  <FaUniversity className="input-icon" />
                  <select name="group" value={formData.group} onChange={handleChange}>
                    <option value="">-- Select --</option>
                    <option value="Anaesthesia">Anaesthesia</option>
                    <option value="Medical">Medical</option>
                    <option value="Surgical">Surgical</option>
                  </select>
                </div>
                {errors.group && <p className="error-text">{errors.group}</p>}
              </div>

              {/* MOBILE */}
              <div className="form-field">
                <label>Mobile Number *</label>
                <div className="input-box">
                  <FaPhoneAlt className="input-icon" />
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                {errors.mobile && <p className="error-text">{errors.mobile}</p>}
              </div>

              {/* SPECIALIZATION */}
              <div className="form-field">
                <label>Specialization *</label>
                <div className="input-box">
                  <FaUniversity className="input-icon" />
                  <select name="specialization" value={formData.specialization} onChange={handleChange}>
                    <option value="">-- Select --</option>
                    <option value="M.Ch Pediatrics">M.Ch Pediatrics</option>
                    <option value="DM Cardiology">DM Cardiology</option>
                  </select>
                </div>
                {errors.specialization && <p className="error-text">{errors.specialization}</p>}
              </div>
            </div>

            <div className="btns">
              <button type="submit" className="submit-btn">Submit</button>
              <button className="submit-btn1" onClick={handle}>Go TO NEETPG</button>
            </div>
          </form>

          {/* Disclaimer */}
          <div className="disclaimer">
            <strong>Disclaimer: Based on</strong>
            <ul>
              <li>NEET SS 2023 allotment list</li>
              <li>All India Quota</li>
              <li>Phase 1 allotment</li>
            </ul>
          </div>
        </div>

        {/* ✅ TABLE SHOWS HERE AFTER SUBMIT */}
        {tableData.length > 0 && (
          <div className="form-container" style={{ marginTop: "20px" }}>
            <h2 className="form-title">Your Seat Prediction</h2>

            <table className="seat-table">
              <thead>
                <tr>
                  <th>Srno</th>
                  <th>Rank</th>
                  <th>Qualifying Group</th>
                  <th>Speciality</th>
                  <th>Allotted Institute</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.Srno}</td>
                    <td>{row.rank}</td>
                    <td>{row.group}</td>
                    <td>{row.specialization}</td>
                    <td>{row.institute}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      <Fotter />
      </div>

      
    </>
  );
};

export default Seat;
