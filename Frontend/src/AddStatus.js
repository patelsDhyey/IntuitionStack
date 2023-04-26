
import './css/AddStatus.css';
import { Fragment, useEffect } from 'react';
import AdminHeader from './AdminHeader';
import React, { useState } from 'react';
import DeleteIcon from './css/delete.svg';
import UpdateIcon from './css/update.svg';

function AddStatus() {
  let ValidateFlag = false;
  const [statusId, setstatusId] = useState("");
  const [StatusCode, setstatusCode] = useState("");

  const [StatusCodeErr, setstatusCodeErr] = useState(null);

  const [Message, setMessage] = useState(false);

  const [FetchedStatus, setFetchedStatus] = useState([]);

  const [show, setShow] = useState(false);

  // let updatecountryid = null;
  // let updateStatusCode = null;
  // let updateCountryFlag = false;

  useEffect(() => {
    fetch("http://localhost:3001/AddStatus").then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedStatus(data);
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {
    if (localStorage.getItem("Designation") === "Admin") {
      function Validator(e) {
        e.preventDefault()

        let item = e.target.value;
        let id = (e.target.id)
        console.log("id :" + e.target.id)
        console.log("Value :" + e.target.value)

        if (item.length === 0 && id === "StatusCode")
          setstatusCodeErr(true);
        else if (item.length > 0 && id === "StatusCode")
          setstatusCodeErr(false);

        if (StatusCodeErr === null) {
          ValidateFlag = false
        } else if (!StatusCodeErr) {
          ValidateFlag = true
        } else if (StatusCodeErr) {
          ValidateFlag = false
        }
        console.log("Flag value: " + ValidateFlag)
        console.log("all values: " + StatusCodeErr)
        console.warn(e.target.value);
      }

      function setUpdateStatus(e) {
        setShow(true);
        setTimeout(() => {
          setstatusId(e.target.id)
          setstatusCode(e.target.name)
          document.getElementById("updateStatusCode").value = e.target.name;
        }, 1000);

      }

      function UpdateStatus(e) {
        console.log("inside update")
        if (show) {
          console.log(statusId, StatusCode, document.getElementById('updateStatusCode').value)

          console.log("inside update 2")
          fetch("http://localhost:3001/AddStatus", {
            method: "PUT",
            body: JSON.stringify({
              "stsId": statusId,
              "oldStatusName": StatusCode,
              "StatusName": document.getElementById('updateStatusCode').value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }

          }).then((response) => response.json()).then((data) => {
            console.log("Data")
            console.log(data);
            setFetchedStatus(data.newList)

            if (data.Updated === 1) {

              setMessage(data.Message);
              setTimeout(() => {
                // document.getElementById("updateStatusCode").disabled = true;
                // document.getElementById("updateSubmit").disabled = true;
                document.getElementById('StatusCode').value = "";
                // document.getElementById('updateStatusCode').value = "";
              }, 1000);

              // setTimeout(() => {
              // setShowHide(true);
              // }, 1000);

            } else {
              // setShowHide(true);
              console.log(data.Message);
              setMessage(data.Message);
              setTimeout(() => {
                // document.getElementById("updateStatusCode").disabled = true;
                // document.getElementById("updateSubmit").disabled = true;
                document.getElementById('StatusCode').value = "";
                // document.getElementById('updateStatusCode').value = "";
              }, 1000)

              // setTimeout(() => {
              // setShowHide(true);
              // }, 1000);
            }
            setShow(false);
          })
        }
      }

      function DeleteStatus(e) {
        let id = (e.target.id)
        let name = (e.target.name)
        console.log(id);
        console.log(name);

        // alert("Please note! You are about to delete " + name);
        // alert("Please Confirm! You are about to delete " + name);

        if (window.confirm("Please note! You are aboute to delete " + name)) {

          fetch("http://localhost:3001/AddStatus", {
            method: "DELETE",
            body: JSON.stringify({
              "stsId": id,
              "StatusName": name,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }

          }).then((response) => response.json()).then((data) => {
            console.log("Data")
            console.log(data);
            setFetchedStatus(data.newList)

            if (data.deleted === 1) {
              setMessage(data.Message);
            } else {
              console.log(data.Message);
              setMessage(data.Message);
            }
          })
        }
      }

      function SubmitStatus() {
        if (ValidateFlag) {
          fetch("http://localhost:3001/AddStatus", {
            method: "POST",
            body: JSON.stringify({
              "StatusName": document.getElementById('StatusCode').value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }

          }).then((response) => response.json()).then((data) => {
            console.log("Data")
            console.log(data);
            console.log(data.newList[0].LDGName);

            setFetchedStatus(data.newList)

            console.log("Data  affected rows")

            console.log(data.affectedRows);
            if (data.affectedRows === 1) {
              // window.location.href = "http://localhost:3000/AdminHome";
              setMessage(data.Message);
              document.getElementById("StatusCode").value = "";
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
          <div className="addStatus">

            <AdminHeader></AdminHeader>

            <div className="addStatus-menu">
              <center>{Message ? <span className='validators' style={{ visibility: "visible", background: "green", color: "white" }}>{Message}</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >}</center>
              {/* id="hideMeAfter10Seconds" */}
              <div className="addStatus-submenu">

                {!show &&
                  <div>
                    <h2 className="addStatus-menu-heading" id="heading" >Add Status</h2><br />

                    Enter Status Code:
                    <input id="StatusCode" placeholder='Enter Status Code' type="text" onChange={Validator} required></input><br />
                    {StatusCodeErr ? <span className='validators' style={{ visibility: 'visible' }}>Status Code can not be empty!</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >}

                    <button id="Submit" onClick={SubmitStatus}>Add New Status Code</button>
                  </div>
                }
                {show &&
                  <div>
                    <h2 className="addStatus-menu-heading" id="updateheading" >Update Status</h2><br />

                    Update Status Code:
                    <input id="updateStatusCode" placeholder='Update Status Code' type="text" onChange={Validator} required ></input><br />
                    {/* {StatusCodeErr ? <span className='validators' style={{ visibility: 'visible' }}>Employee Name can not be empty!</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >} */}

                    <button id="updateSubmit" onClick={UpdateStatus}>Update Status Code</button>
                  </div>
                }

              </div>

              <div className="addStatus-menu-displaydata">
                <table >
                  <tbody>
                    {FetchedStatus.map(e => {

                      return <tr key={e.stsId}>
                        <td>
                          <label id={e.stsId}>{e.StatusName} </label>
                        </td>

                        <td>
                          <button className="icon" id={e.stsId} name={e.StatusName} onClick={DeleteStatus}> <img id={e.stsId} name={e.StatusName} src={DeleteIcon} className="DeleteIcon" /></button>
                        </td>

                        <td>
                          <button className="icon" id={e.stsId} name={e.StatusName} onClick={setUpdateStatus}> <img id={e.stsId} name={e.StatusName} src={UpdateIcon} className="UpdateIcon" /></button>
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

export default AddStatus;
