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


exports.getCurrent = function (client,callback) {
	var path = urlB.host('api').object('users').action('me').url
	client.get(path,callback)
}

exports.allInEnterprise = function (client,callback){
	var path = urlB.host('api').object('users').url
	client.get(path,callback)
}

exports.create = function (client, data, callback) {
	var path = urlB.host('api').object('users')
	client.post(path,data,callback)
}

exports.update = function (client, data, id, callback) {
  var path = urlb.host('api').object('users',id).url
  client.put(path,data,callback)
}

exports.delete = function (client,callback) {
	var path = urlB.host('api').object('users',id).url
	client.delete(path,callback)
}

exports.moveFolderToNewUser = function (client,data,userID,folderID,callback) {
	var path = urlB.host('api').object('users',userID).action('folders',folderID).url
	client.put(path,data,callback)
}

exports.changePrimaryLogin = function (client,data,id,callback) {
	var path = urlB.host('api').object('users',id).url
	client.put(path,data,callback)
}

exports.getEmailAliases = function (client, callback) {
	var path = urlB.host('api').object('users',id).action('alias').url
	client.get(path,callback)
}

exports.addEmailAlias = function (client, data, id, callback) {
	var path = urlb.host('api').object('users',id).action('alias').url
	client.post(path,data,callback)
}

exports.removeEmailAlias = function (client,userID,aliasID, callback) {
	var path = urlB.host('api').object('users',userID).action('alias',aliasID)
	client.delete(path,callback)
}