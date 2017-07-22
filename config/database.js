"use strict";

var mysqlModel = require('mysql-model');


var AppModel = mysqlModel.createConnection({
  host     : 'database-host',
  user     : 'database-user',
  password : 'database-password',
  database : 'database-name',
});