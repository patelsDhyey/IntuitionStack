import './css/MyRejectedSolution.css';
import EmployeeHeader from './EmployeeHeader';
import UpdateIcon from './css/update.svg'
import DeleteIcon from './css/delete.svg'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function MyRejectedSolution() {

  const [FetchedIntuitions, setFetchedIntuitions] = useState([]);

  const [Message, setMessage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/MyRejectedSolution/${sessionStorage.getItem("sessionid")}`).then((response) => response.json()).then((data) => {
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

        <div className="myrejectedsolution">
          <div className="myrejectedsolution-form">
            {/* <Link className="home-header-back" to="/Employee/Dashboard">&#8592;</Link> */}
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='myrejectedsolution-title'>My Rejected Solution</div>
            <div className="myrejectedsolution-displaydata">
              {FetchedIntuitions.map(e => {
                return (
                  <div className="myrejectedsolution-content" key={e.solid}>
                    <label className='myrejectedsolution-content-brief' >  {e.Solution}  </label>
                    <label className='myrejectedsolution-content-desc'  >{e.solComments}  </label>
                    <label className='myrejectedsolution-content-status' >{e.StatusName}  </label>
                    <label className='myrejectedsolution-content-posted' >Posted on: &nbsp;{e.intDate},&nbsp;{e.intTime}  </label>
                    {/* <label className='myrejectedsolution-content-tags' id={e.intid}>{e.intTags.split(" ").map((el, key) => {
                      return <label className='myrejectedsolution-content-tags-tag' key={key}>{el}</label>
                    })}  </label> */}
                    <div className="myrejectedsolution-menu-feedback">
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

export default MyRejectedSolution;
