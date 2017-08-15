var express = require('express');
var router = express.Router();

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

/* View a scecific user */
router.get('/api/citizens/:citizen_id', citizenController.findById);

/* Move a specific citizen */
router.post('/api/move-citizen/:citizen_id', citizenController.moveCitizen)

/*************************************/

/**************************
***** VIEW ROUTES *********
***************************/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RIMS' });
});

/*Show individual citizen*/
router.get('/show-citizen/:citizen_id', function(req, res, next) {
	
	//Get citizen information
	client.get("http://localhost:3000/api/citizens/"+req.params.citizen_id, function (data, response) {
	    res.render('viewCitizen', { citizen: data.data[0] });
	    next();
	});

});

/* GET view-move-citizen. */
router.get('/move-citizen/:citizen_id', function(req, res, next) {
	var citizendata = '';
	client.get("http://localhost:3000/api/citizens/"+req.params.citizen_id, function (data, response) {
	    // Get all provinces
	    citizendata = data;
	});

	client.get("http://localhost:3000/api/provinces/1", function (provincedata, response) {
	    // parsed response body as js object 
	    res.render('move-citizen', { citizen: citizendata.data[0], provinces:provincedata.data });
	    next();
	
	});
});

/* Get - form to register new citizen. */
router.get('/new-citizen-form', administrativesController.renderNewCitizenForm);

/* Get all registered citizens */
router.get('/citizens', citizenController.findAllCitizens);

/* GET -  Go to dashboard */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'RIMS' });
});

/* GET -  Go to admin page */
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'RIMS' });
});

module.exports = router;