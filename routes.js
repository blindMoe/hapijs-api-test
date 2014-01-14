var Hapi = require('hapi');
var Fs = require('fs');
var Handlers = require('./handlers.js');

module.exports = [
{
	method: 'GET',
	path: '/products',
	config: {
		handler: Handlers.getProducts,
		validate: {
			query: {
				name: Hapi.types.String()
			}
		}
	}
},
{
	method: 'GET',
	path: '/products/{id}',
	config: {
		handler: Handlers.getProducts
	}
},
{
	method: 'DELETE',
	path: '/products',
	config: {
		handler: Handlers.delProduct,
		validate: {
			payload: {
				id: Hapi.types.String().required().min(3)
			}
		}
	}
},
{
	method: 'POST',
	path: '/products',
	config: {
		handler: Handlers.addProduct,
		validate: {
			payload: {
				name: Hapi.types.String().required().min(3),
				description: Hapi.types.String(),
				sku: Hapi.types.String(),
				price: Hapi.types.String()
			}
		}
	}
},
{
	method: 'POST',
	path: '/fileUpload',
	config: {
		handler: Handlers.fileUpload,
		validate: {
			payload: true
		}
	}
}]