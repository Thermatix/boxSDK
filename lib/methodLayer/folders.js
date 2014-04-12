var urlB = require("../modules/urlBuilder")
var url = require('url')

exports.getFolder = function (client, id, callback) {
	var pass = typeof id !== 'undefined' ? id : 0 
	path = urlB.host('api').object('folders',pass)
	client.get(path,callback)
}
exports.getFolderItems = function (client, id, callback) {
	var pass = typeof id !== 'undefined' ? id : 0 
	path = urlB.host('api').object('folders',pass).action('items')
	client.get(path,callback)
}
exports.createFolder = function (client, data, callback) {
	path = urlB.host('api').object('folders')
	client.post(path,data,callback)
}
exports.updateFolder = function (client, data, id, callback) {
	if(typeof id == 'undefined') throw new Error("Need ID value")
	path = urlB.host('api').object('folder',id)
	client.put(path,data,callback)
}
exports.deleteFolder = function (client, id, callback){
	if(typeof id == 'undefined') throw new Error("Need ID value")
	path = urlB.host('api').object('folder', id)
}

