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

//post method accepts 1. empGUID and 2. empPassword
router.post('/', (req, res, next) => {

  var sql = `${req.body.sendSQL};`

  con.query(sql, (errSelect, result) => {
    if (errSelect) throw errSelect;
    console.log(result);
    res.end();

  });

});

module.exports = router;
