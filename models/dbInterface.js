var mysqlModel = require('mysql-model');
var ENV = require('../config/environment');

var AppModel = mysqlModel.createConnection(ENV.DB.connAttr, function(err){
	if(!err){
		console.log('Connection established');
	}else{
		console.log('Could not establish the app connection. Contact your system administrator.');
	}
});

module.exports = AppModel;