import './css/Connections.css';
import EmployeeHeader from './EmployeeHeader';
import UpdateIcon from './css/update.svg'
import DeleteIcon from './css/delete.svg'
import React, { useState, useEffect } from 'react'
import SearchIcon from './css/search.svg'
import { Link } from 'react-router-dom';
import _ from 'lodash'

function Connections() {

  const [FetchedEmployees, setFetchedEmployees] = useState([]);
  const [ShowEmployees, setShowEmployees] = useState([]);

  const [Message, setMessage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/Connections/`).then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedEmployees(data);
      setShowEmployees(data);
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null) ) {

    function takeToEmployee(e){
      localStorage.setItem("SelectedEmployeeId", e.target.value);
      window.location.href = `http://localhost:3000/Employee/Connections/Employees`;
    }

    function searchEmployee(e){
      let mysearch = e.target.value;

      console.log("Entered value",mysearch)

      if(e.target.value !== ""){
        let EmployeeSearch = _.filter(FetchedEmployees, function (l) {
          if (l.empname.includes(mysearch)) {
            return l;
          }
        })
        console.log("Searched Employees: ", EmployeeSearch)
        setShowEmployees(EmployeeSearch)
      }else{
        setShowEmployees(FetchedEmployees)
      }
    }

    function FireBack(){
      window.history.back();
    } 

    return (
      <>

        <div className="connections">
          <div className="connections-form">
            {/* <Link className="home-header-back" to="/Employee/Dashboard">&#8592;</Link> */}
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>	
            <div className='connections-title'>Connections</div>
            <div className="connections-displaydata">
              
              <label for="Search Connections">Search for Connections:</label>
              <input type="search" onChange={searchEmployee} id="getConnectionName" name="Csearch" className="connections-displaydata-select" placeholder='Try a person name, email or global ID (GUID)'/> <img className='connections-displaydata-img' src={SearchIcon} />
              
              <div className="connections-displaydata-results">
              {ShowEmployees.map(e => {
                    return <option value={e.empid} key={e.empid} onClick={takeToEmployee}> {e.empname} </option>
              })}
              </div>
            
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

export default Connections;
