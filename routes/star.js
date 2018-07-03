var express = require('express');
var router = express.Router();
var star = require('../server/star');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {title:'ejs'});
});

module.exports = router;
