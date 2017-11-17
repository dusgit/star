var fs = require('fs');
var _ = require('underscore');
var HtmlEngin = {};

HtmlEngin.modules = {};

HtmlEngin.html = function(modulePath,opts,req){
    var res = this;
	console.log('-----'+modulePath);
    var htmlText = '';
    if(HtmlEngin.modules[modulePath]){
        htmlText = HtmlEngin.modules[modulePath];
    }else{
        modulePath = modulePath.indexOf('html') == -1 ? modulePath + '.html' : modulePath;
        htmlText = fs.readFileSync('views/'+modulePath);
        htmlText = replaceTemplate(htmlText + '');
        HtmlEngin.modules[modulePath] = htmlText;
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    //用户的权限信息
    res.end(parseVariable(htmlText,opts));
}

/**
 *变量赋值
 */
function parseVariable(htmlText,opts){
    var variableArray = htmlText.match(/\${[\s\S]+?}/g);
    _.each(variableArray,function(ele,idx){
        var key = ele.replace(/\$\{|\}/g,'');
		if(opts[key]){
			htmlText = htmlText.replace(ele,opts[key]);
		}else{
			htmlText = htmlText.replace(ele,'');
		}
    });
    return htmlText;
}

function getTemplate(templateName,type){
    return fs.readFileSync('views/'+templateName+'.'+type).toString();
}

function replaceTemplate(orgHtml){
    var templateNameArray = orgHtml.match(/<template[\s\S]+?\/>/g);
    var scriptTxt = "";
    var styleTxt = "";
    _.each(templateNameArray,function(ele,idx){
        var templateName = ele.substring(ele.indexOf('src="')+5,ele.length);
        templateName = templateName.replace(/"|'/g,'###');
        templateName = templateName.substring(0,templateName.indexOf('###'));
        var templateHtml = getTemplate(templateName,'dus');
        //剥离模板内的script
        var scriptArray = templateHtml.match(/<script[\s\S]+?<\/script>/g);
        var styleArray = templateHtml.match(/<style[\s\S]+?<\/style>/g);
        _.each(scriptArray,function(ele,idx){
            if(ele.indexOf('><\/script>') == -1){
                scriptTxt += ele +'\n';
                templateHtml = templateHtml.replace(ele,'');
            }
        });
        _.each(styleArray,function(ele,idx){
            styleTxt += ele + '\n';
            templateHtml = templateHtml.replace(ele,'');
        });
        //剥离模板内的样式
        orgHtml = orgHtml.replace(ele,templateHtml);
    });
    orgHtml = orgHtml.replace('</html>',scriptTxt + '\n</html>');
    orgHtml = orgHtml.replace('</head>',styleTxt + '\n</head>');
    return orgHtml;
}

module.exports = HtmlEngin;