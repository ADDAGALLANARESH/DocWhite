import React from 'react'
import './Dashboard.css'
import { replace, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const firstName = localStorage.getItem("firstName") || "";
  const lastName = localStorage.getItem("lastName") || "";
    const navigate=useNavigate()
    const handle=()=>{
        navigate("/NeetPg",{replace:true})

    }
    const handle1=()=>{
        navigate("/NeetSS",{replace:true})

    }
  return (
    <div className='main'>
      <h2>WELCOME TO Dashboard {firstName} {lastName}</h2>
      <p>Please Select your course</p>
      <div className='btn'>
        <button onClick={handle}>NEET PG</button>
        <button onClick={handle1}>NEET SS</button>
      </div>
    </div>
  )
}

export default Dashboard
