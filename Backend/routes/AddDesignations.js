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
  var fetchCountry = `SELECT * FROM Designations;`

  con.query(fetchCountry, function (err1, DesignationLst) {
    if (err1) throw err1;
    // console.log(DesignationLst)
    res.json(DesignationLst)
    res.end();
  })

  con.on('error', function () {
    con.end();
  });
});

//create method accepts Designation name
router.post('/', (req, res, next) => {

  if (`"${req.body.designationName}"`) {

    //To insert the data in database
    var sql = `INSERT INTO Designations (DesignationName) VALUES ("${req.body.designationName}")`
    var fetchCountry = `SELECT * FROM Designations;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log("Designation inserted!")
      console.log(result.affectedRows)

      con.query(fetchCountry, function (err2, DesignationLst) {
        if (err2) throw err2;
        console.log(DesignationLst)
        res.json({ affectedRows: result.affectedRows, Message: "Designation with name " + `${req.body.designationName}` + " got added", newList: DesignationLst })
        res.end();
      })

    })

  } else {
    res.json({ affectedRows: 0, Message: "Please Enter Designation Name!" })
    res.end();
  }

  con.on('error', function () {
    con.end();
  });

});

//update method accepts Designation name
router.put('/', (req, res, next) => {

  if (`"${req.body.desid}"` && `${req.body.designationName}` && `${req.body.oldDesiName}`) {

    var sql = `UPDATE Designations SET DesignationName = "${req.body.designationName}" WHERE desid = ${req.body.desid} AND DesignationName = "${req.body.oldDesiName}" `
    var fetchCountry = `SELECT * FROM Designations;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log(`Designation updated! ${req.body.DesignationName} `);

      con.query(fetchCountry, function (err2, DesignationLst) {
        if (err2) throw err2;
        console.log(DesignationLst)
        res.json({ Updated: result.affectedRows, Message: "Designation with name " + `${req.body.DesignationName}` + " got Updated", newList: DesignationLst })
        res.end();
      })

    })

  }

});

//delete method accepts Designation name
router.delete('/', (req, res, next) => {

  if (`"${req.body.desid}"` && `"${req.body.designationName}`) {

    //To insert the data in database
    var sql = `DELETE FROM Designations WHERE desid = ${req.body.desid} AND DesignationName = "${req.body.designationName}"`
    var fetchCountry = `SELECT * FROM Designations;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log("Designation deleted!")
      console.log(result.affectedRows)

      con.query(fetchCountry, function (err2, DesignationLst) {
        if (err2) throw err2;
        console.log(DesignationLst)
        res.json({ deleted: result.affectedRows, Message: "Designation with name " + `${req.body.DesignationName}` + " got Deleted", newList: DesignationLst })
        res.end();
      })

    })

  } else {
    res.json({ deleted: 0, Message: "Please Share reference record!" })
    res.end();
  }

  con.on('error', function () {
    con.end();
  });

});

module.exports = router;
