import logo from './css/img/Logo.png';
// import './css/App.css';
import './css/Login.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import { useEffect } from 'react';


function Login() {

  let ValidateFlag = false;
  // const [empEmail, setempEmail] = useState("");
  const [empEmailErr, setempEmailErr] = useState(null);

  // const [empPassword, setEmpPassword] = useState("");
  const [empPasswordErr, setEmpPasswordErr] = useState(null);

  const [Message, setMessage] = useState(false);

  useEffect(() => {
    console.log(empEmailErr, empPasswordErr)
    if (empEmailErr === null || empPasswordErr === null) {
      ValidateFlag = false;
    } else if (!empEmailErr && !empPasswordErr) {
      ValidateFlag = true;
    } else if (empEmailErr || empPasswordErr) {
      ValidateFlag = false;
    }
  }, [empEmailErr, empPasswordErr])

  if ((sessionStorage.getItem("sessionkey") === null)) {
    // inner funtion that validates field non empty on change method
  function Validator(e) {
    e.preventDefault()
    let item = e.target.value;
    let id = (e.target.id)
    console.log(e.target.id)

    if (item.length === 0 && id === "empEmail")
      setempEmailErr(true);
    else if (item.length > 0 && id === "empEmail")
      setempEmailErr(false);

    if (item.length === 0 && id === "empPassword")
      setEmpPasswordErr(true);
    else if (item.length > 0 && id === "empPassword")
      setEmpPasswordErr(false);
  }

  // inner funtions sends the data
  function LogInEmp() {
    //Validation flag checked if any 1 of the field is empty will not allow to enter into query
    if (ValidateFlag) {
      fetch("http://localhost:3001/Login", {
        method: "POST",
        body: JSON.stringify({
          "empEmail": document.getElementById('empEmail').value,
          "empPassword": document.getElementById('empPassword').value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((res) => {
        return res.json();
      }).then((data) => {
        // console.log(data);
        if (data.session) {

          var newDate = new Date();

          sessionStorage.setItem('sessionkey', data.sessionname);
          sessionStorage.setItem('sessionid', data.sessionid);
          localStorage.setItem('Designation', data.designation);
          localStorage.setItem('logintime', newDate);

          fetch("http://localhost:3001/UserTracker", {
            method: "POST",
            body: JSON.stringify({
              "LoginEntry": "true",
              "userId": sessionStorage.getItem("sessionid"),
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then((res) => {
            return res.json();
          }).then((data) => {

            if(data.sessionEntry){
              
              localStorage.setItem('Token', data.Token);
              
              if (localStorage.getItem('Designation') === "Admin") {
                localStorage.setItem('ROLE', "ADMIN");
                window.location.href = "http://localhost:3000/Admin/Home";
              } else {
                if (localStorage.getItem('Designation') === "Group Manager" || localStorage.getItem('Designation') === "Director" || localStorage.getItem('Designation') === "it-Security-manager") {
                  localStorage.setItem('ROLE', "HIGHER LINE MANAGER");
                } else {
                  localStorage.setItem('ROLE', "DOWN LINE EMPLOYEE");
                }
                window.location.href = "http://localhost:3000/Employee/Dashboard";
              }
            }

          })
          // pending FLAG if ADMIN move to ADMINHOME else Dashboard
        } else {
          // console.log(data.Message);
          setMessage(data.Message);
          document.getElementById("empEmail").value = "";
          document.getElementById("empPassword").value = "";
        }
      })
    } else {
      // if validation flag is false fisplay alert
      alert("Please fill mandatory details!");
    }

  }
  return (
    <>
      <div className="card">

        <img src={logo} alt='Logo Loading' className='Logo' ></img>
        {Message ? <span className='Validators-Top'>{Message}</span> : <span style={{ visibility: "hidden" }} className='Validators-Top'>#</span>}
        <div className="card-body">
          <div >
            <h1>Log in</h1>
            <span >Create a free account! <Link to="/Signup" style={{ color: "rgba(171, 59, 97, 0.6)" }}> Signup</Link></span>
            <div className="structure">
              <div className="structure-child">
                <input className='card-body-component' id="empEmail" placeholder='Enter Email' type="text" onChange={Validator} required onKeyDown={e => {
                if (e.keyCode == 13) {
                  LogInEmp(e);
                }
              }}></input>
                {empEmailErr ? <span className='Validators'>Email can not be empty!</span> : <span className='Validators' style={{ visibility: "hidden" }}>#</span>}
              </div>

              <div className="structure-child">
                <input className='card-body-component' id="empPassword" placeholder='Enter Password' type="password" onChange={Validator} required  onKeyDown={e => {
                if (e.keyCode == 13) {
                  LogInEmp(e);
                }
              }}></input>
                {empPasswordErr ? <span className='Validators'>Hey, You should give password for security!</span> : <span className='Validators' style={{ visibility: "hidden" }}>#</span>}
              </div>
            </div>
            <button className='card-body-component' id="Submit" onClick={LogInEmp} onKeyDown={e => {
                if (e.keyCode == 13) {
                  LogInEmp(e);
                }
              }}>Log in</button>

          </div>
        </div>
        <Link to="/Signup" className="side-button"> Sign up</Link>
      </div>

    </>
  );
  }else{
    if(localStorage.getItem("Designation") === "Admin"){
      window.location.href = "http://localhost:3000/Admin/Home";
    }else{
      window.location.href = "http://localhost:3000/Employee/Dashboard";
    }
  }

}

//return Login function
export default Login;
