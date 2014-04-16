var request = require("request")
var crypto = require("crypto");
var fs = require('fs');

makeRequest = function (callb,path,data,headers,method){
	var options = {
				method  : method,
				url     : path,
				headers : headers,
				body : data
	}

	console.log(JSON.stringify(options))
	request(options, function(error,response,body){	
		switch(true){
			case(typeof body == 'object'):
				callb(body,response.statusCode)
			break
			case(typeof body == 'string'):
				callb(JSON.parse(body),response.statusCode)
			break
		}
		
	})
}

get = function (callb,path, headers) {	
	makeRequest(callb, path, null, headers,'GET')
}

post = function (callb,path, data, headers) {
	makeRequest(callb, path, data, headers,'post')
}
put = function (callb,path, data, headers) {
	makeRequest(callb, path, data, headers,'PUT')
}

patch = function (callb,path, data, headers) {
	makeRequest(callb, path, data, headers,'PATCH')
}

delte = function (callb,path, headers) {
	makeRequest(callb, path, null, headers,'DELETE')
}
upload = function (callb,path,file,headers) {
	var options = {
				method  : 'PUT',
				url     : path,
				headers : headers
	}
	fs.createReadStream(file).pipe(request.put(options,
		function (error,response,body){
			callb(JSON.parse(response),response.statusCode)
	}))
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

getHeaders = function (token,type,content){
	var result = {}
	switch(type){
	case 'get':
		result = {
			'Authorization' : boxAuthHead(token)
		}
		break;
	case 'post':
		result = {
			'content-type' : 'application/x-www-form-urlencoded',
			'Authorization' : boxAuthHead(token)
		}
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
exports.delte = delte
exports.upload = upload
exports.setUserObject = setUserObject
exports.generate = generate
exports.trueOrFalse = trueOrFalse
exports.getHeaders = getHeaders
exports.tof = trueOrFalse