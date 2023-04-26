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

  // var fetchIntuition = `SELECT * FROM Intuitions WHERE intByEmpId = ${req.params.id}`
  var fetchIntuition = `SELECT * FROM Intuitions INNER JOIN IntuitionStatus ON stsId = intStatusId WHERE intByEmpId = ${req.params.id}`

  con.query(fetchIntuition, function (err1, IntuitionsLst) {
    if (err1) throw err1;
    res.json(IntuitionsLst)
    res.end();
  })

  con.on('error', function () {
    con.end();
  });

});

router.post('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

  if (`"${req.body.intid}"` && `"${req.body.intByEmpId}"`) {

    //To insert the data in database
    var disable = `SET FOREIGN_KEY_CHECKS=0;`
    var deleteIntLikes = `DELETE FROM UpvoteForIntuitions WHERE upvoteIntuitionid = ${req.body.intid} `
    var deleteFeedbackLikes = `DELETE FROM UpvoteForFeedbacks WHERE upvoteFIntId = ${req.body.intid}`
    var deleteSolutionLikes = `DELETE FROM UpvoteForSolutions WHERE upvoteSolIntId = ${req.body.intid}`

    var deleteFeedback = `DELETE FROM Feedbacks WHERE feedbackIntId =  ${req.body.intid}`
    var deleteSolution = `DELETE FROM Solutions WHERE solForintid =  ${req.body.intid}`

    var deleteIntuition = `DELETE FROM Intuitions WHERE intid = ${req.body.intid} AND intByEmpID = ${req.body.intByEmpId}`
    var fetchIntuition = `SELECT * FROM Intuitions WHERE intByEmpID = ${req.body.intByEmpId};`

    var enable = `SET FOREIGN_KEY_CHECKS=1;`

    console.log("mySQL: " + deleteIntuition);

    con.query(disable, function (derr, dresult) {
      if (derr) throw derr;

      con.query(deleteIntLikes, function (dileer1, dilresult) {
        if (dileer1) throw dileer1;

        con.query(deleteFeedbackLikes, function (dflerr1, dflresult) {
          if (dflerr1) throw dflerr1;

          con.query(deleteSolutionLikes, function (dslerr1, dslresult) {
            if (dslerr1) throw dslerr1;

            con.query(deleteFeedback, function (dferr1, dfresult) {
              if (dferr1) throw dferr1;

              con.query(deleteSolution, function (dserr1, dsresult) {
                if (dserr1) throw dserr1;

                con.query(deleteIntuition, function (err1, result) {
                  if (err1) throw err1;

                  con.query(enable, function (eerr, eresult) {
                    if (eerr) throw eerr;

                    console.log("Intuition deleted!")
                    console.log(result.affectedRows)

                    con.query(fetchIntuition, function (err2, IntuitionLst) {
                      if (err2) throw err2;
                      console.log(IntuitionLst)
                      res.json({ deleted: result.affectedRows, Message: "Intuition got Deleted", newList: IntuitionLst })
                      res.end();
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  } else {
    res.json({ deleted: 0, Message: "Please Share proper reference record!" })
    res.end();
  }
  con.on('error', function () {
    con.end();
  });

});

module.exports = router;
