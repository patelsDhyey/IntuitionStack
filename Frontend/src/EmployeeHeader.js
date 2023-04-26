import logo from './css/img/Logo.png';
import './css/EmployeeHeader.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import LogoutSVG from './css/logout.svg'
import HomeSVG from './css/home.svg'
import SearchSVG from './css/search.svg'
import ChatBot from './ChatBot';
import _ from 'lodash'

function EmployeeHeader() {

  if (window.location.href === "http://localhost:3000/Employee/EmployeeHeader") {
    window.location.href = "http://localhost:3000/Employee/Dashboard";
  }

  const [stateGlobalData, setstateGlobalData] = useState(null);

  const [stateGlobalSearched, setstateGlobalSearched] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/EmployeeHeader").then((response) => response.json()).then((data) => {
      console.log(data)
      setstateGlobalData(data)
      // console.log(stateGlobalData)
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function GlobalSearch(e) {

      let mysearch = e.target.value;

      // console.log(mysearch);
      // console.log(setstateGlobalData.GlobalFetchEmployeeLst);
      if (e.target.value !== "") {
        if (!document.getElementsByClassName("home-header-globalsearch")[0].classList.contains("home-header-globalsearch-visible")) {
          document.getElementsByClassName("home-header-globalsearch")[0].classList.add("home-header-globalsearch-visible");
        }
      }
      else {
        if (document.getElementsByClassName("home-header-globalsearch")[0].classList.contains("home-header-globalsearch-visible")) {
          document.getElementsByClassName("home-header-globalsearch")[0].classList.remove("home-header-globalsearch-visible");
        }
      }

      let employeeSearch = _.filter(stateGlobalData.GlobalFetchEmployeeLst, function (k) {
        if (k.empname.includes(mysearch)) {
          return k;
        }
      })
      console.log("Employees: ", employeeSearch)

      let IntuitionSearch = _.filter(stateGlobalData.GlobalFetchIntuitionLst, function (l) {
        if (l.intBrief.includes(mysearch) || l.intTags.includes(mysearch)) {
          return l;
        }
      })
      console.log("Intuitions: ", IntuitionSearch)

      let SolutionSearch = _.filter(stateGlobalData.GlobalFetchSolutionLst, function (m) {
        if (m.Solution.includes(mysearch) || m.solComments.includes(mysearch)) {
          return m;
        }
      })
      console.log("Solutions: ", SolutionSearch)

      let FeedbackSearch = _.filter(stateGlobalData.GlobalFetchFeedbackLst, function (n) {
        if (n.feedbackComments.includes(mysearch)) {
          return n;
        }
      })
      console.log("Feedbacks: ", FeedbackSearch)

      setstateGlobalSearched([{ "Employee": employeeSearch, "Intuitions": IntuitionSearch, "Solutions": SolutionSearch, "Feedbacks": FeedbackSearch }])
      console.log(stateGlobalSearched)
      // console.log(employeeSearch,IntuitionSearch,SolutionSearch,FeedbackSearch);

    }

    function Logout() {
      fetch("http://localhost:3001/UserTracker", {
            method: "POST",
            body: JSON.stringify({
              "LogoutEntry": "true",
              "userId": sessionStorage.getItem("sessionid"),
              "Token": localStorage.getItem("Token"),
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then((res) => {
            return res.json();
          }).then((data) => {
            if(data.sessionExit){

              localStorage.removeItem('Designation');
              sessionStorage.removeItem('sessionkey');
              sessionStorage.removeItem('sessionid');
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = "http://localhost:3000/Login";
            }
            
          })
     
    }
    return (
      <>
        <div className="home">

          <div className="home-header">
            <img src={logo} alt='Logo Loading' className='home-header-logo'></img>


            <img src={SearchSVG} alt='Logo Loading' className='home-search-logo'></img>
            <input type="text" placeholder='Global Search...' onKeyUp={GlobalSearch}></input>


            {/* <div className="home-header-info">Welcome Back! {sessionStorage.getItem("sessionkey")}</div> */}
            <div className='home-header-actions'>

              <Link className="home-header-actions-action-home" to="/Employee/Dashboard" tooltip="Home"><img src={HomeSVG} alt="home" /></Link>
              <Link className="home-header-actions-action-logout" onClick={Logout} tooltip="Logout"><img src={LogoutSVG} alt="logout" /></Link>
            </div>

            <div className="home-header-globalsearch">
              <div className='home-header-globalsearch-employee home-header-globalsearch-section'>
                <div className='home-header-globalsearch-section-header'>Employees</div>
                {stateGlobalSearched != null ? stateGlobalSearched[0].Employee.length > 0 ? <div className="home-header-globalsearch-section-content">{stateGlobalSearched[0].Employee.map(elem => {
                  return <span> {elem.empname}  </span>
                })}
                </div> : <div>No Matching records</div> : <div>No Matching records</div>}
              </div>
              <div className='home-header-globalsearch-intuition home-header-globalsearch-section'>
                <div className='home-header-globalsearch-section-header'>Intuitions</div>
                {stateGlobalSearched != null ? stateGlobalSearched[0].Intuitions.length > 0 ? <div className="home-header-globalsearch-section-content">{stateGlobalSearched[0].Intuitions.map(elem => {
                  return <span> {elem.intBrief} </span>
                })}</div> : <div>No Matching records</div> : <div>No Matching records</div>}

              </div>
              <div className='home-header-globalsearch-solution home-header-globalsearch-section'>
                <div className='home-header-globalsearch-section-header'>Solutions</div>

                {stateGlobalSearched != null ? stateGlobalSearched[0].Solutions.length > 0 ? <div className="home-header-globalsearch-section-content">{stateGlobalSearched[0].Solutions.map(elem => {
                  return <span> {elem.Solution}  </span>
                })}</div> : <div>No Matching records</div> : <div>No Matching records</div>}

              </div>
              <div className='home-header-globalsearch-feedback home-header-globalsearch-section'>
                <div className='home-header-globalsearch-section-header'>Feedbacks</div>
                {stateGlobalSearched != null ? stateGlobalSearched[0].Feedbacks.length > 0 ? <div className="home-header-globalsearch-section-content">{stateGlobalSearched[0].Feedbacks.map(elem => {
                  return <span> {elem.feedbackComments}  </span>
                })}</div> : <div>No Matching records</div> : <div>No Matching records</div>}

              </div>
            </div>
          </div>


          <div className="home-menu">
            <div className='home-menu-div'>
              <h2 className="home-menu-heading">Operations</h2>
              <Link to="/Employee/PostIntuition" className="home-menu-links"> Add Intuition</Link>
              {/* <Link to="/Employee/Dashboard" className="home-menu-links"> View New Intuitions</Link> */}
              <Link to="/Employee/MyIntuition" className="home-menu-links"> Your Intuitions</Link>
              <Link to="/Employee/Connections" className="home-menu-links"> Connections</Link>
              <Link to="" className="home-menu-links"> Chat Bot</Link>
              <Link to="" className="home-menu-links"> Global Search</Link>
            </div>

            <div className='home-menu-div'><h2 className="home-menu-heading">My Intuitions-Status</h2>
              <Link to="/Employee/ApprovedIntuitions" className="home-menu-links">Approved</Link>
              <Link to="/Employee/PendingForApprovals" className="home-menu-links"> Pending for Approvals</Link>
              <Link to="/Employee/IntuitionsImplemented" className="home-menu-links"> Implemented</Link>
              <Link to="/Employee/MyRejectedSolution" className="home-menu-links"> Solutions Rejected</Link>
              <Link to="/Employee/Rewarded" className="home-menu-links"> Rewarded</Link>
            </div>

            <div className='home-menu-div'><h2 className="home-menu-heading">Manager-Approvals-Actions</h2>
              <Link to="/Employee/Manager/PendingToApprove" className="home-menu-links"> Pending to Approve</Link>
              <Link to="/Employee/Manager/ApprovedIntuitionsByMgr" className="home-menu-links"> Approved Intuitions</Link>
              <Link to="/Employee/Manager/ImplementedIntuitionsByMgr" className="home-menu-links"> Implemented Intuitions</Link>
              <Link to="/Employee/Manager/RejectedSolutionByMrg" className="home-menu-links"> Rejected Solutions</Link>
              <Link to="/Employee/Manager/RewardedByMrg" className="home-menu-links"> Rewarded</Link>
            </div>

            <div className='home-menu-parent'>
              <div className='home-menu-div'><h2 className="home-menu-heading">Security - Authentication</h2>
                <Link to="/Employee/Authentication/Bio" className="home-menu-links">Edit Bio</Link>
                <Link to="/Employee/Authentication/ResetPassword" className="home-menu-links">Reset Password</Link>
              </div>

              <div className='home-menu-div'><h2 className="home-menu-heading">Managerial Reports</h2>
                <Link to="/Employee/EditBio" className="home-menu-links">SUS Employee Activity</Link>
                <Link to="/Employee/ResetPassword" className="home-menu-links"> Employee log in Report</Link>
              </div>
            </div>

            <div className="home-menu-label"> 
              Navigator
            </div>
            
          </div>

          <div className='home-footer'>
            <center>
              {sessionStorage.getItem("sessionkey")} &nbsp;
              Login time: [{localStorage.getItem("logintime")} &nbsp;
              <Link className="home-header-actions-action-logout" onClick={Logout} tooltip="Logout">Logout</Link> ]
            </center>
          </div>

        </div>

       
        <ChatBot className="chatbot" />
      </>
    );
  }
  else {
    window.location.href = "http://localhost:3000/Login";
  }
}

export default EmployeeHeader;
