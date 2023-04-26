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

  var fetchRejectedSolution = `SELECT * FROM Solutions INNER JOIN IntuitionStatus ON stsId = solStatusId WHERE solReviewedByempid = ${req.params.id} AND solStatusId = (SELECT stsId FROM IntuitionStatus WHERE StatusName = "Solution Rejected");`
  
  con.query(fetchRejectedSolution, function (err1, RejectedSolutionLst) {
    if (err1) throw err1;
    res.json(RejectedSolutionLst)
    res.end();
  })

  con.on('error', function () {
    con.end();
  });

});

router.post('/', (req, res, next) => {

});

router.delete('/', (req, res, next) => {
  // var con = mysql.createConnection({
  //   user: "dhypatel",
  //   password: "password",
  //   database: "intuitionStack"
  // });

  // con.connect(function (err) {
  //   if (err) throw err;
  //   console.log("Connected!");

  //   if(`"${req.body.intid}"`){

  //       //To insert the data in database
  //       var sql = `DELETE FROM Intuitions WHERE intid = ${req.body.intid}`
  //       var fetchIntuition = `SELECT * FROM Intuitions;`

  //       console.log("mySQL: " + sql);
  //       con.query(sql, function (err1, result) {
  //         if (err1) throw err1;

  //         console.log("Intuition deleted!")
  //         console.log(result.affectedRows)

  //         con.query(fetchIntuition, function (err2, IntuitionLst) {
  //           if (err2) throw err2;
  //           console.log(IntuitionLst)
  //           res.json({deleted:result.affectedRows,Message:"Intuition got Deleted",newList:IntuitionLst})
  //           res.end();
  //         })

  //       })

  //   }else{
  //     res.json({deleted:0,Message:"Please Share proper reference record!"})
  //     res.end();
  //   }

  // });
  // con.on('error', function () {
  //   con.end();
  // });

});

module.exports = router;
