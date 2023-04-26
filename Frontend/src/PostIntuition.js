import './css/PostIntuition.css';
import { useEffect } from 'react';
import EmployeeHeader from './EmployeeHeader';
import { Link } from 'react-router-dom';
import React, { useState } from 'react'

function PostIntuition() {

  let ValidateFlag = false;

  const [titleErr, setTitleErr] = useState(null);
  const [descErr, setDescErr] = useState(null);
  const [tagErr, setTagErr] = useState(null);

  const [Message, setMessage] = useState(false);

  useEffect(() => {
    if (titleErr == null || descErr == null || tagErr == null) {
      ValidateFlag = false
    } else if (!titleErr && !descErr && !tagErr) {
      ValidateFlag = true
    } else if (titleErr || descErr || tagErr) {
      ValidateFlag = false
    }
  }, [titleErr, descErr, tagErr])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function Validator(e) {
      e.preventDefault()

      let item = e.target.value;
      let id = (e.target.id)
      console.log("id :" + e.target.id)
      console.log("Value :" + e.target.value)

      if (item.length === 0 && id === "intBrief")
        setTitleErr(true);
      else if (item.length > 0 && id === "intBrief")
        setTitleErr(false);

      if (item.length === 0 && id === "intDesc")
        setDescErr(true);
      else if (item.length > 0 && id === "intDesc")
        setDescErr(false);

      if (item.length === 0 && id === "intTags")
        setTagErr(true);
      else if (item.length > 0 && id === "intTags")
        setTagErr(false);


      console.log("Flag value: " + ValidateFlag)
      console.log("all values: " + titleErr + descErr + tagErr)
      console.warn(e.target.value);
    }


    function FireBack() {
      window.history.back();
    }

    function SubmitIntuition() {
      if (ValidateFlag) {
        console.log("Success!", document.getElementById("intBrief").value, document.getElementById("intTags").value, document.getElementById("intDesc").value);
        console.log(sessionStorage.getItem('sessionid'));
        fetch("http://localhost:3001/PostIntuition", {
          method: "POST",
          body: JSON.stringify({
            "intBrief": document.getElementById('intBrief').value,
            "intTags": document.getElementById('intTags').value,
            "intDesc": document.getElementById('intDesc').value,
            "intByEmpId": sessionStorage.getItem('sessionid'),
            "intStatusId": "New Post",
            "intRecognized": "false",
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }

        }).then((response) => response.json()).then((data) => {
          console.log(data);
          if (data.affectedRows === 1) {
            setMessage(data.Message);
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

        <div className="postintuition">
          <div className="postintuition-form">

            {/* <Link className="home-header-back" to="/Employee/Dashboard">&#8592;</Link>	 */}
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='postintuition-form-title'>Add Intuition</div>

            <div className='postintuition-form-displaydata'>
              <div className='postintuition-form-displaydata-content'>
                <h2>Intuition Title:</h2>
                <input placeholder='Enter Intuition Title' type="text" id="intBrief" onChange={Validator} onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitIntuition(e);
                }
              }}></input>
                {titleErr ? <span className='Validators' style={{ visibility: 'visible' }}>Intuition Title can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}

                <h2>Description:</h2>
                <textarea placeholder='Enter Description of your Intuition' type="address" id="intDesc" onChange={Validator} onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitIntuition(e);
                }
              }}></textarea>
                {descErr ? <span className='Validators' style={{ visibility: 'visible' }}>Intuition Description can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}

                <h2>Tags:</h2>
                <input placeholder='Enter Related Tags  [Multiple tags separated by Tags]' type="text" id="intTags" onChange={Validator} style={{ "textTransform": "uppercase" }} onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitIntuition(e);
                }
              }}></input>
                {tagErr ? <span className='Validators' style={{ visibility: 'visible' }}>Tags Name can not be empty!</span > : <span className='Validators' style={{ visibility: "hidden" }}>#</span >}

                <button className='card-body-component' onClick={SubmitIntuition} onKeyDown={e => {
                if (e.keyCode == 13) {
                  SubmitIntuition(e);
                }
              }}>Post Intuition to Implement</button>

              </div>

            </div>



          </div>
        </div>

        <EmployeeHeader></EmployeeHeader>
        {/* <div className="popup-box">
          </div> */}
      </>
    );
  } else {
    window.location.href = "http://localhost:3000/Login";
  }
}

export default PostIntuition;
