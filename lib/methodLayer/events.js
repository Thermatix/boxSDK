var urlB = require("../modules/urlBuilder").build
var qs = require('querystring')
var crypto = require('crypto')
var stream = require('stream')
var eventEmitter = require('events').EventEmitter
var util = require('util')

// pass = needs id but can 'pass' query with object instead (along with id).
// data + id needs seperate object and id value.
// id = only need to pass id value
// query = can pass query
// all with query have default values

// will probably need to impliment with streams

getForUser = function (client,query,callback) {
	var path = urlB.host('api').object('events').url
	client.get(path,callback)
}

export.getForUser = getForUser
getForEnterprise = function (client,query,callback) {
	var path = urlB.host('api').object('events').url + '?stream_type=admin_logs'
	client.get(path,callback)
}
exports.getForEnterprise = getForEnterprise
longPolling = function (client,query,callback) {
	var path = urlB.host('api').object('events').url
	client.options(path,callback)
}
exports.longPolling = longPolling

pollStreamWrapper = function (client,query,opt){

	req = function(reqPath,caller) {
  	client.options(reqPath,function (response,statcode){
  		var response = JSON.stringify(response)
  		switch(response.message){
  			case 'reconnect':
  				process.nextTick(req(reqPath,caller))
  			break
  			case 'new_change':
          client.get(caller.path + '?' + caller.admin + caller.limit +'stream_position=' + caller.streamPosition, function (res,sc) {
          	var res = JSON.stringify(res)
          	caller.streamPosition = res.next_Stream_position
          	for(entry in res.entries){
          		push(entry)
          	}
          	process.nextTick(req(reqPath,caller))
          })
  			break
  		default:
  		  throw new Error('Unknown response')
  		}
  	})
  }

  streamer = function (client,query,opt){
  	if(typeof query == 'undefined' || query == null) throw new Error("'query' can't be undefined or null, pass {} for no queryies")
  	this.path = urlB.host('api').object('events').url
  	this.streamPath = ''
  	this.streamPosition = query.streamPosition || 0
  	this.admin = query.admin == true ? 'stream_type=admin_logs&' : ''
  	this.limit = 'limit=' + query.limit + '&' || ''
  	client.get(this.path + '?stream_position='(this.streamPosition || 'now'), function (response,statcode) {
  		this.streamPosition = JSON.stringify(response).next_Stream_position
	  	client.options(path,function (response,statcode){
	  		this.streamPath = JSON.stringify(response).url
	  	})
  	})
  	Readable.call(this, opt)
  }

  util.inherits(streamer,stream.Readable)

  streamer.prototype._read() {
	  process.nextTick(req(this.streamPath,this))
  }

  return new streamer(client,query,opt)
}

exports.streamer = pollStreamWrapper