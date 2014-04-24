#boxSDK for Node.js README
The client can be used to make Oauth easier, do get,post,put and delete calls and handle file uploads.

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

Then pass the auth code to the client and handle with a callback function (i.e. store tokens in cookie like in example).
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

##File uploading:
Currently the client supports uploading files from the server to box, the best way to do this is to use the methodLayerfunction 'uploadFile'.

It will open the file and handle filename and formating so box can understand it.

The file object requires specific formating:

. filename = The whole filepath (the file name itself is taken automatically).
. parent_id = The id of the folder you wish to upload to.

The function requires a client, a file object and a callback, you can use it like so:
###File Upload with methodlayer function:
```javascript
var fileObject = {
	filename: __dirname + '/b.docx',
	parent_id: id
}
boxSDK.methodLayer.files.uploadFile (client, fileObject, 
	function(response,statCode){
	console.log(response)
})
```

You can also supply the file data directly to the object, it <b>MUST</b> however be in binary encoding otherwise the file won't upload correctly.
Just place the data in the fileObject under  `fileObject.data` and the client will pick it up when the object is passed to it.

If you aren't sure the file data isn't in binary you can convert it with:
```javascript
	var fileObject.data = new Buffer(fileData).toString('binary')
```

In case you do want to use the client directly you can still use it.
### Client upload:
```javascript
	var fileObject = {
		filename: __dirname + '/b.docx',
		parent_id: id
	}
	var path = urlB.host('upload').object('files').url

	client.upload(path, file, function(response,statCode){
		console.log(response)
	})
```

##Other functions

The purpose of the method layer is to make using the client easier, you don't need to use it to make use of the client but it makes using the box API easier.

They're implemented one by one from top to bottom from in the same order as the function listing on the doc website, so when it says up to, it means all functions up to that one specified are implemented.

At the moment the only functions implemented are:

- Folder (all functions)
- Files(Some of them, up to file upload)

