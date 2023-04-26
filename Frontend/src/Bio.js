import './css/Bio.css';
import EmployeeHeader from './EmployeeHeader';
import UpdateIcon from './css/update.svg'
import DeleteIcon from './css/delete.svg'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { compact } from 'lodash';

function Bio() {


  let ValidateFlag = false;

  let getBio = [];

  // const [empname, setEmpName] = useState("");
  const [empnameErr, setEmpNameErr] = useState(null);

  // const [empGUID, setEmpGUID] = useState("");
  const [empGUIDErr, setEmpGUIDErr] = useState(null);

  // const [empEmail, setEmpEmail] = useState("");
  const [empEmailErr, setEmpEmailErr] = useState(null);

  // const [empPhone, setEmpPhone] = useState("");
  const [empPhoneErr, setEmpPhoneErr] = useState(null);

  // const [empPassword, setEmpPassword] = useState("");
  const [empPasswordErr, setEmpPasswordErr] = useState(null);

  // const [ConfirmPassword, setConfirmPassword] = useState("");
  const [ConfirmPasswordErr, setConfirmPasswordErr] = useState(null);

  // const [empDesignation, setEmpDesignation] = useState("");
  const [empDesignationErr, setEmpDesignationErr] = useState(null);

  // const [empAddress, setEmpAddress] = useState("");
  const [empAddressErr, setEmpAddressErr] = useState(null);

  // const [empLocation, setempLocation] = useState("");
  const [empLocationErr, setempLocationErr] = useState(null);

  const [Message, setMessage] = useState(false);

  const [FetchedDesignation, setFetchedDesignation] = useState([]);
  const [FetchedLocation, setFetchedLocation] = useState([]);
  const [FetchedBio, setFetchedBio] = useState([]);
 

  useEffect(() => {
    // Authentication/Bio
    fetch(`http://localhost:3001/Authentication/Bio/${sessionStorage.getItem("sessionid")}`).then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedDesignation(data.DesignationList);
      setFetchedLocation(data.LocationList);
      setFetchedBio(data.BioLst);
      
    })
  }, [])

  useEffect(() => {
    if (empnameErr === null || empGUIDErr === null || empEmailErr === null || empPhoneErr === null || empPasswordErr === null || ConfirmPasswordErr === null || empDesignationErr === null || empAddressErr === null || empLocationErr === null) {
      ValidateFlag = false
    } else if (!empnameErr && !empGUIDErr && !empEmailErr && !empPhoneErr && !empPasswordErr && !ConfirmPasswordErr && !empDesignationErr && !empAddressErr && !empLocationErr) {
      ValidateFlag = true
    } else if (empnameErr || empGUIDErr || empEmailErr || empPhoneErr || empPasswordErr || ConfirmPasswordErr || empDesignationErr || empAddressErr || empLocationErr) {
      ValidateFlag = false
    }
  }, [empnameErr, empGUIDErr, empEmailErr, empPhoneErr, empPasswordErr, ConfirmPasswordErr, empDesignationErr, empAddressErr, empLocationErr])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function Validator(e) {
      e.preventDefault()

      let item = e.target.value;
      let id = (e.target.id)
      console.log("id :" + e.target.id)
      console.log("Value :" + e.target.value)
      
      if (item.length === 0 && id === "empname")
        setEmpNameErr(true);
      else if (item.length > 0 && id === "empname")
        setEmpNameErr(false);
      
      if (item.length === 0 && id === "empGUID")
        setEmpGUIDErr(true);
      else if (item.length > 0 && id === "empGUID")
        setEmpGUIDErr(false);
      
      if (item.length === 0 && id === "empEmail")
        setEmpEmailErr(true);
      else if (item.length > 0 && id === "empEmail")
        setEmpEmailErr(false);
      
      if (item.length === 0 && id === "empPhone")
        setEmpPhoneErr(true);
      else if (item.length > 0 && id === "empPhone")
        setEmpPhoneErr(false);
      
      if (item.length === 0 && id === "empPassword")
        setEmpPasswordErr(true);
      else if (item.length > 0 && id === "empPassword")
        setEmpPasswordErr(false);
      
      if (item.length === 0 && id === "ConfirmPassword")
        setConfirmPasswordErr(true);
      else if (item.length > 0 && id === "ConfirmPassword")
        setConfirmPasswordErr(false);
      
      if (item === '0' && id === "empDesignation")
        setEmpDesignationErr(true);
      else if (item > 0 && id === "empDesignation")
        setEmpDesignationErr(false);
      
      if (item === '0' && id === "empLocation")
        setempLocationErr(true);
      else if (item > 0 && id === "empLocation")
        setempLocationErr(false);
      
      if (item.length === 0 && id === "empAddress")
        setEmpAddressErr(true);
      else if (item.length > 0 && id === "empAddress")
        setEmpAddressErr(false);
      
      console.log("Flag value: " + ValidateFlag)
      console.log("all values: " + empnameErr + empGUIDErr + empEmailErr + empPhoneErr + empPasswordErr + ConfirmPasswordErr + empDesignationErr + empAddressErr + empLocationErr)
      console.warn(e.target.value);
    }

    function FireBack() {
      window.history.back();
    }

    function UpdateBio() {

      if (ValidateFlag) {

      //   fetch("http://localhost:3001/Authentication/Bio", {
      //     method: "PUT",
      //     body: JSON.stringify({
      //       "oldpwd": document.getElementById('oldpwd').value,
      //       "empPassword": document.getElementById('newPwd').value,
      //       "confirmPassword": document.getElementById('ConfirmPwd').value,
      //       "empId": sessionStorage.getItem('sessionid'),
      //     }),
      //     headers: {
      //       "Content-type": "application/json; charset=UTF-8"
      //     }

      //   }).then((response) => response.json()).then((data) => {
      //     console.log(data);
      //     if (data.Updated === 1) {
      //       setMessage(data.Message);
      //       console.log(data.Message);
      //       window.location.href = "http://localhost:3000/Employee/Dashboard";
      //     } else {
      //       console.log(data.Message);
      //       setMessage(data.Message);
      //     }
      //   })
      } else {
        alert("Please fill mandatory details!");
      }

    }

    return (
      <>

        <div className="bio">
          <div className="bio-form">

            {/* <Link className="home-header-back" to="/Employee/Dashboard">&#8592;</Link>	 */}
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='bio-form-title'>Update your Profile</div>

            <div className='bio-form-displaydata'>
              {Message ? <span className='Validators-Top' style={{ background: "red", color: "white" }}>{Message}</span> : <span style={{ visibility: "hidden" }} className='Validators-Top'>#</span>}
              <br />
              <div className='bio-form-displaydata-content'>
                {/* <h2>Enter Old Password:</h2>
                <input placeholder='Enter Old Password' type="text" id="oldpwd" onChange={Validator} ></input>
                {oldpwdErr ? <span className='Validators' style={{ visibility: 'visible' }}> Old Password can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
                <br />
                <h2>Enter New Password:</h2>
                <input placeholder='Enter New Password:' type="address" id="newPwd" onChange={Validator} ></input>
                {newPwdErr ? <span className='Validators' style={{ visibility: 'visible' }}>New Password can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
                <br />
                <h2>Enter Confirm Password:</h2>
                <input placeholder='Enter Confirm Password' type="text" id="ConfirmPwd" onChange={Validator}></input>
                {ConfirmPwdErr ? <span className='Validators' style={{ visibility: 'visible' }}>Confirm Password can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
                <br />
                <button className='card-body-component' id={sessionStorage.getItem("sessionid")} onClick={ResetPwd} >Reset Password</button> */}
                <div className='card-body-components'>
                  <div className="structure">

                     <div className="structure-child">
                      <label>  <center>Global Id: {FetchedBio.map(e => {return e.empGUID})}</center> </label>
                    </div>
                    <br />
                    <div className="structure-child">
                      <label> Designation: {FetchedBio.map(e => {return e.DesignationName})} </label>  
                    </div>
                    <br />
                    <div className="structure-child">
                      <input className='card-body-component' id="empname" placeholder='Enter Name' type="text" onChange={Validator} required  onKeyDown={e => {
                      if (e.keyCode == 13) {
                        UpdateBio(e);
                      }
                    }} value={FetchedBio.map(e => {return e.empname})}></input>
                      {empnameErr ? <span className='Validators' style={{ visibility: 'visible' }}>Employee Name can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
                    </div>
                    <br />
                    <div className="structure-child">
                      <input className='card-body-component' id="empEmail" placeholder='Enter Email' type="email" onChange={Validator} required  onKeyDown={e => {
                      if (e.keyCode == 13) {
                        UpdateBio(e);
                      }
                    }} value={FetchedBio.map(e => {return e.empEmail})}></input>
                      {empEmailErr ? <span className='Validators' style={{ visibility: 'visible' }}>Email can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
                    </div>
                    <br />
                    <div className="structure-child">
                      <input className='card-body-component' id="empPhone" placeholder='Enter Phone Number' type="text" onChange={Validator} required  onKeyDown={e => {
                      if (e.keyCode == 13) {
                        UpdateBio(e);
                      }
                    }} value={FetchedBio.map(e => {return e.empPhone})}></input>
                      {empPhoneErr ? <span className='Validators' style={{ visibility: 'visible' }}>Phone Number can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
                    </div>
                    <br />
                    <div className="structure-child">
                      <label> <center> Address: {FetchedBio.map(e => {return e.empAddress})} </center> </label>  
                    </div>
                    
                    <div className="structure-child">
                      <label> <center>{FetchedBio.map(e => {return e.LocationName})} </center>  </label>  
                    </div>
                    <br />
                  </div>
                  <button className='card-body-component' id="Submit" onClick={UpdateBio} onKeyDown={e => {
                    if (e.keyCode == 13) {
                      UpdateBio(e);
                    }
                  }}> Update Bio</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmployeeHeader></EmployeeHeader>
    </>
    );
  }else {
    window.location.href = "http://localhost:3000/Login";
  }
}

export default Bio;
