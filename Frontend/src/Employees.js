import './css/Employees.css';
import EmployeeHeader from './EmployeeHeader';
import UpdateIcon from './css/update.svg'
import DeleteIcon from './css/delete.svg'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

function Employees() {

  let connections;

  const [FetchedEmployees, setFetchedEmployees] = useState([]);

  const [Message, setMessage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/Employees/${localStorage.getItem("SelectedEmployeeId")}`).then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedEmployees(data);
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {
    if(!(localStorage.getItem("SelectedEmployeeId") === null)){

      function FireBack() {
        window.history.back();
      }
  
      return (
        <>
  
          <div className="employees">
            <div className="employees-form">
              {/* <Link className="home-header-back" to="/Employee/Dashboard">&#8592;</Link> */}
              <div className="home-header-back" onClick={FireBack}>&#8592;</div>
              <div className='employees-title'>{FetchedEmployees.map(ee => {
                return ( <span>  {ee.empname} </span>  )
              })}</div>
              <div className="employees-displaydata">
  
                
                {FetchedEmployees.map(e => {
                  return (
                    <div className="employees-content" key={e.empid}>
                       Name: <label  >  {e.empname}  </label>
                     GUID: <label  >{e.empGUID}  </label>
                     Email: <label >{e.empEmail}  </label>
                     Phone: <label >{e.empPhone}  </label>
                     Address <label  >{e.empAddress}  </label>
                     {/* Name: <label className='employees-content-brief' >  {e.empname}  </label>
                     GUID: <label className='employees-content-desc'  >{e.empGUID}  </label>
                     Email: <label className='employees-content-status' >{e.empEmail}  </label>
                     Phone: <label className='employees-content-status' >{e.empPhone}  </label>
                     Address <label className='employees-content-status' >{e.empAddress}  </label> */}
  
                      {/* <label  className='employees-content-posted' >Posted on: &nbsp;{e.intDate},&nbsp;{e.intTime}  </label> 
                       <label className='employees-content-tags'  id={e.intid}>{e.intTags.split(" ").map((el,key)=>{
                    return <label className='employees-content-tags-tag' key={key}>{el}</label>
                  })}  </label> 
                     */}
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
    }else{
      window.location.href = "http://localhost:3000/Employee/Dashboard";
    }  
  } else {
    window.location.href = "http://localhost:3000/Login";
  }
}

export default Employees;
