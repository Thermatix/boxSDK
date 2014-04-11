//modules
var urlB = require('./urlBuilder')
var func = require('./functions')
//libraries
var http = require("http")
var url = require("url")
var crypto = require("crypto");
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
	create:function (k, s,c) {
		this.key = k
		this.secret = s
		if( typeof c !== 'undefined'){
				this.callbackURL = c
		}
		return this
	},
	setTokens:function (acc,reff) {
		this.aToken = acc
		this.rToken = reff
		return this
	}
	authURL:function (state) {
		this.path = url.parse(urlb.host('auth').object('auth'))
		this.path.query = {
			response_type : "code",
			client_id 		: this.key,
			client_secret : this,secret,
			state: state
		}
		this.path = url.format(path)
		return path
	},
	getToken:function (code,callb){
		this.path = url.parse(urlb.host('auth').object('token').url)		
		this.path = url.format(path)
		this.data = qs.stringify({
					grant_type    : "authorization_code",
					client_id 		: this.key,
					client_secret : this.secret,
					code          : code 
				})
		this.headers = func.getHeaders()
		function callback(statcode,response,error){
			response = JSON.parse(returnValue)
			callb(response,statcode
		}
		func.post(callb,this.path,this.data,this.headers,func.callback)
	},
	refreshToken:function (reff,callb) {
		this.rToken = reff
		this.path = url.parse(urlb.host('auth').object('token').url)		
		this.data = qs.stringify({
					grant_type    : "refresh_token",
					client_id 		: this.key,
					client_secret : this.secret,
					refresh_token : this.rToken
				})
		this.headers = func.getHeaders()
		function callback(statcode,response,error){
			response = JSON.parse(response)
			callb(response,statcode)
		}
		func.post(callb,this.path,this.data,this.headers,func.callback)
	},
	revokeToken:function (token,callb){
		this.path = url.parse(urlb.host('auth').object('revoke').url)
		this.data = qs.stringify({
			client_id     : this.key,
			client_secret : this.secret,
			token         : token
		})
		this.path = url.format(path)
		this.headers = func.getHeaders()
		function callback(statcode,response,error){
			if(response ==''){
				callb('logged out',200)
			}else{
				callb('bad_request',400)
			}
		}
		func.post(callb,this.path,this.data,this.headers,func.callback)
	},
	get:function (path,callb) {
		this.path = path
		this.headers = func.getHeaders(this.aToken, 'get')
		function callback(statcode,response,error){
			response = JSON.parse(response)
			callb(response,statcode)
		}
		func.get(this.path,this.headers,callback)
	},
	post:function (path,data,callb) {
		this.path = path
		this.headers = func.getHeaders(this.aToken,'post')
		this.data = JSON.stringify(data)
		func.post(callb,this.path,this.data,this.headers,func.callback)
	}
}


exports.client = client