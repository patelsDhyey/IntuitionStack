import './css/Feedback.css';
import EmployeeHeader from './EmployeeHeader';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import UpdateIcon from './css/update.svg'
import DeleteIcon from './css/delete.svg'
import UpVoteIcon from './css/upvote.svg'


function Feedback() {

  const [FetchedIntuitions, setFetchedIntuitions] = useState([]);
  const [FetchedFeedback, setFetchedFeedback] = useState([]);

  const [Message, setMessage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/Dashboard/Feedback/${localStorage.getItem("SelectedIntuitionId")}`).then((response) => response.json()).then((data) => {
      setFetchedIntuitions(data.IntuitionsLst);
      setFetchedFeedback(data.FeedbackLst)
      console.log("Fetched Feedback", data.FeedbackLst)
    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function UpdateFeedBack() {

    }

    function DeleteFeedback(e) {

      if (window.confirm("Please note! You are aboute to delete ")) {

        fetch("http://localhost:3001/Dashboard/Feedback", {
          method: "DELETE",
          body: JSON.stringify({
            "feedbackByempid": sessionStorage.getItem("sessionid"),
            "feedbackid": e.target.id,
            "feedbackIntId": localStorage.getItem("SelectedIntuitionId")
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }

        }).then((response) => response.json()).then((data) => {
          console.log("Data")
          console.log(data);

          if (data.flag === 1) {
            setMessage(data.Message);
            setFetchedFeedback(data.FeedbackLst)
          } else {
            console.log(data.Message);
            setMessage(data.Message);
          }
        })
      }
    }

    function LikeFeedback(e) {
      console.log(e.target.id)
      fetch("http://localhost:3001/Dashboard/Feedback", {
        method: "POST",
        body: JSON.stringify({
          "reqtype": "Like",
          "upvoteFid": e.target.id,
          "upvoteByempid": sessionStorage.getItem("sessionid"),
          "upvoteFIntId": localStorage.getItem("SelectedIntuitionId")
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

    function SubmitFeedback(e) {

      console.log("Session ID", sessionStorage.getItem("sessionid"))
      console.log("Intuition ID", localStorage.getItem("SelectedIntuitionId"))
      console.log("Comments: ", document.getElementById("FedbackComments").value)

      console.log(e.target.id)
      fetch("http://localhost:3001/Dashboard/Feedback", {
        method: "POST",
        body: JSON.stringify({
          "reqtype": "Feedback",
          "feedbackByempid": sessionStorage.getItem("sessionid"),
          "feedbackIntId": localStorage.getItem("SelectedIntuitionId"),
          "feedbackComments": document.getElementById("FedbackComments").value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => response.json()).then((data) => {
        console.log("Data: ", data.newFeedbackLst);
        document.getElementById("FedbackComments").value = "";
        setMessage(data.Message);
        if (!(data.newFeedbackLst == null)) {
          setFetchedFeedback(data.newFeedbackLst)
        } else {
          console.log("Already given Feedback!");
        }
      });
    }

    return (
      <>

        <div className="feedback">
          <div className="feedback-form">
            {/* <Link className="home-header-back" to="/Employee/Dashboard">&#8592;</Link>	 */}
            <div className="home-header-back" onClick={FireBack}>&#8592;</div>
            <div className='feedback-title'>Intuitions Feedback</div>
            <Link className="home-header-home" to="/Employee/Dashboard/Solution" >Click here to Give Solution instead</Link>
            <div className="feedback-menu-displaydata">
              {FetchedIntuitions.map(e => {
                return (<div className='feedback-menu-content' key={e.intid}>
                  <label className='feedback-menu-content-name'>{e.empname}</label>
                  <label className='feedback-menu-content-brief' > {e.intBrief} </label>
                  <label className='feedback-menu-content-desc'  >{e.intDesc}  </label>
                  <label className='feedback-menu-content-status' >{e.StatusName}  </label>
                  <label className='feedback-menu-content-posted' >Posted on: &nbsp;{e.intDate},&nbsp;{e.intTime}  </label>
                  <label className='feedback-menu-content-tags'>{e.intTags.split(" ").map((el, key) => {
                    return <label className='feedback-menu-content-tags-tag' key={key}>{el}</label>
                  })}  </label>
                  {e.intRecognized === "true" &&
                    <label className='feedback-menu-content-recognized' >Recognized </label>}

                  {/* <div className="feedback-menu-feedback">
                    <button id={e.intid} onClick={LikeIntuition} tooltip="Upvote"> <img onClick={LikeIntuition} id={e.intid} src={UpVoteIcon} /> 10 </button>
                    <button id={e.intid} onClick={FeedbackIntuition} tooltip="Feedback"> <img onClick={FeedbackIntuition} id={e.intid} src={FeedbackIcon} /></button>
                    <button id={e.intid} onClick={SolutionIntuition} tooltip="Solution"> <img onClick={SolutionIntuition} id={e.intid} src={SolutionIcon} /></button>
                    <button id={e.intid} onClick={ShareIntuition} tooltip="Share"> <img onClick={ShareIntuition} id={e.intid} src={ShareIcon} /></button>
                  </div> */}

                  <div className="feedback-menu-content-feedback">


                    <textarea placeholder='Enter Feedback' id="FedbackComments"></textarea>
                    <button className='feedback-menu-content-submit' onClick={SubmitFeedback} id={e.intid}> Submit Feedback </button>
                  </div>
                  {FetchedFeedback.map(ee => {
                    return <div className='feedback-menu-content-feedbacks' key={ee.feedbackid}>
                      <label className='feedback-menu-content-feedbacks-name'> {ee.empName}</label>
                      <label className='feedback-menu-content-feedbacks-comments'> {ee.feedbackComments} </label>
                      <div className='feedback-menu-content-feedbacks-actions'>
                        <button id={ee.feedbackid} onClick={LikeFeedback}><img  id={ee.feedbackid} src={UpVoteIcon} /> <span id={`My${ee.feedbackid}`}> 10 {e.TotalUpvotes} </span> </button>
                        {/* {ee.feedbackByempid.toString() === sessionStorage.getItem("sessionid").toString() &&
                            <button  id={ee.feedbackid} onClick={UpdateFeedBack}> <img onClick={UpdateFeedBack} id={ee.feedbackid} src={UpdateIcon} /></button>
                            } */}
                        {ee.feedbackByempid.toString() === sessionStorage.getItem("sessionid").toString() &&
                          <button id={ee.feedbackid} onClick={DeleteFeedback} > <img  id={ee.feedbackid} src={DeleteIcon} /></button>
                        }
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

export default Feedback;
