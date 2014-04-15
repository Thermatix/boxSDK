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
		create:function (tokens){
			var newClient = client.setup(this.set)
			if(typeof tokens !== 'undefined'){
				newClient.setTokens(tokens.access_token, tokens.refresh_token)
			}
			return newClient
		}
}

methodLayer = {
	folders: require("./methodLayer/folders"),
	files: require("./methodLayer/files")
}

exports.clientBuilder = clientBuilder
exports.urlBuilder = urlBuilder
exports.client = client
exports.methodLayer = methodLayer