var mongoose = require('../db/db');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
	'qty': Number,
	'orderdate': Date,
	'dlvdate': Date,
	'advance': Number,
	'customerid': {
		type: Schema.Types.ObjectId,
		ref: 'customer'
	},
	'delivered': Boolean,
	"items": [{
		'articlenumber': String,
		'category': String,
		'price': Number,
		'labourid': {
			type: Schema.Types.ObjectId,
			ref: 'labour'
		},
		'cost': Number
	}]
});

module.exports = mongoose.model('order', orderSchema);
