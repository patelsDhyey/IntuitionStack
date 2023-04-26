const e = require('express');
const { json } = require('express');
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

/* GET users listing. */
router.get('/', function (req, res, next) {

});

//post method accepts 1. empGUID and 2. empPassword
router.post('/', (req, res, next) => {
  
  let gettrackerCount = "initital";
  if(`${req.body.LoginEntry}` === "true"){
    if (`"${req.body.userId}"`) {
    
      
      var getusertrackerCount = `SELECT COUNT(*) AS getCount FROM userTracker`;
      con.query(getusertrackerCount, (errCount, resultCount) => {
        if(errCount) throw errCount;

        gettrackerCount = resultCount[0].getCount;
        console.log("GET TRACKER:",gettrackerCount  )

        let date = new Date();
        date.getDate();
        //dd-mm-yyyy
        let intuitionDate = (("0" + date.getDate()).slice(-2)) + "/" + (("0" + (date.getMonth() + 1)).slice(-2)) + "/" + date.getFullYear();
        let intuitionTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        date = date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2)) + "-" + (("0" + date.getDate()).slice(-2)) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        console.log(date);
        // console.log(intuitionDate, intuitionTime);

        gettrackerCount = gettrackerCount+1;

        var LoginEntry = `INSERT INTO userTracker (userId , LoginTime, Token) VALUES (${req.body.userId}, "${date}", "${gettrackerCount}" )`
        
          con.query(LoginEntry, (errUser, resultcount) => {
            if (errUser) throw errUser;
            console.log(resultcount);
            
            res.json({ "affectedRows": resultcount.affectedRows, "sessionEntry": true, "Message": null, "Token": gettrackerCount})
            res.end();

        });
      
      })

      
    } else {
      res.json({ "affectedRows": 0, "sessionEntry": false, "Message": "Please give password and confirm password same!" })
      res.end();
    }
  }else if(`${req.body.LogoutEntry}` === "true"){

    if (`"${req.body.userId}"` && `"${req.body.Token}"` ) {
    
        let date = new Date();
        date.getDate();
        //dd-mm-yyyy
        let intuitionDate = (("0" + date.getDate()).slice(-2)) + "/" + (("0" + (date.getMonth() + 1)).slice(-2)) + "/" + date.getFullYear();
        let intuitionTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        date = date.getFullYear() + "-" + (("0" + (date.getMonth() + 1)).slice(-2)) + "-" + (("0" + date.getDate()).slice(-2)) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        console.log(date);

        gettrackerCount = gettrackerCount+1;

        var LogoutEntry = `UPDATE userTracker SET LogoutTime = "${date}" WHERE Token = "${req.body.Token}"`;
        
          con.query(LogoutEntry, (errUser, resultcount) => {
            if (errUser) throw errUser;
            console.log(resultcount);
            
            res.json({ "affectedRows": resultcount.affectedRows, "sessionExit": true, "Message": null, "Token": gettrackerCount})
            res.end();

        });
    
    } else {
      res.json({ "affectedRows": 0, "sessionExit": false, "Message": "Please give password and confirm password same!" })
      res.end();
    }

  }else{
    res.json({ "affectedRows": 0, "session": false, "Message": "Please give password and confirm password same OUR!" })
    res.end();
  }

});

module.exports = router;
