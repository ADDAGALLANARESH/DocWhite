import React from 'react'
import './Profile.css'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const firstName = localStorage.getItem("firstName") || "";
  const lastName = localStorage.getItem("lastName") || "";
  const emailStr = localStorage.getItem("emailStr") || "";
  const doctorId = localStorage.getItem("doctorId") || "";
  const mobileNo = localStorage.getItem("mobileNo") || "";
  const navigate=useNavigate("");

  const handle = () => {
    navigate("/dashboard", { replace:true });
  }

  return (
    <div className="profile-wrapper">
      
      <div className="modal-header">
        <h2>PROFILE PAGE</h2>
      </div>

      <table className="payment-table">
        <tbody>
          <tr>
            <th>StudentID:</th>
            <td>{doctorId}</td>
          </tr>
          <tr>
            <th>First-Name:</th>
            <td>{firstName}</td>
          </tr>
          <tr>
            <th>Last-Name:</th>
            <td>{lastName}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{emailStr}</td>
          </tr>
          <tr>
            <th>Mobile-Number:</th>
            <td>{mobileNo}</td>
          </tr>
        </tbody>
      </table>

      <div className="btn-container">
        <button className='logoutbtn' onClick={handle}>Go to dashboard</button>
      </div>

    </div>
  )
}

export default Profile
