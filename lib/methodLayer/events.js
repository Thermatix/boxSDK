var urlB = require("../modules/urlBuilder").build
var qs = require('querystring')
var crypto = require('crypto')
var stream = require('stream')
var util = require('util')

// pass = needs id but can 'pass' query with object instead (along with id).
// data + id needs seperate object and id value.
// id = only need to pass id value
// query = can pass query
// all with query have default values

// will probably need to impliment with streams