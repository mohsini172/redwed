var mongoose = require('../db/db');
var Schema   = mongoose.Schema;

var customerSchema = new Schema({
	'cname' : String,
	'phone1' : String,
	'phone2' : String,
	'email' : String,
	'city' : String
});

module.exports = mongoose.model('customer', customerSchema);
