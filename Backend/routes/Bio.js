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

  var fetchDesignation = `SELECT * FROM Designations;`
  var fetchLocation = `SELECT * FROM Locations;`
  var fetchBioDetails = `SELECT * FROM Employees INNER JOIN Locations ON Lid = empLocationId INNER JOIN Designations ON desid = empDesignationId WHERE empid = ${req.params.id}`

  con.query(fetchDesignation, function (err1, DesignationLst) {
    if (err1) throw err1;

    con.query(fetchLocation, function (err2, LocationLst) {
      if (err2) throw err2;

      con.query(fetchBioDetails, function (err3, BioLst){
        if (err3) throw err3;

        res.json({ "DesignationList": DesignationLst, "LocationList": LocationLst, "BioLst": BioLst })
        res.end();

      })
    })
  })

  con.on('error', function () {
    con.end();
  });
});

//post method accepts 1. empGUID and 2. empPassword
router.put('/', (req, res, next) => {
});

module.exports = router;
