var mysql = require('mysql');
var ENV = require('../config/environment');

var conn = mysql.createConnection( ENV.DB.connAttr );

// conn.connect(function(err){
// 	if (err) throw err;
//   	console.log("Connected!");
// })

module.exports = conn;