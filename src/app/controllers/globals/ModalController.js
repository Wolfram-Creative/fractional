app.controller("ModalController", ['$scope', '$rootScope', '$location', '_$local', function($scope, $rootScope, $location, _$local) {
	'use strict';

	// Set methods and default models
	angular.extend($scope, {
		root: $rootScope,
		hideModal: function () {
			$rootScope.modal.display = false;
		}
	});
	
}]); 
