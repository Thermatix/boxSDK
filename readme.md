#boxSDK for Node.js README
For the moment You can use this to make Oauth easier, I'm adding methods to make calls easier but for the moment, Oauth is the main thing that works.

##Authentication
First make a client builder and pass the app ID and secret.

<i>The client Builder should be outside of any requests, that way it's accessible from all requests; it's there so you don't have to give the client your appID and secret each time you need it.</i>
###Setup Client Factory:
```javascript
		var boxSDK = require('boxSDK')
		var appSettings = {
			appID: 'YOUR APP IDD',
			secret: 'YOUR APP SECRET',
			callBackURL : 'YOUR CALLBACK URL' // only if you need this
		}
		var clientBuilder = boxSDK.clientBuilder(appSettings)
```
In your first request get the authurl and redirect the user.
###Authentication URL:
```javascript		
		var client = clientBuilder.create()
		var path = client.authURL
		res.redirect(path)
```

Then pass the auth code to the client and handle with callback function (i.e. store tokens in cookie like in example).
###Retrieve Access Tokens:
```javascript
	var client = clientBuilder.create()
	callback = function(response, statusCode){
		res.cookie.('accessToken',response.access_token,{maxAge: 60000 * 59})
		res.cookie.('refreshToken',response.refresh_token,{maxAge: 60000 * 59})
		res.redirect('path to your website after authentication is finished')
	}
	var path = client.getToken('AUTH CODE',callback)
```

You can also revoke tokens, it will respond with 200 if logout was successful or 400 if it was not.
###Revoke Access Tokens
```javascript
		var client = clientBuilder.create()
		callback = function(response,statuscode) {
			if(statuscode == 200){
				console.log(response)
			}else{
				console.log(response)
			}
		}
		client.revokeToken(('ACCESS TOKEN' or 'REFRESH TOKEN'),callback)
```

Lastly you can refresh your access token 
###Refresh Tokens:	
```javascript
		var client = clientBuilder.create()
		callback = function(repsponse, statusCode){
			res.cookie.('accessToken',response.access_token,{maxAge: 60000 * 59})
			res.cookie.('refreshToken',response.refresh_token,{maxAge: 60000 * 59})
			res.redirect('some path')
		}
		var path = client.getRefreshToken('REFRESH TOKEN',callback) 
```

##URL Builder:
There is also the url builder you can use to make url building easier and more semantically readable.

```javascript
	var urlB = boxSDK.urlBuilder
	var path = urlB.host('auth').object('token')
```

There are three 'hosts' you can use:

1.	'auth' for oauth authentication (unneeded as the client has built in methods for this)
2.	'api' for api access
3.	'upload' for uploading files to box


##Making Requests
You can use the client to make get or post requests like so.

###Get folders:
```javascript
	var client = clientBuilder.create('Access_Token')
	var path = urlB.host('api').object('folders').action('items')
	callback = function(response, statusCode){
		console.log(JSON.stringify(response))
		console.log(statusCode)
	}
	client.get(path,callback)
```

###Create folders:
```javascript
	var client = clientBuilder.create('Access_Token')
	var path = urlB.host('api').object('folders')
	var data = {"name":"New Folder", "parent": {"id": "11446498"}}
	callback = function(response, statusCode){
		console.log(JSON.stringify(response))
		console.log(statusCode)
	}
	client.post(path,data,callback)
```

##Other functions

There are other functions but they are not mentioned due to not being tested.
For example the client also has:

1.	client.put
2.	client.patch
3.	client.delete
4.	client.upload

But I'm unsure if they will work mostly because I have been unable to find information on them, I've made guesses but I can't be sure.

There is also the Methods layer, some of the API functions are there but because I can't be sure of the client functions working, I can't be sure if they will work, the ones that should work are those that use 'get' and 'post' methods.

I will try to get them working as I go along.