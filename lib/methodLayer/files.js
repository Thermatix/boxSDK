var urlB = require("../modules/urlBuilder").build
var qs = require('querystring')
var fs = require('fs');
var crypto = require('crypto');


// pass = needs id but can 'pass' query with object instead (along with id).
// data + id needs seperate object and id value.
// id = only need to pass id value
// query = can pass query
// all with query have default values


function getHash (file, callback){
	var fd = fs.createReadStream(file)
	var hash = crypto.createHash('sha1')
	hash.setEncoding('hex')

	fd.on('end', function() {
	    hash.end()
	    callback(hash.read()) // the desired sha1sum
	});
}

exports.getFileInfomation = function (client,id,callback) {
	if(typeof id == 'undefined') throw new Error("Need ID value")
	var path = urlB.host('api').object('files',id).url
	client.get(path,callback)
}

exports.updateFileInfomation = function (client,data,id,callback) {
	if(typeof id == 'undefined') throw new Error("Need ID value")
	var path = urlB.host('api').object('files',id).url
	client.post(path,data,callback)
}

exports.getFile = function (client,id,callback){
	if(typeof id == 'undefined') throw new Error("Need ID value")
	var path = urlB.host('api').object('files',id).action('content').url
	client.get(path,callback)
}

//this probably won't work
exports.uploadFile = function (client, file, callback){
	if(typeof file == 'undefined') throw new Error("Need file path")
	var path = urlB.host('upload').object('files').url
	client.upload(path,file,callback)
}