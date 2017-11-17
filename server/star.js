var Tools = require('../utils/Tools');

var Star = {};

Star.index = function(cb){
	Tools.mongoDB.find('star_news',{},function(err,docs){
		var res = {
			status:'success',
			news:docs
		}
		cb(res);
	});
	
}

module.exports = Star;