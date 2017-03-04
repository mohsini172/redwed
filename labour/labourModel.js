var mongoose = require('../db/db');
var Schema   = mongoose.Schema;

var labourSchema = new Schema({
	'name' : String,
	'phone' : String,
	'category' : String,
	'comments' : String,
	'strength' : String,
	'hiredate' : Date
});

module.exports = mongoose.model('labour', labourSchema);
