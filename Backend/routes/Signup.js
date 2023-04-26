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

  var fetchDesignation = `SELECT * FROM Designations;`
  var fetchLocation = `SELECT * FROM Locations;`

  con.query(fetchDesignation, function (err1, DesignationLst) {
    if (err1) throw err1;

    con.query(fetchLocation, function (err2, LocationLst) {
      if (err2) throw err2;

      res.json({ DesignationList: DesignationLst, LocationList: LocationLst })
      res.end();
    })
  })

  con.on('error', function () {
    con.end();
  });
});

//post method accepts 1. empGUID and 2. empPassword
router.post('/', (req, res, next) => {

  if (`"${req.body.empPassword}"` == `"${req.body.ConfirmPassword}"`) {
    if (`"${req.body.empPassword}"`)

      //To display the record
      var select = `SELECT * FROM Employees`
    con.query(select, (errSelect, result) => {
      if (errSelect) throw errSelect;
      console.log(result);

      //To insert the data in database

      var GetUserifExists = `SELECT COUNT(empEmail) AS getCount FROM Employees WHERE empEmail = "${req.body.empEmail}" `
      con.query(GetUserifExists, (errUser, resultcount) => {
        if (errUser) throw errUser;
        console.log(resultcount[0].getCount);

        if (resultcount[0].getCount == 0) {

          var sql = `INSERT INTO Employees (empname, empGUID, empEmail, empPhone, empPassword, empDesignationId, empAddress, empLocationId) VALUES ("${req.body.empname}","${req.body.empGUID}","${req.body.empEmail}",${req.body.empPhone},"${req.body.empPassword}",${req.body.empDesignation},"${req.body.empAddress}",${req.body.empLocation})`

          console.log("mySQL: " + sql);
          con.query(sql, function (err1, result) {
            if (err1) throw err1;
            console.log("Table Updated!")

            console.log(result.affectedRows)
            res.json({ affectedRows: result.affectedRows, session: true, Message: null })
            res.end();
          })
        } else {
          res.json({ affectedRows: 0, session: false, Message: "Looks like Email id already registered!" })
          res.end();
        }

      });
    });

  } else {
    res.json({ affectedRows: 0, session: false, Message: "Please give password and confirm password same!" })
    res.end();
  }

});

module.exports = router;
