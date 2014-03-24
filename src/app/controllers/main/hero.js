app.controller("HeroController", ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	'use strict';

	angular.extend($rootScope, {
	});

	// Set methods and default models
	angular.extend($scope, {
		root: $rootScope,
		hero: {
			text: 'Common-sense responsive grid system for rapid development',
			img: '/img/fractional-1400.png'
		}
	});

	if ($scope.root.logged_in) {
		$location.path('/dashboard');
	}

}]);
