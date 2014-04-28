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
			switch(typeof tokens ){
				case 'object':
					newClient.setTokens(tokens.access_token, tokens.refresh_token)
					if(typeof tokens.user !== 'undefined') newClient.user = tokens.user
				break
				case 'string':
   				newClient.setTokens(tokens.access_token,null)
				break
			}
			return newClient
		}
}

methodLayer = {
	folders: require("./methodLayer/folders"),
	files: require("./methodLayer/files"),
	collaborations: require("./methodLayer/collaborations"),
	users: require('./methodLayer/users') 
}

exports.clientBuilder = clientBuilder
exports.urlBuilder = urlBuilder
exports.client = client
exports.methodLayer = methodLayer