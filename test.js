var boxSDK = require('./lib/boxSDK')

console.log(JSON.stringify(boxSDK.client))



var settings = {
	key: 'vlva7v7e8958sskaltrlkfr9068uy36u',
	secret: 'gZxPHUIq7KLBQ9jh81FY83U674kZTn6U'
}

var clientBuilder = boxSDK.clientBuilder.setup(settings)

console.log(JSON.stringify(clientBuilder))
function someaction () {
	var keys = {access_token: 'adsasdsadas', refresh_token: 'sadsadsafasf'}
	client = clientBuilder.create(keys)
	console.log(JSON.stringify(client))
	client.callbackURL = "http://boxsetup.herokuapp.com"
	console.log(JSON.stringify(client))
	console.log(JSON.stringify(clientBuilder))
}

someaction()