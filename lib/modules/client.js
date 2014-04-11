//modules
var urlB = require('./urlBuilder')
//libraries
var http = require("http")
var url = require("url")
var crypto = require("crypto");
var querystring = require("querystring")
//

setCookie = function (res,name, value, age){
	var minute = 60000
	age = typeof age !== 'undefined' ? age * minute : minute
	res.cookie(name, value , { maxAge: age, httpOnly: true,  signed: true })
}

getHeaders = function (token,type){
	var result = {}
	switch(type){
	case 'get':
		result = {
			'Authorization' : boxAuthHead(acc_tkn)
		}
		break;
	case 'post':
		result = {
			'content-type' : 'application/x-www-form-urlencoded',
			'Authorization' : boxAuthHead(acc_tkn)
		}
		break;
	default:
		result = {'content-type' : 'application/x-www-form-urlencoded'}
	}
	return result
}

boxAuthHead = function (header) {
	return 'Bearer {0}'.replace('{0}',header)
}

generate = function() {

	var buf = crypto.randomBytes(256);

	var shasum = crypto.createHash('sha1');
	shasum.update(buf);

	return shasum.digest('hex');
}

client = {
	key   		 	 : "",
	secret		 	 : "",
	callbackURL  : "",
	accessToken  : "",
	refreshToken : "",
	crypt:generate,
	res: 'undefined',
	create:function (k, s,c,r) {
		this.key = k
		this.secret = s
		if( typeof c !== 'undefined'){
				this.callbackURL = c
		}
		if( typeof r !== 'undefined'){
				this.res = r
		}
	},
	authURL:function () {
		path = url.parse(urlb.host('auth').action('auth'))
		path.query = {
			response_type : "code",
			client_id 		: this.key,
			client_secret : this,secret,
		}
		if (this.res !== 'undefined'){
			var stateToken = generate()
			path.query.state = stateToken
			setCookie(this.res,'state',stateToken)
		}
		return url.format(path)
	},
	getToken:function (code){
		path = url.parse(urlb.host('auth').action('token'))
	}
}





exports.client = client