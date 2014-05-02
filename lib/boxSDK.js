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

var path = './methodLayer/'

methodLayer = {
	folders: require(path + "folders"),
	files: require(path + "files"),
	comments : require(path + "comments"),
	collaborations: require(path + "collaborations"),
	events : require(path + "events"),
	shared_items : require(path + "shared_items"),
	search : require(path + "search").query,
	users: require(path + "users"),
	groups : require(path + "groups"),
	tasks : require(path + "tasks")
}
var methods = Object.keys(methodLayer)
for(var i=0;i<methods.length;i++){
	module.exports[methods[i]] = methodLayer[methods[i]]
}
exports.clientBuilder = clientBuilder
exports.urlBuilder = urlBuilder
exports.client = client