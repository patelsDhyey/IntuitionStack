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
});


router.post('/', (req, res, next) => {
});

router.put('/', (req, res, next) => {

  if (` "${req.body.oldpwd}" "${req.body.empPassword}"` && `${req.body.confirmPassword}` && `${req.body.empId}`) {

    if (`"${req.body.empPassword}"` == `"${req.body.confirmPassword}"`) {

      var fetchPassword = `SELECT COUNT(*) as getCount FROM Employees WHERE empid = ${req.body.empId} AND empPassword = "${req.body.oldpwd}"`
      var UpdatePassword = `UPDATE Employees SET empPassword = "${req.body.empPassword}"  WHERE empid = ${req.body.empId} `

      console.log("mySQL: " + fetchPassword + UpdatePassword);

      con.query(fetchPassword, function (errFetchPass, FetchPassResult) {
        if (errFetchPass) throw errFetchPass;

        console.log(FetchPassResult[0].getCount);
        if (FetchPassResult[0].getCount == 1) {
          con.query(UpdatePassword, function (err1, result) {
            if (err1) throw err1;

            res.json({ "Updated": 1, "Message": "Password Got Updated" })
            res.end();

          })
        } else {
          res.json({ "Updated": null, Message: "ALERT! Old Password seems to be wrong" })
          res.end();
        }
      })

    } else {
      res.json({ "Updated": null, Message: "ALERT! New Password and Confirm password should be same" })
      res.end();
    }
  } else {
    res.json({ "Updated": null, Message: "ALERT! Please give Proper Details" })
    res.end();
  }

});

router.delete('/', (req, res, next) => {
});

module.exports = router;
