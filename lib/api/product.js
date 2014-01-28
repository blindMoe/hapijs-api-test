var Hapi = require('Hapi');
var models = require('./models.js');


// get all products

exports.list = {

	validate: {
		query: {
			name: Hapi.types.string().optional()
		}
	},

	handler: function(request, reply) {

		var queryParams = {};
		var page = (request.query.page > 0 ? request.query.page : 1) - 1
		var perPage = 30
		var options = {
			perPage: perPage,
			page: page
		}

		if (request.query && request.query.name) {
			queryParams.name = request.query.name;
		}

		if (request.params && request.params.id) {
			queryParams._id = request.params.id;
		}

		exports.findProducts(queryParams, options, function(products) {
			return reply( products );
		});

		return;
	}
};



// get a single product

exports.get = {

	handler: function(request, reply) {

		queryParams = { _id : request.params.id };

		exports.findProducts(queryParams, {}, function(products) {
			return reply( products );
		});

		return;
	}
};


// update an existing product

exports.put = {
/*
	validate: {
		payload: {
			name: Hapi.types.string().min(3),
			description: Hapi.types.string(),
			sku: Hapi.types.string(),
			price: Hapi.types.string()
		}
	},
*/
	handler: function(request, reply) {

//		console.log('PUT Received:', request.payload);

		var ProductModel = models.ProductModel;

		var productData = {
				name: (request.payload.name) ? request.payload.name : '',
				sku: (request.payload.sku) ? request.payload.sku : '',
				description: (request.payload.description) ? request.payload.description : '',
				price: (request.payload.price) ? request.payload.price : '',
			};


		ProductModel.findByIdAndUpdate(request.payload._id, productData, function(err, saved) {

			if (err || !saved) {
				console.log('Error when updating Product:', err, saved);
				reply('Could not update product: ', err).code(500);
				return;
			}

			ProductModel.findById(request.params._id, function(err, product) {

				if (err) {
					console.log('Error when finding Product:', err, product);
					reply('Could not find product: ', err).code(500);
					return;
				}

				reply(product).code(200);
				return;

			})

		});

		return;
	}

};


// Create new product

exports.post = {
/*
	validate: {
		payload: {
			name: Hapi.types.string().required().min(3),
			description: Hapi.types.string(),
			sku: Hapi.types.string(),
			price: Hapi.types.string()
		}
	},
*/
	handler: function(request, reply) {

//		console.log('POST Received:', request.payload);

		var ProductModel = models.ProductModel;

		var productData = {
			name: request.payload.name,
			description: (request.payload.description) ? request.payload.description : '',
			price: (request.payload.price) ? request.payload.price : '',
			sku: (request.payload.sku) ? request.payload.sku : ''
		};

		var product = new ProductModel( productData );

		product.save( function(err) {
			if (err) console.log(err);
			return reply(product).code(201).header('Location', '/products/' + product._id);
		});

		reply(product);
	}

};

exports.delete = {

	validate: {
		query: {
			id: Hapi.types.string().required().min(3)
		}
	},

	handler: function(request, reply) {

		var ProductModel = models.ProductModel;

//		console.log('Params: ', request.params);
//		console.log('Deleting: ', request.params.id);

		ProductModel.findByIdAndRemove( request.params.id, function(err, product) {

//			console.log('Error: ', err);
//			console.log('Product: ', product);

			if (!err) {
				return reply(product).code(200);
			} else {
				return reply(err).code(500);
			}

		});

	}

};


exports.fileUpload = function(request, reply) {

	var Fs = require('fs');
	var uploadPath = __dirname + "/assets/uploads/products/";

	if (request.payload && request.payload.fileUpload) {

		var f = request.payload.fileUpload;

		inputFile = Fs.readFile(f.path, function (err, data) {

			if (err) throw err;

			var newFileName = uploadPath + f.filename;

			Fs.writeFile(newFileName, data, function (err) {

				if (err) throw err;

				console.log('File uploaded and saved to: ' + newFileName)

				Fs.unlink(f.path, function (err) {
					if (err) throw err;
				});

				return reply({ 
					greeting: 'POST hello to ' + request.payload.name,
					message: 'File saved to ' + newFileName
				});

			});

		});

	}

}



exports.findProducts = function(queryParams, options, callback) {

	var ProductModel = models.ProductModel;

	ProductModel.find(queryParams).exec( function(err, products) {

		if (err) {
			console.log( err );
			throw err;
		}

		callback(products);

	});

}
