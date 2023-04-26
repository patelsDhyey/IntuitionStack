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

  var fetchLocation = `SELECT * FROM Locations;`
  var fetchCountry = `SELECT * FROM LDG;`

  con.query(fetchLocation, function (err1, locationLst) {
    if (err1) throw err1;

    con.query(fetchCountry, function (err2, countryLst) {
      if (err2) throw err2;

      console.log(locationLst)
      console.log(countryLst)
      res.json({ LocationList: locationLst, CountryList: countryLst })
      res.end();
    })
  })

  con.on('error', function () {
    con.end();
  });
});

//create method accepts location name
router.post('/', (req, res, next) => {

  if (`"${req.body.LocationName}"`) {

    //To insert the data in database
    //         insert into "order" (customer_id, price) values \
    // ((select customer_id from customer where name = 'John'), 12.34);
    var sql = `INSERT INTO Locations (LocationName, LocationLDGID) VALUES \ ("${req.body.LocationName}",(select LDGid from LDG WHERE LDGid = ${req.body.LocationLDGID}))`

    var fetchLocation = `SELECT * FROM Locations;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log("Location inserted!")
      console.log(result.affectedRows)

      con.query(fetchLocation, function (err2, locationLst) {
        if (err2) throw err2;
        console.log(locationLst)
        res.json({ affectedRows: result.affectedRows, Message: "location with name " + `${req.body.LocationName}` + " got added", newList: locationLst })
        res.end();
      })

    })

  } else {
    res.json({ affectedRows: 0, Message: "Please Enter location Name!" })
    res.end();
  }

  con.on('error', function () {
    con.end();
  });

});

//update method accepts location name
router.put('/', (req, res, next) => {

  if (`"${req.body.Lid}"` && `${req.body.LocationName}`) {

    var sql = `UPDATE Locations SET LocationName= "${req.body.LocationName}", LocationLDGID = ${req.body.LocationLDGID} WHERE Lid = ${req.body.Lid}`
    // var sql = `UPDATE Locations SET LocationName= "${req.body.LocationName}" AND LocationLDGID = \(select LDGid from LDG WHERE LDGid = ${req.body.LocationLDGID}) WHERE Lid = ${req.body.Lid}`

    var fetchLocation = `SELECT * FROM Locations;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log(`location updated! ${req.body.LocationName} `);

      con.query(fetchLocation, function (err2, locationLst) {
        if (err2) throw err2;
        console.log(locationLst)
        res.json({ Updated: result.affectedRows, Message: "location with name " + `${req.body.LocationName}` + " got Updated", newList: locationLst })
        res.end();
      })

    })

  }

});

//delete method accepts Location name
router.delete('/', (req, res, next) => {

  if (`"${req.body.Lid}"` && `"${req.body.LocationName}`) {

    //To insert the data in database
    var sql = `DELETE FROM Locations WHERE Lid = ${req.body.Lid} AND LocationName = "${req.body.LocationName}"`
    var fetchLocation = `SELECT * FROM Locations;`

    console.log("mySQL: " + sql);
    con.query(sql, function (err1, result) {
      if (err1) throw err1;

      console.log("Location deleted!")
      console.log(result.affectedRows)

      con.query(fetchLocation, function (err2, LocationLst) {
        if (err2) throw err2;
        console.log(LocationLst)
        res.json({ deleted: result.affectedRows, Message: "Location with name " + `${req.body.LocationName}` + " got Deleted", newList: LocationLst })
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
