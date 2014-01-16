var Hapi = require('hapi');
var Product = require('./product.js');

exports.endpoints = [

	{ method: 'GET', path: '/products', config: Product.list },
	{ method: 'GET', path: '/products/{id}', config: Product.get },
	{ method: 'POST', path: '/products/{id}', config: Product.post },
	{ method: 'DELETE', path: '/products/{id}', config: Product.delete },
	{ method: 'PUT', path: '/products', config: Product.put },
	{
		method: 'POST',
		path: '/fileUpload',
		config: {
			handler: Product.fileUpload,
			payload: { output: 'file' },
			validate: {
				payload: true
			}
		}
	}
]