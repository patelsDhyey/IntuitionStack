const e = require('express');
const { json } = require('express');
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

/* GET users listing. */
router.get('/', function (req, res, next) {

});

//post method accepts 1. empGUID and 2. empPassword
router.post('/', (req, res, next) => {

  //SQL statements
  var sql = `SELECT COUNT(empEmail) AS getCount,empname,empid FROM Employees WHERE binary empEmail = "${req.body.empEmail}" AND binary empPassword = "${req.body.empPassword}"`
  var getDesignationsql = `SELECT DesignationName FROM Designations WHERE desid IN (SELECT empDesignationId FROM Employees WHERE empEmail = "${req.body.empEmail}")`

  //executing validation query
  console.log("Query: " + sql);
  con.query(sql, function (err1, result) {
    if (err1) throw err1;

    if (result[0].getCount == 1) {

      con.query(getDesignationsql, function (err2, ResultDesignation) {
        if (err2) throw err2;

        //After validating id password fetching name for session; executing 2nd query
        // console.log("Session name:" + result[0]);
        // console.log("Designation " + ResultDesignation[0].DesignationName)

        res.json({ session: true, Message: null, sessionname: result[0].empname, sessionid: result[0].empid, designation: ResultDesignation[0].DesignationName })

      });

    } else if (result[0].getCount == 0) {
      res.json({ session: false, Message: "Wrong Email and Password! Please try again!", sessionname: null, sessionid: null, designation: null })
    } else {
      console.log("Default occur, Looks like you have multiple account please contact to Admin!");
      res.json({ session: false, Message: "Looks like you have multiple account please contact to Admin!", sessionname: null, sessionid: null, designation: null })
    }
  });

});

module.exports = router;
