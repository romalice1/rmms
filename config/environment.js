"use strict";

const system_env = require('get-env')();

var ENV='';

if( system_env === 'dev'){
	// Systems is running in development mode
	ENV = {
		host: 'http://localhost:3000',
		DB: {
			connAttr: {
			  host     : 'localhost',
			  user     : 'rims',
			  password : 'rims',
			  database : 'rwanda_migration_management_sys'
			}
		}
	}
}else if(system_env === 'prod'){
	// System is running in production mode
	ENV = {
		host: 'https://nameless-garden-16503.herokuapp.com/',
		DB: {
			connAttr: {
			  host     : 'us-cdbr-iron-east-05.cleardb.net',
			  user     : 'b0760f4472ffd2',
			  password : 'bd238cad',
			  database : 'heroku_1e419c5fa414b8a'
			}
		}
	}
}

module.exports = ENV;