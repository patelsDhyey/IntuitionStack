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

  var fetchCountry = `SELECT * FROM LDG;`

  con.query(fetchCountry, function (err1, countryLst) {
    if (err1) throw err1;
    // console.log(countryLst)
    res.json(countryLst)
    res.end();
  })

  con.on('error', function () {
    con.end();
  });
});

//create method accepts Country name
router.post('/', (req, res, next) => {

  if (`"${req.body.countryName}"`) {

    //To insert the data in database
    var sql = `INSERT INTO LDG (LDGName) VALUES ("${req.body.countryName}")`
    var fetchCountry = `SELECT * FROM LDG;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log("Country inserted!")
      console.log(result.affectedRows)

      con.query(fetchCountry, function (err2, countryLst) {
        if (err2) throw err2;
        console.log(countryLst)
        res.json({ affectedRows: result.affectedRows, Message: "Country with name " + `${req.body.countryName}` + " got added", newList: countryLst })
        res.end();
      })

    })

  } else {
    res.json({ affectedRows: 0, Message: "Please Enter Country Name!" })
    res.end();
  }
  con.on('error', function () {
    con.end();
  });

});

//update method accepts Country name
router.put('/', (req, res, next) => {

  if (`"${req.body.LDGid}"` && `${req.body.LDGName}` && `${req.body.oldLDGName}`) {

    var sql = `UPDATE LDG SET LDGName = "${req.body.LDGName}" WHERE LDGid = ${req.body.LDGid} AND LDGName = "${req.body.oldLDGName}" `
    var fetchCountry = `SELECT * FROM LDG;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log(`Country updated! ${req.body.LDGName} `);

      con.query(fetchCountry, function (err2, countryLst) {
        if (err2) throw err2;
        console.log(countryLst)
        res.json({ Updated: result.affectedRows, Message: "Country with name " + `${req.body.LDGName}` + " got Updated", newList: countryLst })
        res.end();
      })

    })

  }

});

//delete method accepts Country name
router.delete('/', (req, res, next) => {

  if (`"${req.body.LDGid}"` && `"${req.body.LDGName}`) {

    //To insert the data in database
    var sql = `DELETE FROM LDG WHERE LDGid = ${req.body.LDGid} AND LDGName = "${req.body.LDGName}"`
    var fetchCountry = `SELECT * FROM LDG;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log("Country deleted!")
      console.log(result.affectedRows)

      con.query(fetchCountry, function (err2, countryLst) {
        if (err2) throw err2;
        console.log(countryLst)
        res.json({ deleted: result.affectedRows, Message: "Country with name " + `${req.body.LDGName}` + " got Deleted", newList: countryLst })
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
