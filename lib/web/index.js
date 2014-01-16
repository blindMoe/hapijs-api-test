var Hapi = require('hapi');
var Routes = require('./routes');
var Config = require('../config');

var server = new Hapi.Server(Config.server.web.port, Config.server.web.host);

server.views({
		path: __dirname + '/views',
		engines: {
			jade: 'jade'
		},
		compileOptions: {
			colons: true,
			pretty: true
		}
	});

server.route(Routes);

server.start(function () {
	console.log('Web Server started at: ' + server.info.uri);
});