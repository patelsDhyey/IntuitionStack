import './css/ApprovedIntuitions.css';
import EmployeeHeader from './EmployeeHeader';
import UpdateIcon from './css/update.svg'
import DeleteIcon from './css/delete.svg'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function ApprovedIntuitions() {

  const [FetchedIntuitions, setFetchedIntuitions] = useState([]);

  const [Message, setMessage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/ApprovedIntuitions/${sessionStorage.getItem("sessionid")}`).then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedIntuitions(data);
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function UpdateIntuition(e) {

      localStorage.setItem(`SelectedIntuitionId`, e.target.id);
      window.location.href = "http://localhost:3000/Employee/MyIntuition/Update";

    }

    function FireBack() {
      window.history.back();
    }

    function DeleteIntuition(e) {
      let id = (e.target.id)
      console.log(id);

      // alert("Please note! You are about to delete " + name);
      // alert("Please Confirm! You are about to delete " + name);

      if (window.confirm("Please note! You are aboute to delete your Intuition")) {

        fetch("http://localhost:3001/ApprovedIntuitions", {
          method: "DELETE",
          body: JSON.stringify({
            "intid": id,
            "intByEmpId": sessionStorage.getItem("sessionid")
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }

        }).then((response) => response.json()).then((data) => {
          console.log("Data")
          console.log(data);
          setFetchedIntuitions(data.newList)

          if (data.deleted === 1) {
            setMessage(data.Message);
          } else {
            console.log(data.Message);
            setMessage(data.Message);
          }
        })
      }
    }

    return (
      <>

        <div className="approvedintuitions">
          <div className="approvedintuitions-form">
            {/* <Link className="home-header-back" to="/Employee/Dashboard">&#8592;</Link> */}
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='approvedintuitions-title'>My Approved Intuitions</div>
            <div className="approvedintuitions-displaydata">
              {FetchedIntuitions.map(e => {
                return (
                  <div className="approvedintuitions-content" key={e.intid}>
                    <label className='approvedintuitions-content-brief' >  {e.intBrief}  </label>
                    <label className='approvedintuitions-content-desc'  >{e.intDesc}  </label>
                    <label className='approvedintuitions-content-status' >{e.StatusName}  </label>
                    <label className='approvedintuitions-content-posted' >Posted on: &nbsp;{e.intDate},&nbsp;{e.intTime}  </label>
                    <label className='approvedintuitions-content-tags' id={e.intid}>{e.intTags.split(" ").map((el, key) => {
                      return <label className='approvedintuitions-content-tags-tag' key={key}>{el}</label>
                    })}  </label>
                    <div className="approvedintuitions-menu-feedback">
                      <button onClick={UpdateIntuition} id={e.intid} tooltip="Update"> <img src={UpdateIcon} /></button>
                      <button onClick={DeleteIntuition} id={e.intid} tooltip="Delete"><img src={DeleteIcon} /></button>
                    </div>
                  </div>
                )
              })}
              {Message ? <span className='validators' style={{ visibility: "visible", background: "green", color: "white" }}>{Message}</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >}
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

export default ApprovedIntuitions;
