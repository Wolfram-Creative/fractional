app.directive('ngNavigation', ['templates', function (templates) {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: templates.get('navigation'),
		controller: 'NavigationController'
	};
}]);
