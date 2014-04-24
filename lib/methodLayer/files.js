var urlB = require("../modules/urlBuilder").build
var qs = require('querystring')
var fs = require('fs');
var crypto = require('crypto');
var stream = require('stream');
var util = require('util');


// pass = needs id but can 'pass' query with object instead (along with id).
// data + id needs seperate object and id value.
// id = only need to pass id value
// query = can pass query
// all with query have default values

var defaultQuery = {
				min_height : 256,
				min_width : 256
				}
function getHash (file, callback){
	var fd = fs.createReadStream(file)
	var hash = crypto.createHash('sha1')
	hash.setEncoding('hex')

	fd.on('end', function() {
	    hash.end()
	    callback(hash.read()) // the desired sha1sum
	});
}


exports.getInfomation = function (client,id,callback) {
	var path = urlB.host('api').object('files',id).url
	client.get(path,callback)
}

exports.updateInfomation = function (client,data,id,callback) {
	var path = urlB.host('api').object('files',id).url
	client.post(path,data,callback)
}

exports.get = function (client,id,callback) {
	var path = urlB.host('api').object('files',id).action('content').url
	client.get(path,callback)
}


upload = function (client, file, callback) {
	// var file = file
	// this.data = ''
	// stream.Writable.call(this);
	// file.data = this.data !== '' ? this.data : null
	var path = urlB.host('upload').object('files',file.id).action('content').url
	client.upload(path,file,callback)
}

// upload.prototype._write = function (chunk, encoding, callback) {
// 	this.data = this.data + chunk.toString('binary')
// 	callback()
// }
// util.inherits(upload, stream.Writeable)
exports.upload = upload

exports.delete = function (client,id,callback) {
	var path = urlb.host('api').object('files',id).url
	client.delte(path,callback)
}

exports.getVersionInfomation = function (client,id,callback) {
	var path = urlb.host('api').object('files',id).action('versions').url
	client.get(path,callback)
}

exports.promoteOldVersion = function (client, data, id ,callback) {
	var path = urlB.host('api').object('files',id).action('versions').action('current').url
	client.post(path,data,callback)
}

exports.deleteOldVersion = function (client,id,version_id,callback){
	var path = urlB.host('api').object('files',id).action('version',version_id).url
  client.delte(path,callback)
}

exports.copy = function (client,data,id,callback){
	var path = urlB.host('api').object('files',id).action('copy').url
	client.post(path,data,callback)
}

exports.getThumbnail = function (client, pass, callback) {
  var path = urlB.host('api').object('files', pass.pass || pass).action('thumbnail').url + '?' +
  qs.stringify(pass.query || defaultQuery)
  client.get(path,callback)
}

exports.createSharedLink = function (client,data,id,callback) {
	var path = urlB.host('api').object('files',id).url
	client.put(path,data,callback)
}

exports.getTrashed = function (client,id,callback) {
	var path = urlB.host('api').object('files',id).url
	client.get(path,callback)
}

exports.permanantlyDelete = function (client,id,callback) {
	var path = urlB.host('api').object('files',id).action('trash').url
	client.delte(path,callback)
}

exports.restoreTrashed = function (client,data,id,callback) {
	var path = urlB.host('api').object('files',id).url
	client.post(path,data,callback)
}

exports.viewComments = function (client,data,id,callback) {
	var path = urlB.host('api').object('files',id).action('comments').url
	client.get(path,callback)
}

exports.getTasks = function (client,id,callback) {
	var path = urlB.host('api').object('files',id).action('tasks').url
	client.get(path,callback)
}