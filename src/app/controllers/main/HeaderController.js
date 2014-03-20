app.controller("HeaderController", ['$scope', '$rootScope', '$location', '_$local', 'templates', function($scope, $rootScope, $location, _$local, templates) {
	'use strict';

	angular.extend($scope, {
		root : $rootScope
	});
}]); 
