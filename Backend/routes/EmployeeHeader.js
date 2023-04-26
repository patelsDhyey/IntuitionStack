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

  var GlobalFetchEmployee = `SELECT empid,empname FROM Employees`
  var GlobalFetchIntuition = `SELECT intid,intBrief, intTags FROM Intuitions`
  var GlobalFetchSolution = `SELECT solid,Solution,solComments FROM Solutions`
  var GlobalFetchFeedback = `SELECT feedbackid,feedbackComments FROM Feedbacks`

  con.query(GlobalFetchEmployee, function (errGFE, GlobalFetchEmployeeLst) {
    if (errGFE) throw errGFE;

    con.query(GlobalFetchIntuition, function (errGFI, GlobalFetchIntuitionLst) {
      if (errGFI) throw errGFI;

      con.query(GlobalFetchSolution, function (errGFS, GlobalFetchSolutionLst) {
        if (errGFS) throw errGFS;

        con.query(GlobalFetchFeedback, function (errGFF, GlobalFetchFeedbackLst) {
          if (errGFF) throw errGFF;

          res.json({ "GlobalFetchEmployeeLst": GlobalFetchEmployeeLst, "GlobalFetchIntuitionLst": GlobalFetchIntuitionLst, "GlobalFetchSolutionLst": GlobalFetchSolutionLst, "GlobalFetchFeedbackLst": GlobalFetchFeedbackLst })
          res.end();
        })

      })

    })

  })

  con.on('error', function () {
    con.end();
  });

});

router.post('/', (req, res, next) => {
});

router.put('/', (req, res, next) => {

});

module.exports = router;
