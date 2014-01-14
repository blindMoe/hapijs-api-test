var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.productSchema = new Schema({
	name:  String,
	sku: String,
	price: String,
	description:   String,
	comments: [{ body: String, date: Date }],
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	meta: {
		votes: Number,
		favs:  Number
	}
});

