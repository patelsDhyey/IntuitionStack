import './css/ApprovedIntuitionsByMgr.css';
import EmployeeHeader from './EmployeeHeader';
import ApproveIcon from './css/approve.svg'
import ImplementedIcon from './css/implemented.svg'
import React, { useState, useEffect } from 'react'
import SolutionIcon from './css/solution.svg'
import { Link } from 'react-router-dom';

function ApprovedIntuitionsByMgr() {

  const [FetchedIntuitions, setFetchedIntuitions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/ApprovedIntuitionsByMgr/${sessionStorage.getItem("sessionid")}`).then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedIntuitions(data);
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function IntuitionImplemented(e) {
      let intuitionId = e.target.id;
      fetch("http://localhost:3001/ApprovedIntuitionsByMgr", {
          method: "PUT",
          body: JSON.stringify({
            "intid": intuitionId,
            "intStatusID": sessionStorage.getItem("sessionid"),
            "intApprovedByEmpId": sessionStorage.getItem("sessionid"),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }

        }).then((response) => response.json()).then((data) => {
          console.log("Data")
          console.log(data);

          if (data.flag === 1) {
            // setMessage(data.Message);
          } else {
            // console.log(data.Message);
            // setMessage(data.Message);
          }
        })
    }

    function FireBack() {
      window.history.back();
    }

    return (
      <>

        <div className="approvedintuitionsbymgr">
          <div className="approvedintuitionsbymgr-form">
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='approvedintuitionsbymgr-title'> Intuition Approved by you</div>
            <div className="approvedintuitionsbymgr-displaydata">
              {FetchedIntuitions.map(e => {
                return (
                  <div className="approvedintuitionsbymgr-content" key={e.intid}>
                    <label className='approvedintuitionsbymgr-content-brief' >  {e.intBrief}  </label>
                    <label className='approvedintuitionsbymgr-content-desc'  >{e.intDesc}  </label>
                    <label className='approvedintuitionsbymgr-content-status' >{e.StatusName}  </label>
                    <label className='approvedintuitionsbymgr-content-posted' >Posted on: &nbsp;{e.intDate},&nbsp;{e.intTime}  </label>
                    <label className='approvedintuitionsbymgr-content-tags' id={e.intid}>{e.intTags.split(" ").map((el, key) => {
                      return <label className='approvedintuitionsbymgr-content-tags-tag' key={key}>{el}</label>
                    })}  </label>
                    <div className="approvedintuitionsbymgr-menu-feedback">
                      {/* <button onClick={ApproveIntuition} id={e.intid} tooltip="Approve this Intuition"><img src={ApproveIcon} /></button> */}
                      <button id={e.intid} onClick={IntuitionImplemented} tooltip="Implemented and verified"> <img id={e.intid} src={ImplementedIcon} /></button>
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

export default ApprovedIntuitionsByMgr;
