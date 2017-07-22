var mysqlModel = require('mysql-model');

var connAttr = {
  host     : 'localhost',
  user     : 'rims',
  password : 'rims',
  database : 'rwanda_migration_management_sys'
}

var AppModel = mysqlModel.createConnection(connAttr, function(err){
	if(!err){
		console.log('Connection established');
	}else{
		console.log('Doomed');
	}
});

module.exports = AppModel;