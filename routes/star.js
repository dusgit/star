var express = require('express');
var router = express.Router();
var star = require('../server/star');

/* GET home page. */
router.get('/', function(req, res, next) {
	
	res.render('index', {title:'ejs'});
});
router.get('/news/:id', function(req, res, next) {
	var id = req.params.id;
	res.render('index', {title:'ejs'});
});

module.exports = router;
