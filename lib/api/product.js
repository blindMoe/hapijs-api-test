var Hapi = require('Hapi');
var models = require('./models.js');
var ProductModel = models.ProductModel;


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
			reply( products );
		});

		return;
	}
};


// update an existing product

exports.post = {

	validate: {
		payload: {
			name: Hapi.types.string().min(3),
			description: Hapi.types.string(),
			sku: Hapi.types.string(),
			price: Hapi.types.string()
		}
	},

	handler: function(request, reply) {

		ProductModel.findByIdAndUpdate(request.params.id, request.payload, function(err, saved) {

			if (err || !saved)
				reply('Could not update product: ', err);

			ProductModel.findById(request.params.id, function(err, product) {

				if (err || !saved)
					return reply('Could not update product: ', err);

				return reply(product);

			})

		});

		return;
	}

};


// Create new product

exports.put = {
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

		var productData = {
			name: request.payload.name,
			description: (request.payload.description) ? request.payload.description : '',
			price: (request.payload.price) ? request.payload.price : '',
			sku: (request.payload.sku) ? request.payload.sku : ''
		};

		var product = new ProductModel( productData );

		product.save( function(err) {
			if (err) console.log(err);
			reply(product).code(201).header('Location', '/products/' + product._id);
			return;
		});

		reply(product);
	}

};

exports.delete = {
/*
	validate: {
		payload: {
			id: Hapi.types.string().required().min(3)
		}
	},
*/
	handler: function(request, reply) {

		console.log('Params: ', request.params);
		console.log('Deleting: ', request.params.id);

		ProductModel.findByIdAndRemove( request.params.id, function(err, product) {

			console.log('Error: ', err);
			console.log('Product: ', product);

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

				reply({ 
					greeting: 'POST hello to ' + request.payload.name,
					message: 'File saved to ' + newFileName
				});

				console.log('File uploaded and saved to: ' + newFileName)

				Fs.unlink(f.path, function (err) {
					if (err) throw err;
				});

			});

		});

	}

}



exports.findProducts = function(queryParams, options, callback) {

	ProductModel.find(queryParams).exec( function(err, products) {

		if (err) {
			console.log( err );
			throw err;
		}

		callback(products);

	});

}
