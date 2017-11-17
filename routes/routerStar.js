var express = require('express');
var router = express.Router();
var star = require('../server/star');

/* GET home page. */
router.get('/', function(req, res, next) {
	star.index(function(result){
		res.html('index', result);
	});
});

router.get('/dataIndex', function(req, res, next) {
	star.index(function(result){
		res.json(result);
	});
});

module.exports = router;
