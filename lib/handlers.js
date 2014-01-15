var Fs = require('fs');
var models = require('./models.js');


var Product = models.ProductModel;

function findProducts(queryParams, options, callback) {

	Product.find(queryParams).exec( function(err, products) {

		if (err) {
			console.log( err );
			return callback(err, '500');
		}

    	callback(products);

	});

}


exports.getProduct = function(request, reply) {

	queryParams = { _id : request.params.id };

	findProducts(queryParams, {}, function(products) {

		reply( products );

	});

}


exports.getProducts = function(request, reply) {

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

	findProducts(queryParams, options, function(products) {

		reply( products );

	});

}


exports.updateProduct = function(request, reply) {

	Product.findByIdAndUpdate(request.params.id, request.payload, function(err, saved) {

		if (err || !saved)
			reply('Could not update product: ', err);

		Product.findById(request.params.id, function(err, product) {

			if (err || !saved)
				reply('Could not update product: ', err);

			reply(product);

		})

	});

	return;
}



exports.addProduct = function(request, reply) {

    var productData = {
        name: request.payload.name,
        description: (request.payload.description) ? request.payload.description : '',
        price: (request.payload.price) ? request.payload.price : '',
        sku: (request.payload.sku) ? request.payload.sku : ''
    };

    var product = new Product( productData );

    product.save( function(err) {
		if (err) console.log(err);
	    reply(product).code(201).header('Location', '/products/' + product._id);
	    return;
    });

    reply(product);
}


exports.delProduct = function(request, reply) {

	Product.findByIdAndRemove( request.payload.id, function(err, product) {

		if (!err) {
			reply(product).code(200);
		} else {
			console.log( err, product );
			reply(err).code(500);
		}

	});

}


exports.fileUpload = function(request, reply) {

    console.log("Received POST from " + request.payload.name + "; id=" + (request.payload.id || 'anon'));
    console.log(request.payload);

    if (request.payload && request.payload.file) {

        var f = request.payload.file;
        console.log("uploadFile " + f.originalFilename + " (" + f.size + " bytes) at " + f.path);
        console.log("that you should persist to storage and remove from temp folder");

        // Use fs for this one: http://nodejs.org/api/fs.html
        Fs.unlink(f.path, function (err) {
            if (err) throw err;
                console.log('successfully deleted ' + f.path);
        });
    }

    reply({ 
        greeting: 'POST hello to ' + request.payload.name
    });
}

