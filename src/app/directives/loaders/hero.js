app.directive('ngHero', ['templates', function (templates) {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: templates.get('hero'),
		controller: 'HeroController'
	};
}]);
