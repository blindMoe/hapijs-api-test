var mongoose = require('mongoose');
var schemas = require('./schemas.js');

exports.ProductModel = mongoose.model('Product', schemas.productSchema);
