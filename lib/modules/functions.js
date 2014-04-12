var request = require("request")
var crypto = require("crypto");

get = function (callb,path, headers, callback) {
	var options = {
				url     : path,
				headers : headers
	}
	request(options, function(error,response,body){	
		callback(callb,response.statusCode,body,error)
	})
}

post = function (callb,uri, data, headers, callback) {
	var posting = {
		    uri     : uri,
		    headers : headers,
		    body    : data
	}
	request.post(posting,function(error,response,body){
			callback(callb,response.statusCode,body,error)
	})
}
put = function (callb,uri, data, headers, callback) {
	var posting = {
		    uri     : uri,
		    headers : headers,
		    body    : data
	}
	request.put(posting,function(error,response,body){
			callback(callb,response.statusCode,body,error)
	})
}

patch = function (callb,uri, data, headers, callback) {
	var posting = {
		    uri     : uri,
		    headers : headers,
		    body    : data
	}
	request.patch(posting,function(error,response,body){
			callback(callb,response.statusCode,body,error)
	})
}
trueOrFalse = function(input){
	var result = false
	if (input == 'true' || input == 'True'){
		result = true
	}
	return result
}

setUserObject = function (d){
	if(typeof d.login == 'undefined' || typeof d.name = 'undefined' ) return 'error'
	var result = JSON.stringify({
		tracking_codes: [],
		login : d.email,
		name : d.name,
		phone: d.phone || '',
		address: d.address || '',
		role: d.role || '',
		status: d.status || '',
		space: d.space || '',
		is_sync_enabled: trueOrFalse(d.is_sync_enabled) || '',
		can_see_managed_users : trueOrFalse(d.can_see_managed_users) || '',
		is_exempt_from_device_limits : trueOrFalse(d.is_exempt_from_device_limits) || '',
		is_exempt_from_login_verification : trueOrFalse(d.is_exempt_from_login_verification || '')

	})
	return result
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

exports.post = post
exports.get = get
exports.put = put
exports.patch = patch
exports.setUserObject = setUserObject
exports.generate = generate
exports.trueOrFalse = trueOrFalse
exports.getHeaders = getHeaders
exports.tof = trueOrFalse