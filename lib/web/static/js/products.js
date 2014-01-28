var productApp = angular.module('productApp', [ "ngResource" ]);
 
productApp.controller('ProductListCtl', function ($scope, $resource) {

	var Products = $resource('http://localhost\\:8081/products/:id', {}, {
			query: {method:'GET', params:{id:''}, isArray:true},
			post: {method:'POST'},
			update: {method:'PUT', params: {id: '@id'}},
			remove: {method:'DELETE'},
			delete: {method:'DELETE'},
		});

	$scope.products = Products.query();

	$scope.editProduct = function(product) {

		console.log(product);

		if (product === 'new') {

		  $scope.newProduct = true;
		  $scope.product = {name: '', desciption: '', sku: '', price: ''};

		} else {

		  $scope.newProduct = false;
		  $scope.product = product;

		}

	};

	$scope.saveProduct = function(product) {

		console.log('Saving Product:', product);

		if (product._id)
			Products.update({ id: product._id}, product);
		else {
			Products.post({ id: product._id}, product);
			$scope.products.push(product);
		}

	}

	$scope.deleteProduct = function(product) {
		console.log('Deleting Product:', product);

		$scope.products.forEach(function(e, index) {
			if (e._id == $scope.product._id) {
				$scope.product.$delete({id: $scope.product._id, rev: $scope.product._rev}, function() {
					$scope.products.splice(index, 1);
				});
			}
		});

	}

});


