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

  var fetchSolution = `SELECT S.solid,S.Solution,S.solComments,S.solApproved,E.empName FROM Solutions S INNER JOIN Employees E on E.empid=S.solByempid WHERE S.solForintid =  ${req.params.id}`

  con.query(fetchIntuition, function (err1, IntuitionsLst) {
    if (err1) throw err1;

    con.query(fetchSolution, function (err2, SolutionLst) {
      if (err2) throw err2;
      res.json({ IntuitionsLst: IntuitionsLst, SolutionLst: SolutionLst })
      res.end();
    })
  })

  con.on('error', function () {
    con.end();
  });

});

router.post('/', (req, res, next) => {

  if (`${req.body.reqtype}` == "Solution") {
    console.log("under solution")
    if (`${req.body.Solution}` && `${req.body.solByempid}` && `${req.body.solForintid}` && `${req.body.solComments}`) {

      var SolutionVerify = `SELECT count(solid) as getCount FROM Solutions WHERE solByempid = ${req.body.solByempid} AND solForintid = ${req.body.solForintid}`
      var SolutionForIntuition = `INSERT INTO Solutions (Solution, solByempid,solForintid,solComments,solStatusId) VALUES ("${req.body.Solution}",${req.body.solByempid},${req.body.solForintid},"${req.body.solComments}",(SELECT stsId FROM IntuitionStatus WHERE StatusName = "New Solution"))`
      var fetchSolution = `SELECT S.solid,S.Solution,S.solComments,S.solApproved,S.solReviewedByempid,E.empName FROM Solutions S INNER JOIN Employees E on E.empid=S.solByempid WHERE S.solForintid =  ${req.body.solForintid}`

      con.query(SolutionVerify, function (err, result) {
        if (err) throw err;

        console.log("Solution Existance:", result[0].getCount)

        if (result[0].getCount == 0) {
          con.query(SolutionForIntuition, function (err1, result1) {
            if (err1) throw err1;
            console.log(result)

            con.query(fetchSolution, function (err2, result2) {
              if (err2) throw err2;
              console.log(result2);

              res.json({ affectedRows: 1, "Message": "Solution submitted!", "NewSolutionLst": result2 })
              res.end();
            })
          })
        } else {
          res.json({ affectedRows: 0, "Message": "Solution Already exists for this intuition!", "NewSolutionLst": null })
          res.end();
        }
      })
    } else {
      res.json({ affectedRows: 0, "Message": "Please enter all the correct details!", NewSolutionLst: null })
      res.end();
    }
  } else if (`${req.body.reqtype}` == "Like") {
    console.log("under like")
    if (`${req.body.upvoteSolid}` && `${req.body.upvoteByempid}` && `${req.body.upvoteSolIntId}`) {

      var LikeVerify = `SELECT count(upsid) as getCount FROM UpvoteForSolutions WHERE upvoteSolid = ${req.body.upvoteSolid} AND upvoteByempid = ${req.body.upvoteByempid}`;
      var AddLike = `INSERT INTO UpvoteForSolutions (upvoteSolid, upvoteByempid, upvoteSolIntId) VALUES ((SELECT solid FROM Solutions WHERE solid = ${req.body.upvoteSolid}),(SELECT empid FROM Employees WHERE empid = ${req.body.upvoteByempid}),${req.body.upvoteSolIntId})`
      var DeleteLike = `DELETE FROM UpvoteForSolutions WHERE upvoteSolid = ${req.body.upvoteSolid} AND upvoteByempid = ${req.body.upvoteByempid}`
      var fetchSolutionLikes = `SELECT count(upsid) as getLikes FROM UpvoteForSolutions WHERE upvoteSolid = ${req.body.upvoteSolid}`

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

  if (`${req.body.Approval}` === "true") {

    if (` "${req.body.solid}" "${req.body.solReviewedByempid}"` && `${req.body.solForintid}` && `${req.body.IntStatusName}` && `${req.body.SolStatusName}`) {

      // var getIntuition = `SELECT count(solForintid) as getIntuition FROM Solutions WHERE Solid = ${req.body.solid}`
      var UpdateIntuition = `UPDATE Intuitions SET intApprovedByEmpId = (SELECT empid FROM Employees WHERE empid = ${req.body.solReviewedByempid}), intStatusId = (SELECT stsId FROM IntuitionStatus where StatusName = "${req.body.IntStatusName}") WHERE intid = ${req.body.solForintid} `
      var UpdateSolution = `UPDATE Solutions SET solApproved = "true", solReviewedByempid =  ${req.body.solReviewedByempid}, solStatusId = (SELECT stsId FROM IntuitionStatus where StatusName = "${req.body.SolStatusName}") WHERE solid = ${req.body.solid}`

      console.log("mySQL: " + UpdateSolution);
      console.log("mySQL: " + UpdateIntuition);
      con.query(UpdateSolution, function (Solerr1, Solresult) {
        if (Solerr1) throw Solerr1;

        con.query(UpdateIntuition, function (Interr, Intresult) {
          if (Interr) throw Interr;

          console.log("Approved successfully. - DHYEY")
          res.json({ "Updated": true, "Message": "Approved" })
          res.end();

        })

      })

    } else {
      res.json({ Message: "ALERT! Action reverted." })
      res.end();
    }
  } else if (`${req.body.Rejection}` === "true") {

    if (` "${req.body.solid}" "${req.body.solReviewedByempid}"` && `${req.body.solForintid}` && `${req.body.SolStatusName}`) {

      var UpdateSolution = `UPDATE Solutions SET solApproved = "false", solReviewedByempid =  ${req.body.solReviewedByempid}, solStatusId = (SELECT stsId FROM IntuitionStatus where StatusName = "${req.body.SolStatusName}") WHERE solid = ${req.body.solid}`

      console.log("mySQL: " + UpdateSolution);

      con.query(UpdateSolution, function (Solerr1, Solresult) {
        if (Solerr1) throw Solerr1;

        console.log("Rejection successfully. - DHYEY")
        res.json({ "Updated": true, "Message": "Rejected" })
        res.end();

      })

    } else {
      res.json({ Message: "ALERT! Action reverted." })
      res.end();
    }
  }

});

router.delete('/', (req, res, next) => {

  if (`"${req.body.solByempid}"` && `"${req.body.solid}` && `"${req.body.solForintid}`) {

    //To insert the data in database
    var verifySolution = `SELECT COUNT(solid) as getCount FROM Solutions WHERE solid = ${req.body.solid} AND solByempid = ${req.body.solByempid} AND solForintid = ${req.body.solForintid} `
    var deleteLikes = `DELETE FROM UpvoteForSolutions WHERE upsid = ${req.body.solid}`
    var deleteSolution = `DELETE FROM Solutions WHERE solid = ${req.body.solid} AND solByempid = ${req.body.solByempid} AND solForintid = ${req.body.solForintid}`
    var fetchSolution = `SELECT S.solid,S.Solution,S.solComments,S.solApproved,E.empName FROM Solutions S INNER JOIN Employees E on E.empid=S.solByempid WHERE S.solForintid =  ${req.body.solForintid}`

    con.query(verifySolution, function (vferr, verifyResult) {
      if (vferr) throw vferr;

      if (verifyResult[0].getCount == 1) {

        con.query(deleteLikes, function (dlerr1, dlresult) {
          if (dlerr1) throw dlerr1;

          con.query(deleteSolution, function (err1, result) {
            if (err1) throw err1;

            con.query(fetchSolution, function (fferr, SolutionLst) {
              if (fferr) throw fferr;

              console.log("Solution deleted!")
              console.log(result.affectedRows)

              res.json({ "deleted": result.affectedRows, "Message": "Deleted", "flag": 1, "SolutionLst": SolutionLst })
              res.end();

            })

          })
        })

      } else {
        res.json({ "deleted": null, "Message": "Please Select your Solution Delete button", "flag": 0, "SolutionLst": null })
        res.end();
      }

    })

  } else {
    res.json({ "deleted": null, "Message": "Please Share Proper Details", "flag": 0, "SolutionLst": null })
    res.end();
  }

  con.on('error', function () {
    con.end();
  });
});
module.exports = router;
