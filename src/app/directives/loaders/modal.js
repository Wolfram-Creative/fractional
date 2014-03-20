app.directive('ngModal', ['templates', function (templates) {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: templates.get('modal_overlay'),
		controller: 'ModalController'
	};
}]);
