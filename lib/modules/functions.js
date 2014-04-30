var request = require("request")
var crypto = require("crypto")
var fs = require('fs')
var qs = require('querystring')

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

makeRequest = function (callb,path,data,headers,method){
	var options = {
		method  : method,
		url     : path,
		headers : headers			
	}
	if( Object.prototype.toString.call(data) === '[object Array]' ) {
		options.multipart = data
	}else{
		options.body = data
	}
	request(options, function(error,response,body){	
		switch(true){
			case(typeof body == 'object'):
				callb(body,response.statusCode)
			break
			case(typeof body == 'string'):
				callb(body,response.statusCode)
			break
		}
	})
}
uploadFile = function (callb,path,file,headers) {
	switch(true){
		case (file.data == null):
			var f = fs.createReadStream(file.filename,{encoding : 'binary'})
			file.data = ''
			f.on('data',function(chunk) {
				file.data = file.data + chunk
			})
			f.on('end', function(){
				uploadRequest(callb,path,file,headers)
			})
			break
		default:
			uploadRequest(callb,path,file,headers)
	}
}
function uploadRequest(callb,path,file,headers){
	var name = file.filename.split('/')
	name = name[name.length - 1]
	var multipart =
	[
		{
			"content-type" : 'application/octet-stream',
			"Content-Disposition" : 'form-data;' + 'filename="' + name +'";name="filename"',
			body: new Buffer(file.data,'binary')
		}
		,{
			"Content-Disposition" :'form-data; name="parent_id";',
			body: file.parent_id.toString()
		}
	]
	makeRequest(callb,path,multipart,headers,'post')
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
		break
	case 'post':
		result = {
			'content-type' : 'application/x-www-form-urlencoded',
			'Authorization' : boxAuthHead(token)
		}
		break
	case 'upload':
		result = {
			'content-type' : 'multipart/form-data',
			'Authorization' : boxAuthHead(token)
		}
		break
	default:
		result = {'content-type' : 'application/x-www-form-urlencoded'}
	}
	if (typeof content !== 'undefined' && typeof content.user !== 'undefined') result['As-User'] = content.user
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

exports.makeRequest = makeRequest
exports.uploadFile = uploadFile
exports.setUserObject = setUserObject
exports.generate = generate
exports.trueOrFalse = trueOrFalse
exports.getHeaders = getHeaders
exports.tof = trueOrFalse