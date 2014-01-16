var Hapi = require('hapi');
var Product = require('./product.js');

module.exports = [
{
	method: 'GET',
	path: '/products',
	config: {
		handler: Product.getProducts,
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
		handler: Product.getProducts
	}
},
{
	method: 'POST',
	path: '/products/{id}',
	config: {
		handler: Product.updateProduct,
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
		handler: Product.delProduct,
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
		handler: Product.addProduct,
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
		handler: Product.fileUpload,
		payload: { output: 'file' },
		validate: {
			payload: true
		}
	}
}]