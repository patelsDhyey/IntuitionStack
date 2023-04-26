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

  var fetchStatus = `SELECT * FROM Intuitions INNER JOIN IntuitionStatus ON stsId = intStatusId WHERE intApprovedByEmpId = ${req.params.id} AND intStatusId = (SELECT stsId FROM IntuitionStatus WHERE StatusName = "Intuition Approved");`

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

  if (` "${req.body.intid}" "${req.body.intStatusID}"` && `${req.body.intApprovedByEmpId}`) {

    var UpdateIntuitionStatus = `UPDATE Intuitions SET intStatusId = (SELECT stsId from IntuitionStatus WHERE StatusName = "Intuition Developed") WHERE intid = ${req.body.intid} `

    con.query(UpdateIntuitionStatus, function (err1, result) {
      if (err1) throw err1;

      res.json({ "Updated": true ,"Message": "Intuition Developed"})
      res.end();

    })

  } else {
    res.json({ "Updated": false, "Message": "Intuition not updated as Developed, please share all the details"})
    res.end();
  }

});

router.delete('/', (req, res, next) => {
});

module.exports = router;
