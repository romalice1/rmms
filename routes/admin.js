var express = require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;
var client = new Client();

var ENV = require('../config/environment');
var session = require('../helpers/sessions')

var userController = require('../controllers/userController');

/**************************
************ API **********
***************************/
/* GET get list of all users*/
router.get('/api/users', userController.findAll);

/* POST Create new user*/
router.post('/new-user', userController.create);

/* POST authenticate user*/
router.post('/login', userController.authenticate);

/* GET logout user */
router.get('/logout', userController.logout);

/**************************
******RENDER VIEWS ********
***************************/
/* GET users listing. */
router.get('/users', function(req, res, next) {
	/*Authenticate this route*/
	session.authenticateRoute(req, res, function(state){
		client.get(ENV.host+"/admin/api/users", function (data, response) {
		    res.render('users', { users: data });
		});
	})
});

/* GET render new user form*/
router.get('/new-user', function(req, res, next) {
	/*Authenticate this route*/
	session.authenticateRoute(req, res, function(state){
		//Pull provinces to start with
		client.get(ENV.host+"/api/provinces/1", function (data, response){
			console.log(data.data)
			res.render('new-user', {provinces: data.data});
		});
	});
});

module.exports = router;