var urlB = require("../modules/urlBuilder").build
var qs = require('querystring')

var defaultQuery = {
				limit : 5,
				offset : 0
				}
// pass = needs id but can 'pass' query with object instead (along with id).
// data + id needs seperate object and id value.
// id = only need to pass id value
// query = can pass query
// all with query have default values

exports.getItems = function (client, pass, callback) {
	switch(true){
		case (typeof pass == 'number'):
			var id = pass
			var query = qs.stringify(defaultQuery)
			break
		case (typeof pass == 'object'):
			var id = pass.id
			if(typeof pass.query !== 'undefined'){
				var query = qs.stringify(pass.query)
			}else{
				var query = qs.stringify(defaultQuery)
			}
			break
		default:
			var id = 0
			var query = qs.stringify(defaultQuery)
	}
	var path = urlB.host('api').object('folders',id).action('items').url
	client.get(path + '?' + query ,callback)
}

exports.create = function (client, data, callback) {
	var path = urlB.host('api').object('folders').url
	client.post(path,data,callback)
}

exports.get = function (client, pass, callback) {
	var id = typeof pass !== 'undefined' ? pass : 0 
	var path = urlB.host('api').object('folders',id).url
	client.get(path,callback)
}

exports.update = function (client, data, id, callback) {
	if(typeof id == 'undefined') throw new Error("Need ID value")
	var path = urlB.host('api').object('folders',id).url
	client.put(path,data,callback)
}

exports.delete = function (client, pass, callback){
	switch(true){
		case(typeof pass = 'number'):
			var path = urlB.host('api').object('folders', id)
		break
		case(typeof pass = 'object'):
			var r = typeof pass.recursive !== 'undefined' ? pass.recursive : false
			var path = urlB.host('api').object('folders', pass.id).url + '?' + 'recursive=' + r
		default:
		if(typeof id == 'undefined') throw new Error("Need ID value")
	}
	client.delete(path,callback)
}

exports.copy = function (client, data, id, callback){
	if(typeof id == 'undefined') throw new Error("Need ID value")
	var path = urlB.host('api').object('folders',id).action('copy').url
	client.post(path,data,callback)
}

exports.createSharedLink = function (client, data, id, callback){
	if(typeof id == 'undefined') throw new Error("Need ID value")
	var path = urlB.host('api').object('folders',id).url
	client.post(path,data,callback)	
}

exports.getCollaborations = function (client, id, callback){
	if(typeof id == 'undefined') throw new Error("Need ID value")
	var path = urlB.host('api').object('folders',id).action('collaborations').url
	client.get(path,data,callback)
}

exports.getTrash = function (client, query, callback) {
	if (typeof query !== 'undefined'){
		var query = qs.stringify(query)
	}else{
		var query = qs.stringify({
			limit  : 2,
			offset : 0
		})
	}
	var path = urlB.host('api').object('folders').action('trash').action('items').url + '?' + query
	client.get(path,callback)
}

exports.getTrashed = function (client, id, callback) {
	if(typeof id == 'undefined') throw new Error("Need ID value")
	var path = urlB.host('api').object('folders',id).action('trash').url
	client.get(path,callback)
}

exports.permanantlyDelete = function (client, id, callback) {
	if(typeof id == 'undefined') throw new Error("Need ID value")
	var path = urlB.host('api').object('folders',id).action('trash').url
	client.delete(path,callback)
}

exports.restoreTrashed = function (client, data, id, callback) {
	if(typeof id == 'undefined') throw new Error("Need ID value")
	var path = urlB.host('api').object('folders',id).urls
	client.post(path,data,callback)
}


