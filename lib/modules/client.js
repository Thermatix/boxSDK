//modules
var urlB = require('./urlBuilder').build
var func = require('./functions')
//libraries
var http = require("http")
var url = require("url")
var qs = require("querystring")
//

var client = {
	appID   		 	 : "",
	secret		 	 : "",
	callbackURL  : "",
	aToken       : "",
	rToken       : "",
	path         : "",
	data         : "",
	headers      : {},
	user         : '',
	crypto        : func.generate,
	setup:function (input) {
		this.appID = input.appID
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
			client_id 		: this.appID,
			client_secret : this.secret,
		}
		if( typeof state !== 'undefined'){
				this.path.query.state = state
		}
		this.path = url.format(this.path)
		return this.path
	},
	getToken:function (code,callb){
		this.path = urlB.host('auth').object('token').url
		this.data = qs.stringify({
					grant_type    : "authorization_code",
					client_id 		: this.appID,
					client_secret : this.secret,
					code          : code 
				})
		this.headers = func.getHeaders()
		func.makeRequest(callb, this.path, this.data, this.headers,'post')
	},
	refreshToken:function (reff,callb) {
		this.rToken = reff
		this.path = url.parse(urlB.host('auth').object('token').url)		
		this.path = url.format(this.path)
		this.data = qs.stringify({
					grant_type    : "refresh_token",
					client_id 		: this.appID,
					client_secret : this.secret,
					refresh_token : this.rToken
				})
		this.headers = func.getHeaders()
		func.makeRequest(callb, this.path, this.data, this.headers,'post')
	},
	revokeToken:function (token, callb){
		this.path = url.parse(urlB.host('auth').object('revoke').url)
		this.data = qs.stringify({
			client_id     : this.appID,
			client_secret : this.secret,
			token         : token
		})
		this.path = url.format(this.path)
		this.headers = func.getHeaders()
		function callback(response,statcode){
			if(response ==''){
				callb('logged out',200)
			}else{
				callb('bad_request',400)
			}
		}
		func.makeRequest(callback, this.path, this.data, this.headers,'post')
	},
	get:function (path, callb) {
		this.path = path
		this.headers = func.getHeaders(this.aToken, 'get',{user : this.user})
		func.makeRequest(callb, this.path, null, this.headers,'get')
	},
	post:function (path, data, callb) {
		this.path = path
		this.headers = func.getHeaders(this.aToken,'post',{user : this.user})
		this.data = JSON.stringify(data)
		func.makeRequest(callb, this.path, this.data, this.headers,'post')
	},
	put:function (path, data, callb){
		this.path = path
		this.headers = func.getHeaders(this.aToken,'post',{user : this.user})
		this.data = JSON.stringify(data)
		func.makeRequest(callb, this.path, this.data, this.headers,'put')
	},
	patch:function (path, data, callb){
		this.path = path
		this.headers = func.getHeaders(this.aToken,'post',{user : this.user})
		this.data = JSON.stringify(data)
		func.makeRequest(callb, this.path, this.data, this.headers,'patch')
	},
	delete:function (path,callb){
		this.path = path
		this.headers = func.getHeaders(this.aToken, 'get',{user : this.user})
		func.makeRequest(callb, this.path, null, this.headers,'delete')
	},
	upload:function (path, file, callb){
		this.path = path
		this.headers = func.getHeaders(this.aToken, 'upload',{user : this.user})
		this.data = file
		func.uploadFile(callb,path,this.data,this.headers)
	}
}

exports.client = client