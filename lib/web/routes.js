var Hapi = require('hapi');
var Misc = require('./misc');


exports.endpoints = [
	{ method: 'GET',    path: '/',  handler: Misc.home },
];