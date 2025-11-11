import React, { useState } from "react";
import Fotter from "./Fotter";
import Header1 from "./Header1";
import { useNavigate } from "react-router-dom";
import "./NeetSS.css";
import { FaUser, FaEnvelope, FaPhoneAlt, FaPen, FaUniversity } from "react-icons/fa";

function NeetPg() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    rank: "",
    course: "",
    specialization: "",
    state: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [apiMessage, setApiMessage] = useState("");

  const navigate = useNavigate();
  const handle = () => {
    navigate("/NeetSS", { replace: true });
  };

  // ✅ Validation function
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) newErrors.email = "Please enter email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Enter valid email";

    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter valid 10-digit mobile number";

    if (!formData.rank.trim()) newErrors.rank = "Please enter rank";

    if (!formData.course) newErrors.course = "Please select course";
    if (!formData.specialization) newErrors.specialization = "Please select specialization";
    if (!formData.state) newErrors.state = "Please select state";
    if (!formData.category) newErrors.category = "Please select category";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setTableData((prev) => [...prev, { ...formData, Srno: prev.length + 1 }]);
      setApiMessage("");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // ✅ Clear individual error when typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <div className="seat-page">
      <Header1 />

      {/* ✅ Header Section */}
      <div className="seat-header">
        <p>
          Dear aspirant,
          <br />
          As the NEET PG 2025 results are announced, you must be anxious to
          determine which college you could pursue your Post Graduation at.
        </p>

        <p>
          Kill the anxiety in just 2 steps! Select the relevant filters in the
          form below and enter your Rank and Email ID to see which college is
          waiting for you.
        </p>

        <p>We have collated this according to the seat allotment data post-NEET PG 2024.</p>

        <p>We recommend viewing this on a desktop or tablet for the best experience.</p>
      </div>

      {/* ✅ White Form Card */}
      <div className="form-container">
        <h2 className="form-title">Check Your NEET PG Seat Allotment</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            
            {/* NAME */}
            <div className="form-field">
              <label>Full Name *</label>
              <div className="input-box">
                <FaUser className="input-icon" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
              </div>
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            {/* EMAIL */}
            <div className="form-field">
              <label>Email *</label>
              <div className="input-box">
                <FaEnvelope className="input-icon" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
              </div>
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* MOBILE */}
            <div className="form-field">
              <label>Mobile Number *</label>
              <div className="input-box">
                <FaPhoneAlt className="input-icon" />
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number" />
              </div>
              {errors.mobile && <p className="error-text">{errors.mobile}</p>}
            </div>

            {/* RANK */}
            <div className="form-field">
              <label>NEET PG 2025 Rank *</label>
              <div className="input-box">
                <FaPen className="input-icon" />
                <input type="number" name="rank" value={formData.rank} onChange={handleChange} placeholder="Rank" />
              </div>
              {errors.rank && <p className="error-text">{errors.rank}</p>}
            </div>

            {/* COURSE */}
            <div className="form-field">
              <label>Select Course *</label>
              <div className="input-box">
                <FaUniversity className="input-icon" />
                <select name="course" value={formData.course} onChange={handleChange}>
                  <option value="">Select Course</option>
                  <option value="MD">MD</option>
                  <option value="MS">MS</option>
                  <option value="DNB">DNB</option>
                </select>
              </div>
              {errors.course && <p className="error-text">{errors.course}</p>}
            </div>

            {/* SPECIALIZATION */}
            <div className="form-field">
              <label>Select Specialization *</label>
              <div className="input-box">
                <FaUniversity className="input-icon" />
                <select name="specialization" value={formData.specialization} onChange={handleChange}>
                  <option value="">Select Specialization</option>
                  <option value="ANAESTHESIOLOGY">M.D. (ANAESTHESIOLOGY)</option>
                  <option value="BIOCHEMISTRY">M.D. (BIOCHEMISTRY)</option>
                  <option value="COMMUNITY HEALTH and ADMN.">M.D. (COMMUNITY HEALTH & ADMN.)</option>
                  <option value="DERM.,VENE. and LEPROSY">M.D. (DERM.,VENE. & LEPROSY)</option>
                  <option value="Emergency and Critical Care">Emergency & Critical Care</option>
                  <option value="FAMILY MEDICINE">Family Medicine</option>
                  <option value="FORENSIC MEDICINE">Forensic Medicine</option>
                  <option value="GENERAL MEDICINE">General Medicine</option>
                  <option value="Hospital Administration">Hospital Administration</option>
                  <option value="MICROBIOLOGY">Microbiology</option>
                  <option value="Obst. and Gynae">Obstetrics & Gynaecology</option>
                  <option value="PAEDIATRICS">Paediatrics</option>
                  <option value="PALLIATIVE MEDICINE">Palliative Medicine</option>
                  <option value="PATHOLOGY">Pathology</option>
                  <option value="PHARMACOLOGY">Pharmacology</option>
                  <option value="PHYSICAL MED. and REHABILITATION">Physical Med. & Rehab</option>
                  <option value="PHYSIOLOGY">Physiology</option>
                  <option value="PREVENTIVE and SOCIAL MEDICINE">Preventive & Social Medicine</option>
                  <option value="PSYCHIATRY">Psychiatry</option>
                </select>
              </div>
              {errors.specialization && <p className="error-text">{errors.specialization}</p>}
            </div>

            {/* STATE */}
            <div className="form-field">
              <label>Select State *</label>
              <div className="input-box">
                <FaUniversity className="input-icon" />
                <select name="state" value={formData.state} onChange={handleChange}>
                  <option value="">Select State</option>
                  {[
                    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
                    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
                    "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
                    "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
                    "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
                  ].map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              {errors.state && <p className="error-text">{errors.state}</p>}
            </div>

            {/* CATEGORY */}
            <div className="form-field">
              <label>Select Category *</label>
              <div className="input-box">
                <FaUniversity className="input-icon" />
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="">Select Category</option>
                  <option value="GEN">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
              </div>
              {errors.category && <p className="error-text">{errors.category}</p>}
            </div>
          </div>

          <div className="btns">
            <button type="submit" className="submit-btn">Submit</button>
            <button className="submit-btn1" onClick={handle}>Go TO NEETSS</button>
          </div>
        </form>
      </div>

      {/* ✅ Seat Table */}
      {tableData.length > 0 && (
        <div className="form-container" style={{ marginTop: "20px" }}>
          <h2 className="form-title">Your Seat Prediction</h2>

          <table className="seat-table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Rank</th>
                <th>Alloted Quota</th>
                <th>Alloted Institute</th>
                <th>State</th>
                <th>Course</th>
                <th>Alloted Category</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.Srno}</td>
                  <td>{row.rank}</td>
                  <td>{row.Alloted_Quota || "-"}</td>
                  <td>{row.Alloted_Institute || "-"}</td>
                  <td>{row.state}</td>
                  <td>{row.course}</td>
                  <td>{row.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Fotter />
    </div>
  );
}

export default NeetPg;
