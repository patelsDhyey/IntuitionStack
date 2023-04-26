import './css/PendingToApprove.css';
import EmployeeHeader from './EmployeeHeader';
import ApproveIcon from './css/approve.svg'
import React, { useState, useEffect } from 'react'
import SolutionIcon from './css/solution.svg'
import { Link } from 'react-router-dom';

function PendingToApprove() {

  const [FetchedIntuitions, setFetchedIntuitions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/PendingToApprove`).then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedIntuitions(data);
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function SolutionIntuition(e) {
      localStorage.setItem(`SelectedIntuitionId`, e.target.id);
      window.location.href = "http://localhost:3000/Employee/Dashboard/Solution/";
    }

    function ApproveIntuition(e) {
      // fetch("http://localhost:3001/PendingToApprove", {
      //   method: "PUT",
      //   body: JSON.stringify({
      //     "intStatusId" : "Approved",
      //     "intid"       :  localStorage.getItem("SelectedIntuitionId"),
      //     "intTags"     :  document.getElementById('intTags').value,
      //     // "empStatusId" :  document.getElementById('empStatusId').value,
      //   }),
      //   headers: {
      //     "Content-type": "application/json; charset=UTF-8"
      //   } 

      // }).then((response) => response.json()).then((data)=>{
      //   //PENDONG KEEP POPUP
      //   window.location.href = "http://localhost:3000/Employee/MyIntuition";
      // })

    }

    function FireBack() {
      window.history.back();
    }

    return (
      <>

        <div className="PendingToApprove">
          <div className="PendingToApprove-form">
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='PendingToApprove-title'>Pending to Approval by Manager</div>
            <div className="PendingToApprove-displaydata">
              {FetchedIntuitions.map(e => {
                return (
                  <div className="PendingToApprove-content" key={e.intid}>
                    <label className='PendingToApprove-content-brief' >  {e.intBrief}  </label>
                    <label className='PendingToApprove-content-desc'  >{e.intDesc}  </label>
                    <label className='PendingToApprove-content-status' >{e.StatusName}  </label>
                    <label className='PendingToApprove-content-posted' >Posted on: &nbsp;{e.intDate},&nbsp;{e.intTime}  </label>
                    <label className='PendingToApprove-content-tags' id={e.intid}>{e.intTags.split(" ").map((el, key) => {
                      return <label className='PendingToApprove-content-tags-tag' key={key}>{el}</label>
                    })}  </label>
                    <div className="PendingToApprove-menu-feedback">
                      {/* <button onClick={ApproveIntuition} id={e.intid} tooltip="Approve this Intuition"><img src={ApproveIcon} /></button> */}
                      <button id={e.intid} onClick={SolutionIntuition} tooltip="Solution"> <img id={e.intid} src={SolutionIcon} /></button>
                    </div>
                  </div>
                )
              })}
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

export default PendingToApprove;
