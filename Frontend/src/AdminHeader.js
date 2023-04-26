import logo from './css/img/Logo.png';
import './css/AdminHeader.css';
import { Link } from 'react-router-dom';
// import React, { useState } from 'react'
import React, { Component } from 'react';

function AdminHeader() {

  if (window.location.href === "http://localhost:3000/AdminHeader") {
    window.location.href = "http://localhost:3000/Admin/Home";
  }
  if (!(sessionStorage.getItem("sessionkey") === null)) {
    if (localStorage.getItem("Designation") === "Admin") {

      function Logout() {
        localStorage.removeItem('Designation');
        sessionStorage.removeItem('sessionkey');
        sessionStorage.removeItem('sessionid');
        window.location.href = "http://localhost:3000/Login";
      }
      return (
        <>
          <div className="adminhome">

            <div className="admin-header">
              <img src={logo} alt='Logo Loading' className='admin-header-logo'></img>
              <div className="admin-header-info">Welcome Back!  &nbsp;&nbsp; Mr.
                {sessionStorage.getItem('sessionkey')}
              </div>
              {/* Pending FLAG Add employee gender based in that keep Mr. Miss. or Mrs. */}
              <Link to="/Admin/Home" className="admin-header-info-home">Home</Link> &nbsp;&nbsp;&nbsp;
              <Link to="/Employee/Dashboard" className="admin-header-info-home">User-Side</Link>
              {/* <img src={home} alt='Home Loading...' className='admin-header-info-home'></img>  */}
              <Link className="admin-header-info-logout" onClick={Logout}>Log out</Link>
              {/* FLAG pending to add remove session code */}
            </div>


          </div>
        </>
      );
    } else {
      window.location.href = "http://localhost:3000/Employee/Dashboard";
    }
  } else {
    window.location.href = "http://localhost:3000/Login";
  }
}

export default AdminHeader;
