var urlB = require("../modules/urlBuilder").build
var qs = require("querystring")

// pass = needs id but can 'pass' query with object instead (along with id).
// data + id needs seperate object and id value.
// id = only need to pass id value
// query = can pass query
// all with query have default values

var defaultOptions = {
	limit : 1,
	offset : 0
}

exports.query = function (client,query,callback) {
	if (typeof query.options == 'undefined'){
		var q = defaultOptions
	}else{
		var q = query.options
	}
	var path = urlB.host('api').object('search'.url) + '?' + 'query=' + query.search + qs.stringify(q)
	client.get(path,callback)
}