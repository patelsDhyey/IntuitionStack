import './css/ResetPassword.css';
import EmployeeHeader from './EmployeeHeader';
import UpdateIcon from './css/update.svg'
import DeleteIcon from './css/delete.svg'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { compact } from 'lodash';

function RestPassword() {

  let ValidateFlag = false;

  const [oldpwdErr, setoldpwdErr] = useState(null);
  const [newPwdErr, setnewPwdErr] = useState(null);
  const [ConfirmPwdErr, setConfirmPwdErr] = useState(null);

  const [Message, setMessage] = useState(false);

  useEffect(() => {
    if (oldpwdErr == null || newPwdErr == null || ConfirmPwdErr == null) {
      ValidateFlag = false
    } else if (!oldpwdErr && !newPwdErr && !ConfirmPwdErr) {
      ValidateFlag = true
    } else if (oldpwdErr || newPwdErr || ConfirmPwdErr) {
      ValidateFlag = false
    }
  }, [oldpwdErr, newPwdErr, ConfirmPwdErr])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function Validator(e) {
      e.preventDefault()

      let item = e.target.value;
      let id = (e.target.id)
      console.log("id :" + e.target.id)
      console.log("Value :" + e.target.value)

      if (item.length === 0 && id === "oldpwd")
        setoldpwdErr(true);
      else if (item.length > 0 && id === "oldpwd")
        setoldpwdErr(false);

      if (item.length === 0 && id === "newPwd")
        setnewPwdErr(true);
      else if (item.length > 0 && id === "newPwd")
        setnewPwdErr(false);

      if (item.length === 0 && id === "ConfirmPwd")
        setConfirmPwdErr(true);
      else if (item.length > 0 && id === "ConfirmPwd")
        setConfirmPwdErr(false);


      console.log("Flag value: " + ValidateFlag)
      console.log("all values: " + oldpwdErr + newPwdErr + ConfirmPwdErr)
      console.warn(e.target.value);
    }

    function FireBack() {
      window.history.back();
    }

    function ResetPwd() {

      if (ValidateFlag) {

        fetch("http://localhost:3001/Authentication/ResetPassword", {
          method: "PUT",
          body: JSON.stringify({
            "oldpwd": document.getElementById('oldpwd').value,
            "empPassword": document.getElementById('newPwd').value,
            "confirmPassword": document.getElementById('ConfirmPwd').value,
            "empId": sessionStorage.getItem('sessionid'),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }

        }).then((response) => response.json()).then((data) => {
          console.log(data);
          if (data.Updated === 1) {
            setMessage(data.Message);
            console.log(data.Message);
            window.location.href = "http://localhost:3000/Employee/Dashboard";
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

        <div className="resetpassword">
          <div className="resetpassword-form">

            {/* <Link className="home-header-back" to="/Employee/Dashboard">&#8592;</Link>	 */}
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='resetpassword-form-title'>Reset Password</div>

            <div className='resetpassword-form-displaydata'>
              {Message ? <span className='Validators-Top' style={{ background: "red", color: "white" }}>{Message}</span> : <span style={{ visibility: "hidden" }} className='Validators-Top'>#</span>}
              <br />
              <div className='resetpassword-form-displaydata-content'>
                <h2>Enter Old Password:</h2>
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
                <button className='card-body-component' id={sessionStorage.getItem("sessionid")} onClick={ResetPwd} >Reset Password</button>

              </div>

            </div>



          </div>
        </div>

        <EmployeeHeader></EmployeeHeader>
      </>
    );
  } else {
    window.location.href = "http://localhost:3000/Login";
  }
}

export default RestPassword;
