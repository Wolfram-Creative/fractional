app.directive('ngHeader', ['templates', function (templates) {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: templates.get('header'),
		controller: 'HeaderController'
	};
}]);
