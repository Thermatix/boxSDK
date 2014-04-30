var urlB = require("../modules/urlBuilder").build
var qs = require("querystring")

// pass = needs id but can 'pass' query with object instead (along with id).
// data + id needs seperate object and id value.
// id = only need to pass id value
// query = can pass query
// all with query have default values

exports.create = function (client,data,callback) {
 var path = urlB.host('api').object('tasks').url
 client.post(path,data,callback)
}

exports.get = function (client,id,callback){
	var path = urlB.host('api').object('tasks',id).url
	client.get(path,callback)
}

exports.update = function (client,data,id,callback) {
	var path = urlB.host('api').object('tasks',id).url
	client.put(path,data,callback)
}

exports.delete = function (client,id,callback) {
	var path = urlB.host('api').object('tasks',id).url
	client.delete(path,callback)
}

exports.getAssignments = function (client,id,callback) {
	var path = urlB.host('api').object('tasks',id).action('assignments').url
	client.get(path,callback)
}

exports.createAssignment = function (Client,data,callback) {
	var path = urlB.host('api').object('task_assignments').url
	client.post(path,data,callback)
}

exports.getAssignment = function (client,id,callback) {
	var path = urlB.host('api').object('task_assignments',id).url
	client.get(path,callback)
}

exports.deleteAssignment = function (client,id,callback) {
	var path = urlB.host('api').object('task_assignments',id).url
	client.delete(path,callback)
}

exports.updateAssignment = function (client,data,id,callback) {
	var path = urlB.host('api').object('task_assignments',id).url
	client.put(path,data,callback)
}
