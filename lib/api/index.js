var Hapi = require('hapi');
var Routes = require('./routes');
var Config = require('../config');
var Db = require('./db');

var server = new Hapi.Server(Config.server.api.port, Config.server.api.host);

server.route(Routes.endpoints);

server.start(function () {
	console.log('API Server started at: ' + server.info.uri);
});


