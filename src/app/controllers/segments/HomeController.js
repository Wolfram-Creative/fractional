app.controller("HomeController", ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	'use strict';

	// Set Title and active page
	angular.extend($rootScope, {
		title: 'Home',
		active_page: 'home'
	});

	// Set methods and default models
	angular.extend($scope, {
		root: $rootScope,
		hero: {
			text: 'Common-sense responsive grid system for rapid development',
			img: '/img/fractional-1400.png'
		},
		scrollStartEnd : function (scroll, start_fade, end_fade) {
			if (scroll <= start_fade) {
				return 1;
			} else if (scroll > start_fade && scroll < end_fade) {
				var difference = (end_fade - start_fade),
					scroll_minus_min = scroll - start_fade;
				return 1 - (scroll_minus_min/difference);
			} else if (scroll >= end_fade) {
				return 0;
			}
		}
	});

	// if ($scope.root.logged_in) {
	// 	$location.path('/dashboard');
	// }

}]);
