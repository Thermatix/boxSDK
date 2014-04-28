var urlB = require("../modules/urlBuilder").build
var qs = require("querystring")

// pass = needs id but can 'pass' query with object instead (along with id).
// data + id needs seperate object and id value.
// id = only need to pass id value
// query = can pass query
// all with query have default values

exports.getAll = function (client,callback) {
	var path = urlB.host('api').object('groups').url
	client.get(path,callback)
}

exports.create = function (client,data,callback) {
	var path = urlB.host('api').object('groups').url
	client.post(path,data,callback)
}

exports.update = function (client, data, id, callback) {
  var path = urlB.host('api').object('groups',id).url
  client.put(path,data,callback)
}

exports.delete = function (client,id, callback) {
  var path = urlB.host('api').object('groups',id).url
  client.delete(path,callback)
}

exports.memberships = function (client, id, callback) {
	 var path = urlB.host('api').object('groups', id).action('memberships').url
	 client.get(path,callback)
}

exports.membership = function (client, id, callback) {
	 var path = urlB.host('api').object('group_membership', id).url
	 client.get(path,callback)
}

exports.addMember = function (client,data,callback) {
	var path = urlB.host('api').object('group_membership').url
	client.post(path,data,callback)
}

exports.updateMembership = function (client,data,id,callback) {
	var path = urlB.host('api').object('group_membership',id).url
	client.put(path,data,callback)
}

exports.deleteMembership = function (client,id,callback) {
	var path = urlB.host('api').object('group_membership',id).url
	client.delete(path,callback)
}

exports.collaborations = function (client, id, callback) {
	var path = urlB.host('api').object('group_membership',id).action('collaborations').url
	client.get(path,callback)
}

