var express = require('express');
var router = express.Router();

var citizenController = require('../controllers/citizenController');
var administrativesController = require('../controllers/administrativesController');


/**************************
************ API **********
***************************/
/** get province list */
router.get('/api/provinces/:country_id', administrativesController.getProvinces);

/** get district list */
router.get('/api/districts/:prov_id', administrativesController.getDistricts);

/** get umurenge list */
router.get('/api/umurenge/:district_id', administrativesController.getUmurenge);

/** get akagari list */
router.get('/api/akagari/:umurenge_id', administrativesController.getAkagari);

/*************************************/


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RIMS' });
});

/* Get - form to register new citizen. */
router.get('/new-citizen-form', administrativesController.renderNewCitizenForm);

/* POST create a new citizen record*/
router.post('/create-new-citizen', citizenController.createNewCitizen);

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