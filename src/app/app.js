var app = angular.module("app", ['ngRoute', 'ngAnimate', 'dateTimeFilters', 'angular-loading-bar']);

function __Object() {
	this.keys = function (obj) {
		var key_list = [];
		if (typeof obj !== 'undefined' && obj !== null && typeof obj === 'object') {
			if (typeof obj.length === 'undefined') {
				for (var key in obj) {
					key_list.push(key);
				}
			} else if (typeof obj.length === 'number') {
				key_list = obj.slice();
			}
		}
		if (typeof obj !== 'object') {
			console.warn(obj + ' Is not an object, it is a ' + typeof obj);
		}
		return key_list;
	};
}
var _Object = new __Object();

app.run(['$rootScope', '$http', '$location', '_$local', '$anchorScroll', function ($rootScope, $http, $location, _$local, $anchorScroll) {
	'use strict';

	// Set up App information
	angular.extend($rootScope, {
		appTitle: 'fractional.CSS',
		modal: {},
		window_height: window.innerHeight,
		showDownload: function () {
			$rootScope.modal = {
				display: true,
				text: 'Download fractional.css',
				button_a : {
					link: '/downloads/fractional.min.css',
					text: 'fractional.min.css(14kb)'
				},
				button_b : {
					link: '/downloads/fractional.css',
					text: 'fractional.css(18kb)'
				},
				button_c : {
					link: '/downloads/fractional.less',
					text: 'fractional.less(19kb)'
				}
			};
		}
	});

	$rootScope
		.$on('$locationChangeStart', function (ev, next, current) {
			$anchorScroll();
			$rootScope.active_page = '';
			$rootScope.title = 'math + CSS';
		});
	$rootScope
		.$on('$locationChangeSuccess', function (ev, next, current) {
			if (angular.isDefined(ga)) {
				ga('send', 'pageview', $location.path());
			}
		});

}]);
