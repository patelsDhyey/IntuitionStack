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

  var fetchStatus = `SELECT * FROM Intuitions INNER JOIN IntuitionStatus ON stsId = intStatusId WHERE intStatusId = (SELECT stsId FROM IntuitionStatus WHERE StatusName = "New Post");`

  con.query(fetchStatus, function (err1, IntuitionsLst) {
    if (err1) throw err1;
    res.json(IntuitionsLst)
    res.end();
  })

  con.on('error', function () {
    con.end();
  });

});

router.put('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {
});

module.exports = router;
