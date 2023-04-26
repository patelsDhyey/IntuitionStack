import './css/ImplementedIntuitionsByMgr.css';
import EmployeeHeader from './EmployeeHeader';
import React, { useState, useEffect } from 'react'
import RewardIcon from './css/reward.svg'
import { Link } from 'react-router-dom';

function ImplementedIntuitionsByMgr() {

  const [FetchedIntuitions, setFetchedIntuitions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/ImplementedIntuitionsByMgr/${sessionStorage.getItem("sessionid")}`).then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedIntuitions(data);
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function IntuitionRewarded(e) {
      let intuitionId = e.target.id;
      fetch("http://localhost:3001/ImplementedIntuitionsByMgr", {
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

        <div className="implementedintuitionsbymgr">
          <div className="implementedintuitionsbymgr-form">
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='implementedintuitionsbymgr-title'> Intuitions Developed & Reviewed by you</div>
            <div className="implementedintuitionsbymgr-displaydata">
              {FetchedIntuitions.map(e => {
                return (
                  <div className="implementedintuitionsbymgr-content" key={e.intid}>
                    <label className='implementedintuitionsbymgr-content-brief' >  {e.intBrief}  </label>
                    <label className='implementedintuitionsbymgr-content-desc'  >{e.intDesc}  </label>
                    <label className='implementedintuitionsbymgr-content-status' >{e.StatusName}  </label>
                    <label className='implementedintuitionsbymgr-content-posted' >Posted on: &nbsp;{e.intDate},&nbsp;{e.intTime}  </label>
                    <label className='implementedintuitionsbymgr-content-tags' id={e.intid}>{e.intTags.split(" ").map((el, key) => {
                      return <label className='implementedintuitionsbymgr-content-tags-tag' key={key}>{el}</label>
                    })}  </label>
                    <div className="implementedintuitionsbymgr-menu-feedback">
                      {/* <button onClick={ApproveIntuition} id={e.intid} tooltip="Approve this Intuition"><img src={ApproveIcon} /></button> */}
                      <button id={e.intid} onClick={IntuitionRewarded} tooltip="Reviewed and Reward"> <img id={e.intid} src={RewardIcon} /></button>
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

export default ImplementedIntuitionsByMgr;
