import './css/AddLocation.css';
import { useEffect } from 'react';
import AdminHeader from './AdminHeader';
import React, { useState } from 'react';
import DeleteIcon from './css/delete.svg';
import UpdateIcon from './css/update.svg';

function AddLocation() {

  let ValidateFlag = false;
  const [locationId, setlocationId] = useState("");
  const [locationName, setlocationName] = useState("");
  const [locationLDGID, setlocationLDGID] = useState("");

  const [show, setShow] = useState(false);

  const [locationNameErr, setlocationNameErr] = useState(null);


  const [locationLDGIDErr, setlocationLDGIDErr] = useState(null);

  const [Message, setMessage] = useState(false);

  const [FetchedLocation, setFetchedLocation] = useState([]);
  const [FetchedCountry, setFetchedCountry] = useState([]);

  // let updateLocationid = null;
  // let updateLocationName = null;
  // let updateLocationLDGid = null;
  // // let updateLocationFlag = false;

  useEffect(() => {
    fetch("http://localhost:3001/AddLocation").then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedLocation(data.LocationList);
      setFetchedCountry(data.CountryList);
    })
  }, [])

  useEffect(() => {
    if (locationNameErr === null || locationLDGIDErr === null) {
      ValidateFlag = false
    } else if (!locationNameErr && !locationLDGIDErr) {
      ValidateFlag = true
    } else if (locationNameErr || locationLDGIDErr) {
      ValidateFlag = false
    }
  }, [locationNameErr, locationLDGIDErr])

  if (!(sessionStorage.getItem("sessionkey") === null)) {
    if (localStorage.getItem("Designation") === "Admin") {


      function Validator(e) {
        e.preventDefault()

        let item = e.target.value;
        let id = (e.target.id)
        console.log("id :" + e.target.id)
        console.log("Value :" + e.target.value)

        if (item.length === 0 && id === "locationName")
          setlocationNameErr(true);
        else if (item.length > 0 && id === "locationName")
          setlocationNameErr(false);

        if (item === '0' && id === "locationLDGID")
          setlocationLDGIDErr(true);
        else if (item >= 1 && id === "locationLDGID") {
          setlocationLDGIDErr(false);
          console.log("inside")
        }
      }

      function setUpdateLocation(e) {
        setShow(true);
        setTimeout(() => {
          setlocationId(e.target.id)
          setlocationName(e.target.name)
          setlocationLDGID(e.target.attributes.getNamedItem('mycountry').value);

          console.log(locationName, locationLDGID)

          document.getElementById("updateLocationName").value = e.target.name;
          document.getElementById("updateLocationLDGID").value = e.target.attributes.getNamedItem('mycountry').value;
        }, 1000)
      }

      function Updatelocation(e) {
        console.log(locationId, document.getElementById("updateLocationName").value, document.getElementById('updateLocationLDGID').value)
        if (show) {
          fetch("http://localhost:3001/AddLocation", {
            method: "PUT",
            body: JSON.stringify({
              "Lid": locationId,
              "LocationName": document.getElementById("updateLocationName").value,
              "LocationLDGID": document.getElementById('updateLocationLDGID').value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }

          }).then((response) => response.json()).then((data) => {
            console.log("Data")
            console.log(data);
            setFetchedLocation(data.newList)

            if (data.Updated === 1) {
              setMessage(data.Message);
            } else {
              console.log(data.Message);
              setMessage(data.Message);
            }
            setShow(false);
          })
        }
      }

      function Deletelocation(e) {
        let id = (e.target.id)
        let name = (e.target.name)
        console.log(id);
        console.log(name);

        // alert("Please note! You are about to delete " + name);
        // alert("Please Confirm! You are about to delete " + name);

        if (window.confirm("Please note! You are aboute to delete " + name)) {

          fetch("http://localhost:3001/AddLocation", {
            method: "DELETE",
            body: JSON.stringify({
              "Lid": id,
              "LocationName": name,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }

          }).then((response) => response.json()).then((data) => {
            console.log("Data")
            console.log(data);
            setFetchedLocation(data.newList)

            if (data.deleted === 1) {
              setMessage(data.Message);
            } else {
              console.log(data.Message);
              setMessage(data.Message);
            }
          })
        }
      }

      function Submitlocation() {
        if (ValidateFlag) {
          fetch("http://localhost:3001/AddLocation", {
            method: "POST",
            body: JSON.stringify({
              "LocationName": document.getElementById('locationName').value,
              "LocationLDGID": document.getElementById('locationLDGID').value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }

          }).then((response) => response.json()).then((data) => {
            console.log("Data")
            console.log(data);
            console.log(data.newList[0].LDGName);

            setFetchedLocation(data.newList)

            console.log("Data  affected rows")

            console.log(data.affectedRows);
            if (data.affectedRows === 1) {
              // window.location.href = "http://localhost:3000/AdminHome";
              setMessage(data.Message);
              document.getElementById("locationName").value = "";
              document.getElementById("locationLDGID").value = 0;
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
          <div className="addLocation">

            <AdminHeader></AdminHeader>

            <div className="addLocation-menu">
              <center>{Message ? <span className='validators' style={{ visibility: "visible", background: "green", color: "white" }}>{Message}</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >}</center>
              {/* id="hideMeAfter10Seconds" */}
              <div className="addLocation-submenu">

                {!show &&
                  <div>
                    <h2 className="addLocation-menu-heading">Add Location</h2><br />

                    Enter Location Name:
                    <input id="locationName" placeholder='Enter location Name' type="text" onChange={Validator} required></input><br />
                    {locationNameErr ? <span className='validators' style={{ visibility: 'visible' }}>Please entery Location name!</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >}

                    Select LDG:
                    {/* <input id="locationLDGID" placeholder='Enter Location Name' type="text" onChange={Validator}  required></input><br/> */}
                    <select id="locationLDGID" placeholder='Select Location Name' type="text" onChange={Validator} required>
                      <option value="0" name="null"> --Select--</option>
                      {FetchedCountry.map(e => {
                        return <option value={e.LDGid} name={e.LDGName} key={e.LDGid}> {e.LDGName} </option>
                      })}

                    </select>

                    <br />
                    {locationLDGIDErr ? <span className='validators' style={{ visibility: 'visible' }}>Please select Country!</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >}


                    <button id="Submit" onClick={Submitlocation}>Add New Location</button>
                  </div>
                }

                {show &&
                  <div>
                    <h2 className="addLocation-menu-heading">Update Location</h2><br />

                    Update Location Name:
                    <input id="updateLocationName" placeholder='Update location Name' type="text" onChange={Validator} required ></input><br />
                    {locationNameErr ? <span className='validators' style={{ visibility: 'visible' }}>Please entery Location name!</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >}

                    Update LDG:
                    {/* <input id="locationLDGID" placeholder='Enter Location Name' type="text" onChange={Validator}  required></input><br/> */}
                    <select id="updateLocationLDGID" placeholder='Select Location Name' type="text" onChange={Validator} required>
                      <option value='0' name="null"> --Select--</option>
                      {FetchedCountry.map(e => {
                        return <option value={e.LDGid} name={e.LDGName} key={e.LDGid}> {e.LDGName} </option>
                      })}

                    </select>

                    <br />
                    {locationLDGIDErr ? <span className='validators' style={{ visibility: 'visible' }}>Please select Country!</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >}


                    <button id="updateSubmit" onClick={Updatelocation}>Update New Location</button>
                  </div>
                }

              </div>

              <div className="addLocation-menu-displaydata">
                <table >
                  <tbody>
                    {FetchedLocation.map(e => {

                      return <tr key={e.Lid}>

                        <td>
                          <label id={e.Lid}>{e.LocationName} </label>
                        </td>

                        <td>
                          <button className="icon" id={e.Lid} name={e.LocationName} onClick={Deletelocation}> <img id={e.Lid} name={e.LocationName} src={DeleteIcon} className="DeleteIcon" /></button>
                        </td>
                        <td>
                          <button className="icon" id={e.Lid} name={e.LocationName} mycountry={e.LocationLDGID} onClick={setUpdateLocation}> <img id={e.Lid} name={e.LocationName} mycountry={e.LocationLDGID} src={UpdateIcon} className="UpdateIcon" /></button>
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

export default AddLocation;
