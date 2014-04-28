var urlB = require("../modules/urlBuilder").build

// pass = needs id but can 'pass' query with object instead (along with id).
// data + id needs seperate object and id value.
// id = only need to pass id value
// query = can pass query
// all with query have default values

exports.get = function (client,sharedLink,callback) {
	var path = urlB.host('api').object('shared_items').url
	client.get(path,callback,{'BoxApi' : "shared_link=£".replace('£',sharedLink)})
}