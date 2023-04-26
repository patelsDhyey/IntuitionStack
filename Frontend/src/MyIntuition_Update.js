import './css/MyIntuition_Update.css';
import EmployeeHeader from './EmployeeHeader';
import UpdateIcon from './css/update.svg'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function MyIntuition_Update() {

  const [FetchedIntuitions, setFetchedIntuitions] = useState([]);
  const [FetchedStatus, setFetchedStatus] = useState([]);

  // const [Message, setMessage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/MyIntuition_Update/${localStorage.getItem("SelectedIntuitionId")}`).then((response) => response.json()).then((data) => {
      console.log(data.fetchedStatus)
      console.log(data.IntuitionsLst)
      setFetchedStatus(data.fetchedStatus);
      setFetchedIntuitions(data.IntuitionsLst);
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function FireBack() {
      window.history.back();
    }

    function UpdateIntuition() {
      fetch("http://localhost:3001/MyIntuition_Update", {
        method: "PUT",
        body: JSON.stringify({
          "intid": localStorage.getItem("SelectedIntuitionId"),
          "intBrief": document.getElementById('intBrief').value,
          "intDesc": document.getElementById('intDesc').value,
          "intTags": document.getElementById('intTags').value,
          // "empStatusId" :  document.getElementById('empStatusId').value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }

      }).then((response) => response.json()).then((data) => {
        //PENDONG KEEP POPUP
        window.location.href = "http://localhost:3000/Employee/MyIntuition";
      })
    }
    return (
      <>
        <div className="myintuition-update">
          <div className="myintuition-update-form">
            {/* <div> <Link className="" to="/Employee/MyIntuition">&#8592;</Link>	 </div> */}
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='myintuition-update-title'>Update Intuition</div>
            <div className="myintuition-update-menu-displaydata">
              <div className="myintuition-update-menu-displaydata-content">
                <table >
                  <tbody >
                    <tr >
                      {FetchedIntuitions.map(e => {

                        return (

                          <td key={e.intid}>
                            <h3> Title:</h3>
                            <input type="text" className='card-body-component' id="intBrief" defaultValue={e.intBrief} placeholder='Enter Intuition Title' required></input>
                            <br />
                            <h3> Description:</h3>
                            <textarea type="text" className='card-body-component' id="intDesc" defaultValue={e.intDesc} placeholder='Enter Description' required></textarea>
                            <br />
                            <h3> Tags:</h3>
                            <input type="text" className='card-body-component' id="intTags" defaultValue={e.intTags} placeholder='Enter Related Tags  [Multiple tags separated by Tags]' onInput="this.value = this.value.toUpperCase()" style={{ "text-transform": "uppercase" }} required></input>
                            <br />
                            <h3> Date and Time:</h3> <label id={e.intid}>{e.intDate} {e.intTime} </label>
                            <br /><br />
                            <h3> Status:</h3> <label id={e.intid}>{e.intStatusId}  </label>
                            <br /><br />
                            <div>
                              {/* <h3> Status:</h3> */}
                              {/* <select id="empStatusId" placeholder='Select Status' type="text" required defaultValue={e.intStatusId}>
                            <option value="0" name="null"> --Select Status--</option>
                            {FetchedStatus.map(ee=>{
                                  return <option value={ee.stsId} name={ee.StatusName} key={ee.stsId}> {ee.StatusName} </option>
                            })} 
                          </select> */}
                            </div>
                            <div className="myintuition-update-menu-feedback">
                              <button onClick={UpdateIntuition} >  
                              {/* <img src={UpdateIcon} value="Update Intuition"></img> */}
                              Update Intuition
                              </button>
                            </div>
                          </td>

                        )
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              {/* {Message ? <span  className='validators' style={{ visibility: "visible",  background: "green", color: "white" }}>{Message}</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >} */}
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

export default MyIntuition_Update;
