var Hapi = require('hapi');
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
	method: 'POST',
	path: '/products/{id}',
	config: {
		handler: Handlers.updateProduct,
		validate: {
			payload: {
				name: Hapi.types.String().min(3),
				description: Hapi.types.String(),
				sku: Hapi.types.String(),
				price: Hapi.types.String()
			}
		}
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
		payload: { output: 'file' },
		validate: {
			payload: true
		}
	}
}]