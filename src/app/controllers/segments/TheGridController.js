app.controller("TheGridController", ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	'use strict';

	// Set Title and active page
	angular.extend($rootScope, {
		title: 'The Grid',
		active_page: 'the-grid'
	});

	// Set methods and default models
	angular.extend($scope, {
		root: $rootScope
	});

	// if ($scope.root.logged_in) {
	// 	$location.path('/dashboard');
	// }

}]);