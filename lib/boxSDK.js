//modules
var urlBuilder = require("./modules/urlBuilder").build
var client = require("./modules/client").client

//non-modules
var request = require("request")

clientBuilder = {
		set   	: {},
		setup:function (set) {
			this.set = set
			return this
		},
		create:function (keys){
			var newClient = client.setup(this.set)
			if(typeof keys !== 'undefined'){
				newClient.setTokens(keys.access_token, keys.refresh_token)
			}
			return newClient
		}
}

methodLayer = {
	folders: require("./methodLayer/folders")
}

exports.clientBuilder = clientBuilder
exports.urlBuilder = urlBuilder
exports.client = client
exports.methodLayer = methodLayer