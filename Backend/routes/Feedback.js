var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  user: "dhypatel",
  password: "password",
  database: "intuitionStack"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

/* GET home page. */
router.get('/:id', function (req, res, next) {

  var fetchIntuition = `Select E.empname,I.intid,I.intBrief,I.intTags,I.intDesc,I.intDate,I.intTime,I.intRecognized,S.StatusName 
    from Employees E INNER JOIN Intuitions I on E.empid=I.intByEmpId INNER JOIN IntuitionStatus S on I.intStatusId = S.stsId WHERE I.intid= ${req.params.id}`

  // var fetchFeedback = `SELECT E.empName,F.feedbackComments FROM Employees E INNER JOIN .empid=F.feedbackByempid`
  var fetchFeedback = `SELECT F.feedbackid,F.feedbackByempid,F.feedbackComments,E.empName FROM Feedbacks F INNER JOIN Employees E on E.empid=F.feedbackByempid WHERE F.feedbackIntId = ${req.params.id}`


  con.query(fetchIntuition, function (err1, IntuitionsLst) {
    if (err1) throw err1;

    con.query(fetchFeedback, function (err2, FeedbackLst) {
      if (err2) throw err2;

      // let allFetch = false;
      // for(let i = 0; i < FeedbackLst.length; i++ ){
      //   console.log(FeedbackLst[i].feedbackid)
      //   var fetchUpvotes = `SELECT COUNT(*) as getUpvotes FROM UpvoteForFeedbacks WHERE upvoteFIntId = ${FeedbackLst[i].feedbackid}`
      //   console.log(fetchUpvotes)
      //   con.query(fetchUpvotes, function (errFetchUpvote, UpvoteResult) {
      //     if (errFetchUpvote) throw errFetchUpvote;
      //     FeedbackLst[i].TotalUpvotes = UpvoteResult[0].getUpvotes;
      //     console.log(FeedbackLst[i])
      //     // 
      //     if( i == FeedbackLst.length -1){
      //       allFetch = true;
      //     }
      //     if(allFetch){
      //       res.json({"IntuitionsLst": IntuitionsLst, "FeedbackLst":FeedbackLst})
      //       res.end();
      //       // res.json(FeedbackLst)
      //       // res.end();
      //     }
      //   })
      // }

      res.json({ IntuitionsLst: IntuitionsLst, FeedbackLst: FeedbackLst })
      res.end();
    })
  })

  con.on('error', function () {
    con.end();
  });

});

