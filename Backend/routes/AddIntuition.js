// const e = require('express');
// const { json } = require('express');
// var express = require('express');
// var router = express.Router();
// var mysql = require('mysql');

// /* GET users listing. */
// router.get('/', function(req, res, next) {
  
// });

// //post method accepts 1. empGUID and 2. empPassword
// router.post('/',(req,res,next)=>{
//   var con = mysql.createConnection({
//     user: "dhypatel",
//     password: "password",
//     database: "intuitionStack"
//   });

//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");

//     //under process
//     //To insert the data in database
//     var sql = `SELECT COUNT(empEmail) AS getCount FROM Employees WHERE empEmail = "${req.body.empEmail}" AND empPassword = "${req.body.empPassword}"`
//     var sql =  `INSERT INTO `
//     console.log("Query: " + sql);
//     con.query(sql,function(err1,result){ 
//       if (err1) throw err1;
      
//       console.log(result[0].getCount);

//       // if(result[0].getCount==1){
//       //   res.json({session:true,Message:null})
//       // }else if(result[0].getCount==0){
//       //   res.json({session:false,Message:"Wrong Email and Password! Please try again!"})
//       // } else {
//       //   console.log("Default occur! Looks like you have multiple account please contact to Admin!");
//       //   res.json({session:false,Message:"Looks like you have multiple account please contact to Admin!"})
//       // }
    
//     });

//   });
  
// });



// module.exports = router;
