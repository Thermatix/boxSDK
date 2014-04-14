var urlB = require("../modules/urlBuilder")
var qs = require('querystring')

exports.getFile = function (client,id,callback) {
	if(typeof id == 'undefined') throw new Error("Need ID value")
	var path = urlB.host('api').object('files',id)
	client.get(path,callback)
}