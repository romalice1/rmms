var express = require('express');
var router = express.Router();
var ENV = require('../config/environment');
var session = require('../helpers/sessions')

var citizenController = require('../controllers/citizenController');
var administrativesController = require('../controllers/administrativesController');

var Client = require('node-rest-client').Client;
var client = new Client();

/**************************
************ API **********
***************************/
/* POST create a new citizen record*/
router.post('/api/create-new-citizen', citizenController.createNewCitizen);

/** get province list */
router.get('/api/provinces/:country_id', administrativesController.getProvinces);

/** get district list */
router.get('/api/districts/:prov_id', administrativesController.getDistricts);

/** get umurenge list */
router.get('/api/umurenge/:district_id', administrativesController.getUmurenge);

/** get akagari list */
router.get('/api/akagari/:umurenge_id', administrativesController.getAkagari);

/* get a scecific citizen */
router.get('/api/citizens/:citizen_id', citizenController.findById);

/* search citizens by keyword */
router.get('/api/citizens/search/:keyword', citizenController.findWhere);

/* Move a specific citizen */
router.post('/api/move-citizen', citizenController.moveCitizen)

/* Get a list of all registered citizens */
//SCOPE: put '*' if you want all. Else, put a province or district id
router.get('/api/citizens/:scope_province/:scope_district', citizenController.findAllCitizens);

/*************************************/

/**************************
***** VIEW ROUTES *********
***************************/
/* GET home page. */
router.get('/', function(req, res, next) {
	if( session.isAuthenticated(req) ){
		//proceed to homepage
		res.redirect('/citizens');
	}else{
		res.render('index');
	}
});
/*Show individual citizen*/
router.get('/show-citizen/:citizen_id', function(req, res, next) {
	/* Authenticate this route */
	session.authenticateRoute(req, res, function(state){
		//Get citizen information
		client.get(ENV.host+"/api/citizens/"+req.params.citizen_id, function (data, response) {
		    res.render('viewCitizen', { citizen: data.data[0] });
		    next();
		});
	});
});

/* GET view-move-citizen. */
router.get('/move-citizen/:citizen_id', function(req, res, next) {
	/* Authenticate this route */
	session.authenticateRoute(req, res, function(state){
		var citizendata = '';
		client.get(ENV.host+"/api/citizens/"+req.params.citizen_id, function (data, response) {
		    // Get all provinces
		    citizendata = data;
		});

		client.get(ENV.host+"/api/provinces/1", function (provincedata, response) {
		    // parsed response body as js object 
		    res.render('move-citizen', { citizen: citizendata.data[0], provinces:provincedata.data });
		    next();
		
		});
	});
});

// /* Update citizen location */
// router.post('/move-citizen', function(req, res, next){
// 	client.post(ENV.host+"/api/move-citizen", req, function (provincedata, response) {
// 		    // parsed response body as js object 
// 	    res.render('move-citizen');
// 	    next();
	
// 	});
// });

/* Get - form to register new citizen. */
// router.get('/new-citizen-form', administrativesController.renderNewCitizenForm);
router.get('/new-citizen-form', function(req, res, next){
	session.authenticateRoute(req, res, function(state){
		client.get(ENV.host+"/api/provinces/1", function (provincedata, response) {
		   res.render('new-citizen', { provinces: provincedata.data });
		});
	});
})

/* Get all registered citizens */
router.get('/citizens', function(req, res, next){
	/* Authenticate this route */
	session.authenticateRoute(req, res, function(state){
		
		// Admin privilege sees all citizens
		if(req.session.data.privilege_admin){
			client.get(ENV.host+"/api/citizens/*/*", function (data, response){
				res.render('citizens', {citizens: data.results})
			})
		}else{
			// User privilege sees limited citizens
			client.get(ENV.host+"/api/citizens/"+req.session.data.scope_province+"/"+req.session.data.scope_district, function (data, response){
				res.render('citizens', {citizens: data.results})
			})
		}
	});
});

/* GET -  Go to dashboard */
router.get('/dashboard', function(req, res, next) {
	/* Authenticate this route */
	session.authenticateRoute(req, res, function(state){
		res.render('dashboard', { title: 'RIMS' });
	});
});

/* POST search citizen by keyword */
router.post('/citizens', function(req, res, next){
	/* Authenticate this route */
	session.authenticateRoute(req, res, function(state){
		client.get(ENV.host+"/api/citizens/search/"+req.body.keyword, function (data, response){
			res.render('citizens', {citizens: data.results})
		})
	});
});


module.exports = router;