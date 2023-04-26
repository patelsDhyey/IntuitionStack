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

  var fetchStatus = `SELECT * FROM IntuitionStatus;`

  con.query(fetchStatus, function (err1, statusLst) {
    if (err1) throw err1;
    // console.log(statusLst)
    res.json(statusLst)
    res.end();
  })

  con.on('error', function () {
    con.end();
  });
});

//create method accepts Status Code name
router.post('/', (req, res, next) => {

  if (`"${req.body.StatusName}"`) {

    //To insert the data in database
    var sql = `INSERT INTO IntuitionStatus (StatusName) VALUES ("${req.body.StatusName}")`
    var fetchStatus = `SELECT * FROM IntuitionStatus;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log("Status Code inserted!")
      console.log(result.affectedRows)

      con.query(fetchStatus, function (err2, statusLst) {
        if (err2) throw err2;
        console.log(statusLst)
        res.json({ affectedRows: result.affectedRows, Message: "Status Code with name " + `${req.body.StatusName}` + " got added", newList: statusLst })
        res.end();
      })

    })

  } else {
    res.json({ affectedRows: 0, Message: "Please Enter Status Code Name!" })
    res.end();
  }

  con.on('error', function () {
    con.end();
  });

});

//update method accepts Status Code name
router.put('/', (req, res, next) => {

  if (`"${req.body.stsId}"` && `${req.body.StatusName}` && `${req.body.oldStatusName}`) {

    var sql = `UPDATE IntuitionStatus SET StatusName = "${req.body.StatusName}" WHERE stsId = ${req.body.stsId} AND StatusName = "${req.body.oldStatusName}" `
    var fetchStatus = `SELECT * FROM IntuitionStatus;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log(`Status Code updated! ${req.body.StatusName} `);

      con.query(fetchStatus, function (err2, statusLst) {
        if (err2) throw err2;
        console.log(statusLst)
        res.json({ Updated: result.affectedRows, Message: "Status Code with name " + `${req.body.StatusName}` + " got Updated", newList: statusLst })
        res.end();
      })

    })

  }

});

//delete method accepts Status Code name
router.delete('/', (req, res, next) => {

  if (`"${req.body.stsId}"` && `"${req.body.StatusName}`) {

    //To insert the data in database
    var sql = `DELETE FROM IntuitionStatus WHERE stsId = ${req.body.stsId} AND StatusName = "${req.body.StatusName}"`
    var fetchStatus = `SELECT * FROM IntuitionStatus;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log("Status Code deleted!")
      console.log(result.affectedRows)

      con.query(fetchStatus, function (err2, statusLst) {
        if (err2) throw err2;
        console.log(statusLst)
        res.json({ deleted: result.affectedRows, Message: "Status Code with name " + `${req.body.StatusName}` + " got Deleted", newList: statusLst })
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
