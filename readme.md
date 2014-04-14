For the moment You can use this to make Oauth easier, I'm adding methods to make calls easier but for the moment, Oauth is the main thing that works.

First make a client builder and pass the app key and secret.
		var boxSDK = require('boxSDK')

		var appSettings = {
			key: 'YOUR APP KEY',
			secret: 'YOUR APP SECRET',
			callBackURL : 'YOUR CALLBACK URL' // only if you need this
		}

		var clientBuilder = boxSDK.clientBuilder(appSettings)

In your first request get the authurl and redirect the user.

		var client = clientBuilder.create()

		var path = client.authURL

		res.redirect(path)

Then pass the auth code to the client and handle with callback function (i.e. store tokens in cookie like in example).

	var client = clientBuilder.create()

	callback = function(repsponse, statusCode){
		res.cookie.('accessToken',response.access_token,{maxAge: 60000 * 59})
		res.cookie.('refreshToken',response.refresh_token,{maxAge: 60000 * 59})
		res.redirect('some path')

	}
	var path = client.getToken('AUTH CODE',callback)

You can also revoke tokens, it will respond with 200 if logout was sucessfull or 400 if it was not.

		var client = clientBuilder.create()

		client.revokeToken('ACCESS TOKEN' or 'REFRESH TOKEN')

Lastly you can refresh your access token (not tested yet)

		var client = clientBuilder.create()

		callback = function(repsponse, statusCode){
			res.cookie.('accessToken',response.access_token,{maxAge: 60000 * 59})
			res.cookie.('refreshToken',response.refresh_token,{maxAge: 60000 * 59})
			res.redirect('some path')

		}
		var path = client.getRefreshToken('REFRESH TOKEN',callback) 
