app.directive('ngFooter', ['templates', function (templates) {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: templates.get('footer'),
		controller: 'FooterController'
	};
}]);
