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
router.get('/', function (req, res, next) {

  var fetchIntuition = `Select E.empid,E.empname,I.intid,I.intBrief,I.intTags,I.intDesc,I.intRecognized,I.intDate,I.intTime,S.StatusName
    from Employees E INNER JOIN Intuitions I on E.empid=I.intByEmpId INNER JOIN IntuitionStatus S on I.intStatusId = S.stsId`

  con.query(fetchIntuition, function (err1, IntuitionsLst) {
    if (err1) throw err1;

    let allFetch = false;
    for (let i = 0; i < IntuitionsLst.length; i++) {
      console.log(IntuitionsLst[i].intid)
      var fetchUpvotes = `SELECT COUNT(*) as getUpvotes FROM UpvoteForIntuitions WHERE upvoteIntuitionid = ${IntuitionsLst[i].intid}`
      con.query(fetchUpvotes, function (errFetchUpvote, UpvoteResult) {
        if (errFetchUpvote) throw errFetchUpvote;
        IntuitionsLst[i].TotalUpvotes = UpvoteResult[0].getUpvotes;
        console.log(IntuitionsLst[i])

        if (i == IntuitionsLst.length - 1) {
          allFetch = true;
        }
        if (allFetch) {
          res.json(IntuitionsLst)
          res.end();
        }
      })
    }
  })
  con.on('error', function () {
    con.end();
  });

});

router.post('/', (req, res, next) => {

  if (`${req.body.reqType}` == "UpVote") {
    console.log("HEre");

    var upvoteVerify = `SELECT count(upiId) as getCount FROM UpvoteForIntuitions WHERE upvoteIntuitionid = ${req.body.upvoteIntuitionid} AND upvoteByempid = ${req.body.upvoteByempid}`
    var upvoteForIntuition = `INSERT INTO UpvoteForIntuitions (upvoteIntuitionid, upvoteByempid) VALUES (${req.body.upvoteIntuitionid},${req.body.upvoteByempid})`
    var DeleteLike = `DELETE FROM UpvoteForIntuitions WHERE upvoteIntuitionid = ${req.body.upvoteIntuitionid} AND upvoteByempid = ${req.body.upvoteByempid}`
    var fetchIntuitionLikes = `SELECT count(upiId) as getLikes FROM UpvoteForIntuitions WHERE upvoteIntuitionid = ${req.body.upvoteIntuitionid}`

    con.query(upvoteVerify, function (err, result) {
      if (err) throw err;
      console.log(result[0].getCount)

      if (result[0].getCount == 0) {
        con.query(upvoteForIntuition, function (err1, result1) {
          if (err1) throw err1;

          con.query(fetchIntuitionLikes, function (fILerr, getIntuitionLikes) {
            if (fILerr) throw fILerr;
            console.log("dhyey", getIntuitionLikes[0].getLikes)
            res.json({ affectedRows: 1, Message: "Liked!", "getIntuitionLikes": getIntuitionLikes })
            res.end();
          })
        })
      }
      else if (result[0].getCount == 1) {
        con.query(DeleteLike, function (dlerr1, deleteResult1) {
          if (dlerr1) throw dlerr1;

          con.query(fetchIntuitionLikes, function (fILerr, getIntuitionLikes) {
            if (fILerr) throw fILerr;

            res.json({ affectedRows: 0, Message: "UnLiked!", "getIntuitionLikes": getIntuitionLikes })
            res.end();

          })
        })
      }
    })
  }

  con.on('error', function () {
    con.end();
  });
});

router.put('/', (req, res, next) => {

});

module.exports = router;
