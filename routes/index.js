var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RIMS' });
});

/* Get - Register a new citizen. */
router.get('/new-citizen', function(req, res, next) {
  res.render('new-citizen', { title: 'RIMS' });
});

/* Get all registered citizens */
router.get('/citizens', function(req, res, next) {
  res.render('citizens', { title: 'RIMS' });
});

/* GET -  Go to dashboard */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'RIMS' });
});

/* GET -  Go to admin page */
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'RIMS' });
});

module.exports = router;