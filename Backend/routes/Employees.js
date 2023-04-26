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

  var fetchEmployee = `SELECT * FROM Employees WHERE empid = ${req.params.id}`
  var fetchIntuitions = `SELECT  * FROM Intuitions WHERE intByEmpId = ${req.params.id}`

  con.query(fetchEmployee, function (err1, EmployeeLst) {
    if (err1) throw err1;

    con.query(fetchIntuitions, function (errint, Intuitionslst) {
      if (errint) throw errint;
      res.json(EmployeeLst)
      res.end();
    })
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
