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

  var fetchIntuition = `SELECT empid,empname FROM Employees`

  con.query(fetchIntuition, function (err1, EmployeeLst) {
    if (err1) throw err1;
    res.json(EmployeeLst)
    res.end();
  })

  con.on('error', function () {
    con.end();
  });

});

router.post('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});



module.exports = router;
