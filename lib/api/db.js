var mongoose = require('mongoose');

var dbname = 'products';
var uri = 'mongodb://localhost/' + dbname;
console.log('connecting to %s', uri);

mongoose.connect(uri, function (err) {
	if (err) throw err;
	console.log('Connected to Mongo via Mongoose');
});

exports.mongoose = mongoose;