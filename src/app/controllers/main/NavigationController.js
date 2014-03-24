app.controller("NavigationController", ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	'use strict';

	angular.extend($rootScope, {
	});

	// Set methods and default models
	angular.extend($scope, {
		root: $rootScope
	});

	if ($scope.root.logged_in) {
		$location.path('/dashboard');
	}

}]);
