var Hapi = require('hapi');
var mongoose = require('mongoose');
var Fs = require('fs');

var dbname = 'products';
var uri = 'mongodb://localhost/' + dbname;
console.log('connecting to %s', uri);

mongoose.connect(uri, function (err) {
	if (err) throw err;
	console.log('Connected to Mongo via Mongoose');
});


var routes = require('./routes');
var server = new Hapi.Server(8080);

server.route(routes);

server.start(function () {
	console.log('Server started at: ' + server.info.uri);
});