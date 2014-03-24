app.controller("HomeController", ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	'use strict';

	// Set Title and active page
	angular.extend($rootScope, {
		title: 'How it works',
		active_page: 'how-it-works'
	});

	// Set methods and default models
	angular.extend($scope, {
		root: $rootScope
	});

	// if ($scope.root.logged_in) {
	// 	$location.path('/dashboard');
	// }

}]);
