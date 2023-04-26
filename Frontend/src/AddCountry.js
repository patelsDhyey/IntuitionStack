
import './css/AddCountry.css';
import { Fragment, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import React, { useState } from 'react'
import DeleteIcon from './css/delete.svg'
import UpdateIcon from './css/update.svg'

function AddCountry() {

  let ValidateFlag = false;
  const [countryId, setcountryId] = useState("");
  const [countryName, setcountryName] = useState("");

  const [countryNameErr, setcountryNameErr] = useState(null);

  const [Message, setMessage] = useState(false);

  const [FetchedCountry, setFetchedCountry] = useState([]);

  const [show, setShow] = useState(false);

  // let updatecountryid = null;
  // let updateCountryName = null;
  // let updateCountryFlag = false;

  useEffect(() => {
    fetch("http://localhost:3001/AddCountry").then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedCountry(data);
    })
  }, [])

  useEffect(() => {
    if (countryNameErr === null) {
      ValidateFlag = false
    } else if (!countryNameErr) {
      ValidateFlag = true
    } else if (countryNameErr) {
      ValidateFlag = false
    }
  }, [countryNameErr])

  if (!(sessionStorage.getItem("sessionkey") === null)) {
    if (localStorage.getItem("Designation") === "Admin") {
      function Validator(e) {
        e.preventDefault()

        let item = e.target.value;
        let id = (e.target.id)
        console.log("id :" + e.target.id)
        console.log("Value :" + e.target.value)

        if (item.length === 0 && id === "countryName")
          setcountryNameErr(true);
        else if (item.length > 0 && id === "countryName")
          setcountryNameErr(false);


        console.log("Flag value: " + ValidateFlag)
        console.log("all values: " + countryNameErr)
        console.warn(e.target.value);
      }

      function setUpdateCountry(e) {
        setShow(true);
        setTimeout(() => {
          setcountryId(e.target.id)
          setcountryName(e.target.name)
          document.getElementById("updateCountryName").value = e.target.name;
        }, 1000);
      }

      function UpdateCountry(e) {
        console.log("inside update")
        if (show) {
          console.log(countryId, countryName, document.getElementById('updateCountryName').value)

          console.log("inside update 2")
          fetch("http://localhost:3001/AddCountry", {
            method: "PUT",
            body: JSON.stringify({
              "LDGid": countryId,
              "oldLDGName": countryName,
              "LDGName": document.getElementById('updateCountryName').value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }

          }).then((response) => response.json()).then((data) => {
            console.log("Data")
            console.log(data);
            setFetchedCountry(data.newList)

            if (data.Updated === 1) {

              setMessage(data.Message);
              setTimeout(() => {
                // document.getElementById("updateCountryName").disabled = true;
                // document.getElementById("updateSubmit").disabled = true;
                document.getElementById('countryName').value = "";
                // document.getElementById('updateCountryName').value = "";
              }, 1000);

              // setTimeout(() => {
              // setShowHide(true);
              // }, 1000);

            } else {
              // setShowHide(true);
              console.log(data.Message);
              setMessage(data.Message);
              setTimeout(() => {
                // document.getElementById("updateCountryName").disabled = true;
                // document.getElementById("updateSubmit").disabled = true;
                document.getElementById('countryName').value = "";
                // document.getElementById('updateCountryName').value = "";
              }, 1000)

              // setTimeout(() => {
              // setShowHide(true);
              // }, 1000);
            }
            setShow(false);
          })
        }
      }

      function DeleteCountry(e) {
        let id = (e.target.id)
        let name = (e.target.name)
        console.log(id);
        console.log(name);

        // alert("Please note! You are about to delete " + name);
        // alert("Please Confirm! You are about to delete " + name);

        if (window.confirm("Please note! You are aboute to delete " + name)) {

          fetch("http://localhost:3001/AddCountry", {
            method: "DELETE",
            body: JSON.stringify({
              "LDGid": id,
              "LDGName": name,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }

          }).then((response) => response.json()).then((data) => {
            console.log("Data")
            console.log(data);
            setFetchedCountry(data.newList)

            if (data.deleted === 1) {
              setMessage(data.Message);
            } else {
              console.log(data.Message);
              setMessage(data.Message);
            }
          })
        }
      }

      function SubmitCountry() {
        if (ValidateFlag) {
          fetch("http://localhost:3001/AddCountry", {
            method: "POST",
            body: JSON.stringify({
              "countryName": document.getElementById('countryName').value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }

          }).then((response) => response.json()).then((data) => {
            console.log("Data")
            console.log(data);
            console.log(data.newList[0].LDGName);

            setFetchedCountry(data.newList)

            console.log("Data  affected rows")

            console.log(data.affectedRows);
            if (data.affectedRows === 1) {
              // window.location.href = "http://localhost:3000/AdminHome";
              setMessage(data.Message);
              document.getElementById("countryName").value = "";
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
          <div className="addCountry">

            <AdminHeader></AdminHeader>

            <div className="addCountry-menu">
              <center>{Message ? <span className='validators' style={{ visibility: "visible", background: "green", color: "white" }}>{Message}</span> : <span className='validators' style={{ visibility: "hidden" }}>#</span>}</center>
              {/* id="hideMeAfter10Seconds" */}
              <div className="addCountry-submenu">

                {!show &&
                  <div>
                    <h2 className="addCountry-menu-heading" id="heading" >Add Country</h2><br />

                    Enter Country Name:
                    <input id="countryName" placeholder='Enter country Name' type="text" onChange={Validator} required></input><br />
                    {countryNameErr ? <span className='validators' style={{ visibility: 'visible' }}>Employee Name can not be empty!</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >}

                    <button id="Submit" onClick={SubmitCountry}>Add New Country</button>
                  </div>
                }
                {show &&
                  <div>
                    <h2 className="addCountry-menu-heading" id="updateheading" >Update Country</h2><br />

                    Update Country Name:
                    <input id="updateCountryName" placeholder='Update country Name' type="text" onChange={Validator} required ></input><br />
                    {/* {countryNameErr ? <span className='validators' style={{ visibility: 'visible' }}>Employee Name can not be empty!</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >} */}

                    <button id="updateSubmit" onClick={UpdateCountry}>Update New Country</button>
                  </div>
                }

              </div>

              <div className="addCountry-menu-displaydata">
                <table >
                  <tbody>
                    {FetchedCountry.map(e => {

                      return <tr key={e.LDGid}>
                        <td>
                          <label id={e.LDGid}>{e.LDGName} </label>
                        </td>

                        <td>
                          <button className="icon" id={e.LDGid} name={e.LDGName} onClick={DeleteCountry}> <img id={e.LDGid} name={e.LDGName} src={DeleteIcon} className="DeleteIcon" /></button>
                        </td>

                        <td>
                          <button className="icon" id={e.LDGid} name={e.LDGName} onClick={setUpdateCountry}> <img id={e.LDGid} name={e.LDGName} src={UpdateIcon} className="UpdateIcon" /></button>
                        </td>

                      </tr>

                    })}
                  </tbody>
                </table>
              </div>
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

export default AddCountry;
