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

});

//post method accepts 1. empGUID and 2. empPassword
router.post('/', (req, res, next) => {

  //fetching current date and time
  let date = new Date();
  date.getDate();
  console.log(date)
  //dd-mm-yyyy
  let intuitionDate = (("0" + date.getDate()).slice(-2)) + "/" + (("0" + (date.getMonth() + 1)).slice(-2)) + "/" + date.getFullYear();
  let intuitionTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  date = date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2)) + "-" + (("0" + date.getDate()).slice(-2)) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  console.log(date);
  console.log(intuitionDate, intuitionTime);

  if (`"${req.body.intBrief}"` && `"${req.body.intTags}"` && `"${req.body.intDesc}"` && `"${req.body.intByEmpId}"`) {
    // 
    var sql = `INSERT INTO Intuitions 
      (intBrief, intTags, intDesc, intByEmpId, intStatusId, intRecognized, intDate, intTime, intTimeSpan) 
      VALUES (
        "${req.body.intBrief}", 
        "${req.body.intTags}", 
        "${req.body.intDesc}",
        (SELECT empid from Employees WHERE empid = ${req.body.intByEmpId}),
        (SELECT stsId from IntuitionStatus WHERE StatusName = "New Post"), 
        "false",
        "${intuitionDate}",
        "${intuitionTime}",
        "${date}"
       )`;

    console.log("Running:" + sql);
    con.query(sql, (errSelect, result) => {
      if (errSelect) throw errSelect;
      console.log(result);

      res.json({ affectedRows: result.affectedRows, Message: "Post submitted successfully!", Posted: true })
      res.end();

    });

  } else {
    res.json({ affectedRows: result.affectedRows, Message: "Need all the Details", Posted: false })
    res.end();
  }
});

module.exports = router;
