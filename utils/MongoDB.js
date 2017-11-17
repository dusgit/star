var MongoClient = require('mongodb').MongoClient;
var settings = require("../settings");

var db = null;
var MongoDB = {};

MongoDB.getDb = function(cb){
	if(db){
		cb(null,db);
	}else{
		MongoClient.connect(settings.mongoDBUrl, function(err, database) {
			if(database){
				db = database;
				cb(null,db);
			}else{
				MongoDB.getDb(cb);
			}
		});
	}
}

MongoDB.insert = function(collections,opts,cb){
	MongoDB.getDb(function(err,db){
		db.collection(collections).insert(opts||[],function(err,results){
			cb && cb(err,results);
		});
	});
}

MongoDB.find = function(collections,opts,cb){
	MongoDB.getDb(function(err,db){
		db.collection(collections).find(opts||{}).toArray(cb);
	});
}

MongoDB.findOne = function(collections,opts,cb){
	MongoDB.getDb(function(err,db){
		db.collection(collections).findOne(opts||{},cb);
	});
}
MongoDB.findByPage = function(collections,opts,start,pageSize,cb){
	MongoDB.getDb(function(err,db){
		db.collection(collections).find(opts||{}).skip(start).limit(pageSize).toArray(cb);
	});
}
MongoDB.findSomeFields = function(collections,opts,fields,cb){
	MongoDB.getDb(function(err,db){
		db.collection(collections).find(opts,fields).toArray(cb);
	});
}

MongoDB.findBySort = function(collections,opts,sort,cb){
	MongoDB.getDb(function(err,db){
		db.collection(collections).find(opts||{}).sort(sort).toArray(cb);
	});
}

MongoDB.updateOne = function(collections,opts,updateOptions,cb){
	MongoDB.getDb(function(err,db){
		db.collection(collections).update(opts,updateOptions,cb);
	});
}

MongoDB.update = function(collections,opts,updateOptions,cb){
	MongoDB.getDb(function(err,db){
		db.collection(collections).update(opts,updateOptions,{multi:true},cb);
	});
}

MongoDB.deleteOne = function(collections,opts,cb){
	MongoDB.getDb(function(err,db){
		db.collection(collections).deleteOne(opts,cb);
	});
}

MongoDB.count = function(collections,opts,cb){
	MongoDB.getDb(function(err,db){
		db.collection(collections).count(opts,cb);
	});
}

MongoDB.group = function(collections,keys, condition, initial, reduce, finalize, command, options, callback){
	MongoDB.getDb(function(err,db){
		db.collection(collections).count(opts,cb);
	});
	
}

module.exports = MongoDB;