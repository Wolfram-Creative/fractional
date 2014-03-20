app.controller("HomeController", ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	'use strict';

	// Set Title and active page
	angular.extend($rootScope, {
		title: 'Home'
	});

	// Set methods and default models
	angular.extend($scope, {
		root: $rootScope,
		hero: {
			text: 'Common-sense responsive grid system for rapid development',
			img: '/img/fractional-1400.png'
		},
		tooltip: ''
	});

	if ($scope.root.logged_in) {
		$location.path('/dashboard');
	}

}]);
