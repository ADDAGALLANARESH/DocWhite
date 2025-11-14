import React, { useState } from "react";
import "./NeetSS.css";
import Fotter from "./Fotter";
import Header from "./Header";
import { FaUser, FaEnvelope, FaPhoneAlt, FaUniversity, FaPen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const specializationOptions = {
  "ANAESTHESIOLOGY GROUP": [
    "D.M. Cardiac Anaesthesia",
"D.M. Neuro Anesthesia",
"D.M. Organ Transplant Anesthesia and Critical Care",
"D.M. Paediatric and Neonatal Anaesthesia",
"DNBSS Cardiac Anaesthesia",
"DNBSS Neuro Anaesthesia and Critical Care"
  ],
  "ENT GROUP": ["M.CH. Head and Neck Surgery"],
  "MEDICAL GROUP": ["D. M. Cardiology",
"D.M. Clinical Haematology",
"D.M. Clinical Immunology and Rheumatology",
"D.M. Critical Care Medicine",
"D.M. Endocrinology",
"D.M. Hepatology",
"D.M. Infectious Disease",
"D.M. Medical Gastroenterology",
"D.M. Medical Genetics",
"D.M. Medical Oncology",
"D.M. NEPHROLOGY",
"D.M. Neurology",
"DNBSS Cardiology",
"DNBSS Critical Care Medicine",
"DNBSS Endocrinology",
"DNBSS Gastroenterology"],
  "MICROBIOLOGY GROUP": ["D.M. Virology"],
  "OBSTETRICS AND GYNAECOLOGY GROUP": ["DNBSS Gynaecologic Oncology",
"M.Ch Reproductive Medicine and Surgery",
"M.CH. Gynecological Oncology"
  ],
  "ORTHOPAEDICS GROUP": ["M.Ch Paediatric Orthopaedics",
"M.Ch. Hand Surgery"],
  "PAEDIATRIC GROUP": ["D.M. Neonatology",
"D.M. Paediatric Nephrology",
"D.M. Paediatric Neurology",
"D.M. Paediatric Oncology",
"D.M. Paediatrics Cardiology",
"D.M. Paediatrics Gastroenterology",
"D.M. Pediatric Hepatology",
"DNBSS Neonatology",
"DNBSS Paediatric Neurology",
"DNBSS Pediatric Cardiology",
"DNBSS Pediatric Intensive Care"],
  "PATHOLOGY GROUP": ["DM Onco-Pathology"],
  "PHARMACOLOGY GROUP": ["DM Clinical Pharmacology"],
  "PSYCHIATRY GROUP": ["D.M. Geriatric Mental Health"],
  "RADIODIAGNOSIS GROUP": [
    "D.M. Interventional Radiology",
"D.M. Neuro-Radiology",
"DNBSS Endovascular and Interventional Radiology"
  ],
  "RESPIRATORY MEDICINE GROUP": [
    "DM Pulmonology Medicine"
  ],
  "SURGICAL GROUP": ["DNBSS Genito Urinary Surgery (Urology)",
"DNBSS Neuro Surgery",
"DNBSS Paediatric Surgery",
"DNBSS Peripheral Vascular Surgery",
"DNBSS Plastic Surgery",
"DNBSS Surgical Gastroenterology",
"DNBSS Surgical Oncology",
"DNBSS Thoracic Surgery",
"M.CH. Cardio Vascular and Thoracic Surgery",
"M.CH. Endocrine Surgery",
"M.CH. HepatoPancreatto Billary Surgery",
"M.CH. Neuro Surgery",
"M.CH. Paediatrics Surgery",
"M.CH. Plastic and Reconstructuctive Surgery",
"M.CH. Surgical Gastroenterology",
"M.CH. Surgical Oncology"]
};

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
  const [tableData, setTableData] = useState([]);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handle = () => {
    navigate("/NeetPg", { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset specialization when changing group
    if (name === "group") {
      setFormData({
        ...formData,
        group: value,
        specialization: "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrors({ ...errors, [name]: "" });
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

  // API CALL
  const callSeatPredictAPI = async () => {
    try {
      const response = await fetch("https://svcp.doctutorials.com/dataInfov2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          serreqid: "/predictSeatSS",
          appversion: "1.0.0.0",
          channelid: "Web",
        },
        body: JSON.stringify({
          gatewayRequest: {
            request: {
              name: formData.name,
              email: formData.email,
              rank: formData.rank,
              qualifyingGroup: formData.group,
              specialization: formData.specialization,
              mobileNo: formData.mobile,
            },
          },
        }),
      });

      const data = await response.json();
      return data?.gatewayResponse?.response?.seatPredictor || [];

    } catch (error) {
      console.error("API Error:", error);
      return [];
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (validate()) {
      const apiRows = await callSeatPredictAPI();

      if (apiRows.length === 0) {
        setTableData([]);
        setApiError("No seats were allotted for the selected Qualifying Group and Rank.");
        return;
      }

      const formatted = apiRows.map((item, index) => ({
        Srno: index + 1,
        rank: item.rank,
        group: item.qualifyingGroup,
        specialization: item.speciality,
        allotedInstitute: item.allotedInstitute,
      }));

      setTableData(formatted);
    }
  };

  return (
    <div className="body">
      <div className="body1">
        <div className="seat-page">
          <Header />

          {/* HEADER SECTION */}
          <div className="seat-header">
            <p className="header-title">
              Just received your NEET SS 2024 result? It’s time to find out where your rank can take you.
            </p>
            <p className="header-desc">
              Our NEET SS Seat Predictor helps you shortlist the most likely institutes based on NEET SS 2023 allotments.
            </p>

            <p className="header-subtitle">How it works:</p>
            <ul>
              <li>Select your speciality and preferences</li>
              <li>Enter your Rank and Email ID</li>
              <li>View a personalized list of probable colleges</li>
            </ul>
          </div>

          {/* FORM */}
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
                      value={formData.name}
                      placeholder="Full Name"
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
                      value={formData.rank}
                      placeholder="Rank"
                      onChange={handleChange}
                    />
                  </div>
                  {errors.rank && <p className="error-text">{errors.rank}</p>}
                </div>

                {/* EMAIL */}
                <div className="form-field">
                  <label>Email *</label>
                  <div className="input-box">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="Email"
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
                      {Object.keys(specializationOptions).map((group, i) => (
                        <option key={i} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                  {errors.group && <p className="error-text">{errors.group}</p>}
                </div>

                {/* MOBILE */}
                <div className="form-field">
                  <label>Mobile *</label>
                  <div className="input-box">
                    <FaPhoneAlt className="input-icon" />
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      placeholder="Mobile Number"
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

                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      disabled={!formData.group}
                    >
                      <option value="">-- Select --</option>

                      {formData.group &&
                        specializationOptions[formData.group].map((spec, idx) => (
                          <option key={idx} value={spec}>{spec}</option>
                        ))}
                    </select>
                  </div>
                  {errors.specialization && (
                    <p className="error-text">{errors.specialization}</p>
                  )}
                </div>
              </div>

              {/* SUBMIT BUTTONS */}
              <div className="btns">
                <button type="submit" className="submit-btn">Submit</button>
                <button className="submit-btn1" onClick={handle}>Go TO NEETPG</button>
              </div>

              {/* API ERROR */}
              {apiError && (
                <p style={{ color: "black", fontWeight: "bold", marginTop: "10px", textAlign: "center", backgroundColor: "lightpink", padding: "10px" }}>
                  {apiError}
                </p>
              )}
            </form>

            {/* DISCLAIMER (Hidden after API call or error) */}
            {tableData.length === 0 && !apiError && (
              <div className="disclaimer">
                <strong>Disclaimer: Based on</strong>
                <ul>
                  <li>NEET SS 2023 allotment list</li>
                  <li>All India Quota</li>
                  <li>Phase 1 allotment</li>
                </ul>
              </div>
            )}
          </div>

          {/* TABLE */}
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
                      <td>{row.allotedInstitute}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
      <Fotter />
    </div>
  );
};

export default Seat;
