
import './css/AdminHome.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import React, { Component } from 'react';


function AdminHome() {

  if (!(sessionStorage.getItem("sessionkey") === null)) {
    if (localStorage.getItem("Designation") === "Admin") {
      return (
        <>
          <div className="adminhome">

            <AdminHeader></AdminHeader>

            <div className="adminhome-menu">
              <div>
                <h2 className="adminhome-menu-heading">User Add-on details</h2>
                <Link to="/Admin/AddCountry" className="adminhome-menu-links"> Manage Countries</Link>
                <Link to="/Admin/AddLocation" className="adminhome-menu-links"> Manage Locations</Link>
                <Link to="/Admin/AddDesignations" className="adminhome-menu-links"> Manage Designations</Link>
                <Link to="/Admin/AddStatus" className="adminhome-menu-links"> Manage Status Codes for Intuitions</Link>
              </div>

              <div><h2 className="adminhome-menu-heading">Approvals</h2>
                <Link to="/Createintuition" className="adminhome-menu-links"> Approved Intuitions</Link>
                <Link to="/Createintuition" className="adminhome-menu-links"> Pending for Approvals</Link>
              </div>

              {/* <div><h2 className="adminhome-menu-heading">Accounts</h2>
              <Link to="/Createintuition" className="adminhome-menu-links">Edit Bio</Link>
              <Link to="/Createintuition" className="adminhome-menu-links">Reset Password</Link>
            </div> */}

              {/* <div className="adminhome-menu-label"> Menu</div> */}

            </div>
          </div>

          {/* <div className="popup-box">
            </div> */}
        </>
      );
    } else {
      window.location.href = "http://localhost:3000/Employee/Dashboard";
    }
  } else {
    window.location.href = "http://localhost:3000/Login";
  }
}

export default AdminHome;
