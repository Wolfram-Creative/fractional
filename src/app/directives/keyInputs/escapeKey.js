app.directive('ngEscapeKey', function () {
	'use strict';
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			angular.element(elem).on('keyup', function (k) {
				var key = k.keyCode;
				if (key === 27) {
					var callback = attrs.ngEscapeKey;
					scope.$apply(callback);
				}
			});
		}
	};
});
