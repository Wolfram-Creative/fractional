app.controller("ResponsiveController", ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	'use strict';

	// Set Title and active page
	angular.extend($rootScope, {
		title: 'Responsive',
		active_page: 'responsive'
	});

	// Set methods and default models
	angular.extend($scope, {
		root: $rootScope
	});

	// if ($scope.root.logged_in) {
	// 	$location.path('/dashboard');
	// }

}]);