router.post('/', (req, res, next) => {

  if (`${req.body.reqtype}` == "Feedback") {
    console.log("under Feedback")
    if (`${req.body.feedbackByempid}` && `${req.body.feedbackIntId}` && `${req.body.feedbackComments}`) {

      // var FeedbackVerify = `SELECT count(feedbackid) as getCount FROM Feedbacks WHERE feedbackByempid = ${req.body.feedbackByempid} AND feedbackIntId = ${req.body.feedbackIntId}`
      var FeedbackForIntuition = `INSERT INTO Feedbacks (feedbackByempid, feedbackIntId,feedbackComments) VALUES (${req.body.feedbackByempid},${req.body.feedbackIntId},"${req.body.feedbackComments}")`
      // var FetchFeedback = `SELECT feedbackComments FROM Feedbacks WHERE feedbackIntId = ${req.body.feedbackIntId}`
      var fetchFeedback = `SELECT F.feedbackid,F.feedbackByempid,F.feedbackComments,E.empName FROM Feedbacks F INNER JOIN Employees E on E.empid=F.feedbackByempid WHERE F.feedbackIntId =  ${req.body.feedbackIntId}`

      con.query(FeedbackForIntuition, function (err1, result1) {
        if (err1) throw err1;
        console.log(result1)

        con.query(fetchFeedback, function (err2, result2) {
          if (err2) throw err2;
          console.log(result2[0].feedbackComments);

          res.json({ affectedRows: 1, "Message": "Feedback submitted!", "newFeedbackLst": result2 })
          res.end();
        })
      })
    } else {
      res.json({ affectedRows: 0, "Message": "Please enter all the correct details!", "newFeedbackLst": null })
      res.end();
    }
  } else if (`${req.body.reqtype}` == "Like") {
    console.log("under like")

    if (`${req.body.upvoteFid}` && `${req.body.upvoteByempid}` && `${req.body.upvoteFIntId}`) {

      var LikeVerify = `SELECT count(Fid) as getCount FROM UpvoteForFeedbacks WHERE upvoteFid = ${req.body.upvoteFid} AND upvoteByempid = ${req.body.upvoteByempid}`;
      var AddLike = `INSERT INTO UpvoteForFeedbacks (upvoteFid, upvoteByempid, upvoteFIntId) VALUES ((SELECT feedbackid FROM Feedbacks WHERE feedbackid = ${req.body.upvoteFid}),(SELECT empid FROM Employees WHERE empid = ${req.body.upvoteByempid}),${req.body.upvoteFIntId})`
      var DeleteLike = `DELETE FROM UpvoteForFeedbacks WHERE upvoteFid = ${req.body.upvoteFid} AND upvoteByempid = ${req.body.upvoteByempid}`
      var fetchSolutionLikes = `SELECT count(Fid) as getLikes FROM UpvoteForFeedbacks WHERE upvoteFid = ${req.body.upvoteFid}`

      console.log(LikeVerify)
      console.log(AddLike)
      console.log(DeleteLike)
      console.log(fetchSolutionLikes)

      con.query(LikeVerify, function (LVerr, LikeVerifyResult) {
        if (LVerr) throw LVerr;

        if (LikeVerifyResult[0].getCount == 0) {
          con.query(AddLike, function (ALerr, AddLikeResult) {
            if (ALerr) throw ALerr;

            con.query(fetchSolutionLikes, function (FSLerr, getTotalLikes) {
              if (FSLerr) throw FSLerr;

              res.json({ Liked: 1, "Message": "Liked!", "getTotalLikes": getTotalLikes })
            })

          })
        } else if (LikeVerifyResult[0].getCount == 1) {
          con.query(DeleteLike, function (DLerr, DeleteLikeResult) {
            if (DLerr) throw DLerr;

            con.query(fetchSolutionLikes, function (FSLerr, getTotalLikes) {
              if (FSLerr) throw FSLerr;

              res.json({ Liked: 0, "Message": "UnLiked!", "getTotalLikes": getTotalLikes })
            })

          })
        }
      })
    }
  }

  con.on('error', function () {
    con.end();
  });

});

router.put('/', (req, res, next) => {
});

router.delete('/', (req, res, next) => {

  if (`"${req.body.feedbackByempid}"` && `"${req.body.feedbackid}` && `"${req.body.feedbackIntId}`) {

    //To insert the data in database
    var verifyFeedback = `SELECT COUNT(feedbackid) as getCount FROM Feedbacks WHERE feedbackid = ${req.body.feedbackid} AND feedbackByempid = ${req.body.feedbackByempid} AND feedbackIntId = ${req.body.feedbackIntId} `
    var deleteLikes = `DELETE FROM UpvoteForFeedbacks WHERE upvoteFid = ${req.body.feedbackid}`
    var deleteFeedback = `DELETE FROM Feedbacks WHERE feedbackid = ${req.body.feedbackid} AND feedbackByempid = ${req.body.feedbackByempid} AND feedbackIntId = ${req.body.feedbackIntId}`
    var fetchFeedback = `SELECT F.feedbackid,F.feedbackByempid,F.feedbackComments,E.empName FROM Feedbacks F INNER JOIN Employees E on E.empid=F.feedbackByempid WHERE F.feedbackIntId = ${req.body.feedbackIntId}`

    con.query(verifyFeedback, function (vferr, verifyResult) {
      if (vferr) throw vferr;

      if (verifyResult[0].getCount == 1) {

        con.query(deleteLikes, function (dlerr1, dlresult) {
          if (dlerr1) throw dlerr1;

          con.query(deleteFeedback, function (err1, result) {
            if (err1) throw err1;

            con.query(fetchFeedback, function (fferr, FeedbackLst) {
              if (fferr) throw fferr;

              console.log("Feedback deleted!")
              console.log(result.affectedRows)

              res.json({ "deleted": result.affectedRows, "Message": "Deleted", "flag": 1, "FeedbackLst": FeedbackLst })
              res.end();

            })

          })
        })

      } else {
        res.json({ "deleted": null, "Message": "Please Select your Feedback Delete button", "flag": 0, "FeedbackLst": null })
        res.end();
      }

    })

  } else {
    res.json({ "deleted": null, "Message": "Please Share Proper Details", "flag": 0, "FeedbackLst": null })
    res.end();
  }

  con.on('error', function () {
    con.end();
  });

});

module.exports = router;
