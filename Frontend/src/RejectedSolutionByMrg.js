import './css/RejectedSolutionByMrg.css';
import EmployeeHeader from './EmployeeHeader';
import UpdateIcon from './css/update.svg'
import DeleteIcon from './css/delete.svg'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function RejectedSolutionByMrg() {

  const [FetchedIntuitions, setFetchedIntuitions] = useState([]);

  const [Message, setMessage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/RejectedSolutionByMrg/${sessionStorage.getItem("sessionid")}`).then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedIntuitions(data);
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function FireBack() {
      window.history.back();
    }

    return (
      <>

        <div className="rejectedsolutionbymrg">
          <div className="rejectedsolutionbymrg-form">
            {/* <Link className="home-header-back" to="/Employee/Dashboard">&#8592;</Link> */}
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='rejectedsolutionbymrg-title'>Solutions Rejected By You</div>
            <div className="rejectedsolutionbymrg-displaydata">
              {FetchedIntuitions.map(e => {
                return (
                  <div className="rejectedsolutionbymrg-content" key={e.solid}>
                    <label className='rejectedsolutionbymrg-content-brief' >  {e.Solution}  </label>
                    <label className='rejectedsolutionbymrg-content-desc'  >{e.solComments}  </label>
                    <label className='rejectedsolutionbymrg-content-status' >{e.StatusName}  </label>
                    <label className='rejectedsolutionbymrg-content-posted' >Posted on: &nbsp;{e.intDate},&nbsp;{e.intTime}  </label>
                    {/* <label className='rejectedsolutionbymrg-content-tags' id={e.intid}>{e.intTags.split(" ").map((el, key) => {
                      return <label className='rejectedsolutionbymrg-content-tags-tag' key={key}>{el}</label>
                    })}  </label> */}
                    <div className="rejectedsolutionbymrg-menu-feedback">
                      {/* <button onClick={UpdateIntuition} id={e.intid} tooltip="Update"> <img src={UpdateIcon} /></button>
                      <button onClick={DeleteIntuition} id={e.intid} tooltip="Delete"><img src={DeleteIcon} /></button> */}
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

export default RejectedSolutionByMrg;
