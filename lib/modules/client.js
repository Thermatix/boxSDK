//modules
var urlB = require('./urlBuilder').build
var func = require('./functions')
//libraries
var http = require("http")
var url = require("url")
var qs = require("querystring")
//

client = {
	key   		 	 : "",
	secret		 	 : "",
	callbackURL  : "",
	aToken       : "",
	rToken       : "",
	path         : "",
	data         : "",
	headers      : {},
	crypto        : func.generate,
	setup:function (input) {
		this.key = input.key
		this.secret = input.secret
		if( typeof input.CallbackURL !== 'undefined'){
				this.callbackURL = input.CallbackURL
		}
		return this
	},
	setTokens:function (acc,reff) {
		this.aToken = acc
		this.rToken = reff
		return this
	},
	authURL:function (state) {
		this.path = url.parse(urlB.host('auth').object('auth').url)
		this.path.query = {
			response_type : "code",
			client_id 		: this.key,
			client_secret : this.secret,
			state: state
		}
		this.path = url.format(this.path)
		return this.path
	},
	getToken:function (code,callb){
		this.path = url.parse(urlB.host('auth').object('token').url)		
		this.path = url.format(this.path)
		this.data = qs.stringify({
					grant_type    : "authorization_code",
					client_id 		: this.key,
					client_secret : this.secret,
					code          : code 
				})
		this.headers = func.getHeaders()
		func.post(callb,this.path,this.data,this.headers,this.callback)
	},
	refreshToken:function (reff,callb) {
		this.rToken = reff
		this.path = url.parse(urlB.host('auth').object('token').url)		
		this.path = url.format(this.path)
		this.data = qs.stringify({
					grant_type    : "refresh_token",
					client_id 		: this.key,
					client_secret : this.secret,
					refresh_token : this.rToken
				})
		this.headers = func.getHeaders()
		func.post(callb,this.path,this.data,this.headers,this.callback)
	},
	revokeToken:function (token, callb){
		this.path = url.parse(urlB.host('auth').object('revoke').url)
		this.data = qs.stringify({
			client_id     : this.key,
			client_secret : this.secret,
			token         : token
		})
		this.path = url.format(this.path)
		this.headers = func.getHeaders()
		function callback(callb,statcode,response,error){
			console.log(response)
			console.log(statcode)
			if(response ==''){
				callb('logged out',200)
			}else{
				callb('bad_request',400)
			}
		}
		func.post(callb,this.path,this.data,this.headers,callback)
	},
	get:function (path, callb) {
		this.path = path
		this.headers = func.getHeaders(this.aToken, 'get')
		func.get(this.path,this.headers,this.callback)
	},
	post:function (path, data, callb) {
		this.path = path
		this.headers = func.getHeaders(this.aToken,'post')
		this.data = JSON.stringify(data)
		func.post(callb,this.path,this.data,this.headers,this.callback)
	},
	put:function (path, data, callb){
		this.path = path
		this.headers = func.getHeaders(this.aToken,'post')
		this.data = JSON.stringify(data)
		func.put(callb,this.path,this.data,this.headers,this.callback)
	},
	patch:function (path, data, callb){
		this.path = path
		this.headers = func.getHeaders(this.aToken,'post')
		this.data = JSON.stringify(data)
		func.patch(callb,this.path,this.data,this.headers,this.callback)
	},
	callback:function (callb,statcode,response,error){
		response = JSON.parse(response)
		callb(response,statcode)
	}
}

exports.client = client