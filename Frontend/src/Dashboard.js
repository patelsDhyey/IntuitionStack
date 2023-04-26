import './css/Dashboard.css';
import ShareIcon from './css/share.svg'
import FeedbackIcon from './css/feedback.svg'
import SolutionIcon from './css/solution.svg'
import UpVoteIcon from './css/upvote.svg'
import EmployeeHeader from './EmployeeHeader';
import React, { useState, useEffect } from 'react'


function Dashboard() {


  const [FetchedIntuitions, setFetchedIntuitions] = useState([]);


  useEffect(() => {
    fetch("http://localhost:3001/Dashboard").then((response) => response.json()).then((data) => {
      console.log("Check: ", data)
      setFetchedIntuitions(data);

    })
  }, [])

  if (!(sessionStorage.getItem("sessionkey") === null)) {

    function FeedbackIntuition(e) {
      console.log("Dhyey", e.target.id);
      localStorage.setItem("SelectedIntuitionId", e.target.id);
      window.location.href = "http://localhost:3000/Employee/Dashboard/Feedback/";
    }

    function SolutionIntuition(e) {
      localStorage.setItem(`SelectedIntuitionId`, e.target.id);
      window.location.href = "http://localhost:3000/Employee/Dashboard/Solution/";
    }

    function LikeIntuition(e) {
      console.log("Like Intuition")
      let a = e.target.id;
      console.log(e.target.id)
      fetch("http://localhost:3001/Dashboard", {
        method: "POST",
        body: JSON.stringify({
          "reqType": "UpVote",
          "upvoteIntuitionid": a,
          "upvoteByempid": sessionStorage.getItem("sessionid")
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }

      }).then((response) => response.json()).then((data) => {
        console.log("Data")
        console.log(data.getIntuitionLikes[0].getLikes);
        document.getElementById("My" + a).innerHTML = data.getIntuitionLikes[0].getLikes;
        //HERE TO UPDATE NEW LIKES COUNT FROM "data.getIntuitionLikes[0]"; -- BUT THE VALUE TYPE IS OBJECT NEED TO CONVERT TO STRING
      });
    }
    // SHARE FEATURE STARTS
    // function ShareIntuition(){

    // }
    // var doc = new jsPDF();

    // function saveDiv(divId, title) {
    // doc.fromHTML(`<html><head><title>${title}</title></head><body>` + document.getElementById(divId).innerHTML + `</body></html>`);
    // doc.save('div.pdf');
    // }

    function printDiv(divId,
      title) {

      let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

      mywindow.document.write(`<html><head><title>${title}</title>`);
      mywindow.document.write('</head><body >');
      mywindow.document.write(document.getElementById(divId).innerHTML);
      mywindow.document.write('</body></html>');

      mywindow.document.close(); // necessary for IE >= 10
      mywindow.focus(); // necessary for IE >= 10*/

      mywindow.print();
      mywindow.close();

      return true;
    }

    // SHARE FEATURE ENDS


    return (
      <>

        <div className="dashboard">
          <div className="dashboard-form">
            <div className='dashboard-title'>Intuition Stack</div>
            <div className="dashboard-menu-displaydata" id="Print">

              {FetchedIntuitions.map(e => {
                return (<div className='dashboard-content' key={e.intid} id={e.intid}>
                  <label className='dashboard-content-name'>{e.empname}</label>
                  <label className='dashboard-content-brief' >  {e.intBrief}  </label>
                  <label className='dashboard-content-desc'  >{e.intDesc}  </label>
                  <label className='dashboard-content-status' >{e.StatusName}  </label>
                  <label className='dashboard-content-posted' >Posted on: &nbsp;{e.intDate},&nbsp;{e.intTime}  </label>
                  <label className='dashboard-content-tags'>{e.intTags.split(" ").map((el, key) => {
                    return <label className='dashboard-content-tags-tag' key={`i${key}`}>{el}</label>
                  })}  </label>
                  {e.intRecognized === "true" &&
                    <label className='dashboard-content-recognized' >Recognized </label>}

                  <div className="dashboard-menu-feedback">
                    <button id={e.intid} tooltip="Upvote" onClick={LikeIntuition}> <img id={e.intid} src={UpVoteIcon}  /> <span id={`My${e.intid}`}> {e.TotalUpvotes} </span> </button>
                    <button id={e.intid} onClick={FeedbackIntuition} tooltip="Feedback"> <img id={e.intid} src={FeedbackIcon} /></button>
                    <button id={e.intid} onClick={SolutionIntuition} tooltip="Solution"> <img id={e.intid} src={SolutionIcon} /></button>
                    <button id={e.intid} onClick={printDiv} tooltip="Share"> <img id={e.intid} src={ShareIcon} /></button>
                  </div>

                </div>);
                
              })}

            </div>
          </div>

        </div>
        {/* <div className="popup-box">
          </div> */}
        <EmployeeHeader></EmployeeHeader>
      </>
    );
  } else {
    window.location.href = "http://localhost:3000/Login";
  }
}

export default Dashboard;
