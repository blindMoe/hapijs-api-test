var Product = require('../api/product.js');

exports.home = function (request, reply) {

	products = Product.list;

	var locals = {
		products: products
	}

    return reply.view('index', locals).code(200);

};