app.directive('ngEnterKey', function () {
	'use strict';
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			angular.element(elem).on('keyup', function (k) {
				var key = k.keyCode;
				if (key === 13) {
					var callback = attrs.ngEnterKey;
					scope.$apply(callback);
				}
			});
		}
	};
});
