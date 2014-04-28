//modules
var urlBuilder = require("./modules/urlBuilder").build
var client = require("./modules/client").client

//non-modules
var request = require("request")

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

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
	comments : require("./methodLayer/comments"),
	collaborations: require("./methodLayer/collaborations"),
	events : require("./methodLayer/events"),
	shared_items : require("./methodlayer/shared_items"),
	search : require("./methodlayer/search").query,
	users: require("./methodLayer/users")
}
var methods = Object.keys(methodLayer)
for(var i=0;i<methods.length;i++){
  var toBeExecuted = "exports.£ = methodLayer.£"
	toBeExecuted = replaceAll('£', methods[i], toBeExecuted)
	eval(toBeExecuted)

}

exports.clientBuilder = clientBuilder
exports.urlBuilder = urlBuilder
exports.client = client