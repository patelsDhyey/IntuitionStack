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

  // var con = mysql.createConnection({
  //   user: "dhypatel",
  //   password: "password",
  //   database: "intuitionStack"
  // });

  // con.connect(function (err) {
  //   if (err) throw err;
  //   console.log("Connected!");

  //    var fetchStatus = `SELECT * FROM Intuitions;`

  //   con.query(fetchStatus, function (err1, IntuitionsLst) {
  //     if (err1) throw err1;
  //     res.json(IntuitionsLst)
  //     res.end();
  //   })
  // })
  // con.on('error', function () {
  //   con.end();
  // });

});

router.get('/:id', function (req, res, next) {

  var verifyIntuition = `SELECT count(intid) as getCount FROM Intuitions WHERE intid = ${req.params.id}`
  var selectIntuition = `SELECT * FROM Intuitions WHERE intid = ${req.params.id}`
  var fetchStatus = `SELECT * FROM IntuitionStatus`

  con.query(verifyIntuition, function (err, verifyIntuitionResult) {
    if (err) throw err;

    con.query(selectIntuition, function (err1, selectedIntuition) {
      if (err1) throw err1;

      con.query(fetchStatus, function (fserr, fetchedStatus) {
        if (fserr) throw fserr;

        if (verifyIntuitionResult[0].getCount == 1) {
          res.json({ "IntuitionsLst": selectedIntuition, "fetchedStatus": fetchedStatus })
          res.end();
        }
      })
    })
  })
})

router.post('/', (req, res, next) => {

});

router.put('/', (req, res, next) => {

  if (` "${req.body.intid}" "${req.body.intBrief}"` && `${req.body.intDesc}` && `${req.body.intTags}`) {

    var UpdateIntuition = `UPDATE Intuitions SET intBrief = "${req.body.intBrief}", intDesc = "${req.body.intDesc}", intTags = "${req.body.intTags}"  WHERE intid = ${req.body.intid} `

    console.log("mySQL: " + UpdateIntuition);
    con.query(UpdateIntuition, function (err1, result) {
      if (err1) throw err1;

      res.json({ "Updated": result.affectedRows, "Message": "Intuition Got Updated" })
      res.end();

    })

  } else {
    res.json({ Updated: null, Message: "ALERT! Please give Proper Details" })
    res.end();
  }

});

router.delete('/', (req, res, next) => {

});

module.exports = router;
