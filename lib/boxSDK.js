//modules
var urlBuilder = require("./modules/urlBuilder")
var client = require("./modules/client")

//non-modules
var request = require("request")


methodLayer = {
	key   		 	 : "",
	secret		 	 : "",
	callbackURL  : "",
	settings:function (settings){
		this.key = settings.key
		this.secret = settings.secret
		this.callbackURL = settngs.callbackURL
	},
	folders: require("./methodLayer/folders")
}

exports.urlBuilder = urlBuilder
exports.client = client
exports.methodLayer = methodLayer