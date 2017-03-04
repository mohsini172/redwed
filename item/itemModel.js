var mongoose = require('../db/db');
var Schema   = mongoose.Schema;

var itemSchema = new Schema({
	'articlenumber' : String,
	'category' : String,
	'price' : Number,
	'orderid' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'order'
	},
	'labourid' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'labour'
	},
	'cost' : Number
});

module.exports = mongoose.model('item', itemSchema);
