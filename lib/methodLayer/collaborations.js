var urlB = require("../modules/urlBuilder").build
var qs = require('querystring')
var fs = require('fs')
var crypto = require('crypto')
var stream = require('stream')
var util = require('util')


// pass = needs id but can 'pass' query with object instead (along with id).
// data + id needs seperate object and id value.
// id = only need to pass id value
// query = can pass query
// all with query have default values


exports.add = function (client, data, callback) {
	var path = urlB.host('api').object('collaborations').url
	client.post(path,datacallback)
}

exports.edit = function (client, data, id, callback) {
	var path = urlB.host('api').object('collaborations',id).url
	client.put(path,data,callback)
}

exports.remove = function (client, id, callback) {
	var path = urlB.host('api').object('collaborations',id).url
	client.delete(path,callback)
}

exports.retrieve = function (client, id, callback) {
 var path = urlB.host('api').object('collaborations',id).url
 client.get(path,callback)
}

exports.getPending = function (client,callback) {
	var path = urlB.host('api').object('collaborations').url + '?status=pending'
	client.get(path,callback)
}