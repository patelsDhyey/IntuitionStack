import logo from './css/img/Logo.png';
import './css/Signup.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react'

function Signup() {

  let ValidateFlag = false;
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

  useEffect(() => {
    fetch("http://localhost:3001/Signup").then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedDesignation(data.DesignationList);
      setFetchedLocation(data.LocationList);
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

  function SubmitEmp() {
    if (ValidateFlag) {
      console.log("Success!", document.getElementById("empname").value, document.getElementById("empPassword").value);
      fetch("http://localhost:3001/signup", {
        method: "POST",
        body: JSON.stringify({
          "empname": document.getElementById('empname').value,
          "empEmail": document.getElementById('empEmail').value,
          "empPhone": document.getElementById('empPhone').value,
          "empPassword": document.getElementById('empPassword').value,
          "ConfirmPassword": document.getElementById('ConfirmPassword').value,
          "empDesignation": document.getElementById('empDesignation').value,
          "empAddress": document.getElementById('empAddress').value,
          "empLocation": document.getElementById('empLocation').value,
          "empGUID": document.getElementById('empGUID').value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }

      }).then((response) => response.json()).then((data) => {
        console.log(data);
        if (data.affectedRows === 1) {
          window.location.href = "http://localhost:3000/Login";
        } else {
          console.log(data.Message);
          setMessage(data.Message);
        }
      })

    } else {
      alert("Please fill mandatory details!");
    }
  }
  return (
    <>
      <div className="card">

        <img src={logo} alt='Logo Loading' className='Logo'></img>
        {Message ? <span className='Validators-Top' style={{ background: "red", color: "white" }}>{Message}</span> : <span style={{ visibility: "hidden" }} className='Validators-Top'>#</span>}
        <div className="card-body">
          <div className='card-body-components'>
            <h1>Sign up</h1>
            <span >Already have an account? <Link to="/Login" className="move-nav" style={{ color: "rgba(171, 59, 97, 0.6)" }}>login</Link></span>
            <div className="structure">

              <div className="structure-child">
                <input className='card-body-component' id="empname" placeholder='Enter Name' type="text" onChange={Validator} required  onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitEmp(e);
                }
              }}></input>
                {empnameErr ? <span className='Validators' style={{ visibility: 'visible' }}>Employee Name can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
              </div>

              <div className="structure-child">
                <input className='card-body-component' id="empGUID" placeholder='Enter GUID' type="text" onChange={Validator} required  onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitEmp(e);
                }
              }}></input>
                {empGUIDErr ? <span className='Validators' style={{ visibility: 'visible' }}>GUID can not be empty!</span> : <span className='Validators' style={{ visibility: "hidden" }}>#</span>}
              </div>

              <div className="structure-child">
                <input className='card-body-component' id="empEmail" placeholder='Enter Email' type="email" onChange={Validator} required  onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitEmp(e);
                }
              }}></input>
                {empEmailErr ? <span className='Validators' style={{ visibility: 'visible' }}>Email can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
              </div>

              <div className="structure-child">
                <input className='card-body-component' id="empPhone" placeholder='Enter Phone Number' type="text" onChange={Validator} required  onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitEmp(e);
                }
              }}></input>
                {empPhoneErr ? <span className='Validators' style={{ visibility: 'visible' }}>Phone Number can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
              </div>

              <div className="structure-child">
                <input className='card-body-component' id="empPassword" placeholder='Enter Password' type="password" onChange={Validator} required  onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitEmp(e);
                }
              }}></input>
                {empPasswordErr ? <span className='Validators' style={{ visibility: 'visible' }}>Hey, You should give password for security!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
              </div>

              <div className="structure-child">
                <input className='card-body-component' id="ConfirmPassword" placeholder='Enter Confirm Password' type="password" onChange={Validator} required  onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitEmp(e);
                }
              }}></input>
                {ConfirmPasswordErr ? <span className='Validators' style={{ visibility: 'visible' }}>Hey, You should give Confirm password!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
              </div>

              <div className="structure-child">
                {/* <input className='card-body-component' id="empDesignation" placeholder='Enter Designation' type="text" onChange={Validator} required></input> */}
                <select id="empDesignation" placeholder='Select Your Designation' type="text" onChange={Validator} required>
                  <option value='0' name="null"> --Select Designation--</option>
                  {FetchedDesignation.map(e => {
                    console.log(e.DesignationName)
                    if (e.DesignationName !== "Admin") {
                      return <option value={e.desid} name={e.DesignationName} key={e.desid}> {e.DesignationName} </option>
                    }
                  })}
                </select>
                {empDesignationErr ? <span className='Validators' style={{ visibility: 'visible' }}>Designation can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
              </div>

              <div className="structure-child">
                {/* <input className='card-body-component' id="empLocation" placeholder='Enter Work Location' type="text" onChange={Validator} required></input> */}
                <select id="empLocation" placeholder='Select Work Location' type="text" onChange={Validator} required>
                  <option value='0' name="null"> --Select Location--</option>
                  {FetchedLocation.map(e => {
                    return <option value={e.Lid} name={e.LocationName} key={e.Lid}> {e.LocationName} </option>
                  })}
                </select>
                {empLocationErr ? <span className='Validators' style={{ visibility: 'visible' }}>Work Location can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
              </div>

              <div className="structure-child structure-child-Address">
                <textarea className='card-body-component' id="empAddress" placeholder='Enter Address' type="text" onChange={Validator} required  onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitEmp(e);
                }
              }}></textarea>
                {empAddressErr ? <span className='Validators' style={{ visibility: 'visible' }}>Address can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}
              </div>

            </div>
            <button className='card-body-component' id="Submit" onClick={SubmitEmp} onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitEmp(e);
                }
              }}> Sign Up</button>

          </div>

        </div>
        <Link to="/Login" className="side-button"> Log in</Link>
      </div>

      {/* <div className="popup-box">
        <div className='display-on-call'>Congratulations on the registration!</div>
      </div> */}

    </>
  );
}

export default Signup;
