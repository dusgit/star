var Filter = {}
var htmlEngin = require('../utils/htmlEngin');

/**
 * 自定义模板
 */
Filter.filterHtml = function(req,res,next){
    res.html = htmlEngin.html;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
	next();
}

module.exports = Filter;