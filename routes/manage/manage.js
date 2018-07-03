var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
	res.render('manage/login', {title:'ejs'});
});

router.get('/', function(req, res, next) {
	res.render('manage/login', {title:'ejs'});
});

module.exports = router;