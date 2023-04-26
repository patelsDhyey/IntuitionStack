import './css/Solution.css';
import EmployeeHeader from './EmployeeHeader';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import UpVoteIcon from './css/upvote.svg'
import ApproveIcon from './css/approve.svg'
import RejectIcon from './css/reject.svg'
import DeleteIcon from './css/delete.svg'

function Solution() {

  const [FetchedIntuitions, setFetchedIntuitions] = useState([]);
  const [FetchedSolution, setFetchedSolution] = useState([]);

  const [Message, setMessage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/Dashboard/Solution/${localStorage.getItem("SelectedIntuitionId")}`).then((response) => response.json()).then((data) => {
      console.log(data)
      setFetchedIntuitions(data.IntuitionsLst);
      setFetchedSolution(data.SolutionLst)
      console.log("Fetched Solution", data.SolutionLst)
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function ApproveSolution(e) {
      console.log(e.target.id)
      fetch("http://localhost:3001/Dashboard/Solution", {
        method: "PUT",
        body: JSON.stringify({
          "Approval": "true",
          "solid": e.target.id,
          "IntStatusName": "Intuition Approved",
          "SolStatusName": "Solution Approved",
          "solReviewedByempid": sessionStorage.getItem("sessionid"),
          "solForintid": localStorage.getItem("SelectedIntuitionId")
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => response.json()).then((data) => {

        console.log("Data: ", data);

        if (data.Updated) {
          setMessage(data.Message);
        } else {
          console.log("Some issue occured")
          setMessage(data.Message);
        }
      });
    }

    function RejectSolution(e) {
      console.log(e.target.id)
      fetch("http://localhost:3001/Dashboard/Solution", {
        method: "PUT",
        body: JSON.stringify({
          "Rejection": "true",
          "solid": e.target.id,
          // "IntStatusName": "Intuition Approved",
          "SolStatusName": "Solution Rejected",
          "solReviewedByempid": sessionStorage.getItem("sessionid"),
          "solForintid": localStorage.getItem("SelectedIntuitionId")
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => response.json()).then((data) => {

        console.log("Data: ", data);

        if (data.Updated) {
          setMessage(data.Message);
        } else {
          console.log("Some issue occured")
          setMessage(data.Message);
        }
      });
    }

    function LikeSolution(e) {
      console.log(e.target.id)
      fetch("http://localhost:3001/Dashboard/Solution", {
        method: "POST",
        body: JSON.stringify({
          "reqtype": "Like",
          "upvoteSolid": e.target.id,
          "upvoteByempid": sessionStorage.getItem("sessionid"),
          "upvoteSolIntId": localStorage.getItem("SelectedIntuitionId")
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => response.json()).then((data) => {

        console.log("Data: ", data);

        if (data.Liked) {
          setMessage(data.Message);
          console.log("Total Likes: ", data.getTotalLikes);
        } else {
          setMessage(data.Message);
          console.log("Total Likes: ", data.getTotalLikes);
        }

      });
    }

    function FireBack() {
      window.history.back();
    }

    function DeleteSolution(e) {
      if (window.confirm("Please note! You are aboute to delete ")) {

        fetch("http://localhost:3001/Dashboard/Solution", {
          method: "DELETE",
          body: JSON.stringify({
            "solByempid": sessionStorage.getItem("sessionid"),
            "solid": e.target.id,
            "solForintid": localStorage.getItem("SelectedIntuitionId")
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }

        }).then((response) => response.json()).then((data) => {
          console.log("Data")
          console.log(data);

          if (data.flag === 1) {
            setMessage(data.Message);
            setFetchedSolution(data.SolutionLst)
          } else {
            console.log(data.Message);
            setMessage(data.Message);
          }
        })
      }
    }

    function SubmitSolution(e) {

      console.log("Session ID", sessionStorage.getItem("sessionid"))
      console.log("Intuition ID", localStorage.getItem("SelectedIntuitionId"))
      console.log("Comments: ", document.getElementById("Solution").value)

      console.log(e.target.id)
      fetch("http://localhost:3001/Dashboard/Solution", {
        method: "POST",
        body: JSON.stringify({
          "reqtype": "Solution",
          "Solution": document.getElementById("Solution").value,
          "solByempid": sessionStorage.getItem("sessionid"),
          "solForintid": localStorage.getItem("SelectedIntuitionId"),
          "solComments": document.getElementById("Comments").value
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => response.json()).then((data) => {
        console.log("Data: ", data.NewSolutionLst);
        document.getElementById("Solution").value = "";
        document.getElementById("Comments").value = "";
        setMessage(data.Message);
        if (!(data.NewSolutionLst == null)) {
          setFetchedSolution(data.NewSolutionLst)
        } else {
          console.log("Already given Solution!");
        }
      });
    }

    return (
      <>

        <div className="solution">
          <div className="solution-form">
            {/* <Link className="home-header-back" to="/Employee/Dashboard">&#8592;</Link> */}
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='solution-title'>Intuitions solution</div>
            <Link className="home-header-home" to="/Employee/Dashboard/Feedback" >Click here to Give Feedback instead</Link>
            <div className="solution-menu-displaydata">
              {FetchedIntuitions.map(e => {
                return (<div className='solution-menu-content' key={e.intid}>
                  <label className='solution-menu-content-name'>{e.empname}</label>
                  <label className='solution-menu-content-brief' > {e.intBrief} </label>
                  <label className='solution-menu-content-desc'  >{e.intDesc}  </label>
                  <label className='solution-menu-content-status' >{e.StatusName}  </label>
                  <label className='solution-menu-content-posted' >Posted on: &nbsp;{e.intDate},&nbsp;{e.intTime}  </label>
                  <label className='solution-menu-content-tags'>{e.intTags.split(" ").map((el, key) => {
                    return <label className='solution-menu-content-tags-tag' key={key}>{el}</label>
                  })}  </label>
                  {e.intRecognized === "true" &&
                    <label className='solution-menu-content-recognized' >Recognized </label>}

                  {/* <div className="feedback-menu-feedback">
                    <button id={e.intid} onClick={LikeIntuition} tooltip="Upvote"> <img onClick={LikeIntuition} id={e.intid} src={UpVoteIcon} /> 10 </button>
                    <button id={e.intid} onClick={FeedbackIntuition} tooltip="Feedback"> <img onClick={FeedbackIntuition} id={e.intid} src={FeedbackIcon} /></button>
                    <button id={e.intid} onClick={SolutionIntuition} tooltip="Solution"> <img onClick={SolutionIntuition} id={e.intid} src={SolutionIcon} /></button>
                    <button id={e.intid} onClick={ShareIntuition} tooltip="Share"> <img onClick={ShareIntuition} id={e.intid} src={ShareIcon} /></button>
                  </div> */}

                  <div className="solution-menu-content-feedback">
                    <textarea placeholder='Enter solution' id="Solution"></textarea>
                    <textarea placeholder='Enter other Comments' id="Comments"></textarea>
                    <button className='solution-menu-content-submit' onClick={SubmitSolution} id={e.intid}>  Submit Solution</button>
                  </div>
                  {FetchedSolution.map(ee => {
                    return <div className='solution-menu-content-feedbacks' key={ee.solid}>
                      <label className='solution-menu-content-feedbacks-name'> {ee.empName}</label>
                      <div>
                        <label className='solution-menu-content-feedbacks-solution'>Solution <br />&nbsp;&nbsp;&nbsp;&nbsp;{ee.Solution} </label>
                        <label className='solution-menu-content-feedbacks-comments'>Comments <br />&nbsp;&nbsp;&nbsp;&nbsp; {ee.solComments} </label>
                      </div>
                      <div className='solution-menu-content-feedbacks-actions'>
                        <button id={ee.solid} onClick={ApproveSolution} ><img  id={ee.solid} src={ApproveIcon} /></button>
                        <button id={ee.solid} onClick={RejectSolution}><img  id={ee.solid} src={RejectIcon} /></button>
                        <button id={ee.solid} onClick={LikeSolution}><img  id={ee.solid} src={UpVoteIcon} />10</button>

                        {/* {ee.solByempid.toString() === sessionStorage.getItem("sessionid").toString() && */}
                        <button id={ee.solid} onClick={DeleteSolution} ><img  id={ee.solid} src={DeleteIcon} /></button>
                        {/* } */}

                      </div>
                    </div>
                  })}

                </div>);



              })}

            </div>

          </div>

        </div>
        <center>{Message ? <span className='validators' style={{ visibility: "visible", background: "green", color: "white" }}>{Message}</span > : <span className='validators' style={{ visibility: "hidden" }}>#</span >}</center>
        {/* <div className="popup-box">
          </div> */}
        <EmployeeHeader></EmployeeHeader>
      </>
    );
  } else {
    window.location.href = "http://localhost:3000/Login";
  }
}

export default Solution;
