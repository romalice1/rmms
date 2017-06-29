var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET test page. */
router.get('/stuff', function(req, res, next) {
  res.render('stuff', { title: 'Express' });
});

module.exports = router;