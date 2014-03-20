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

app.run(['$rootScope', '$http', '_$local', '$anchorScroll', function ($rootScope, $http, _$local, $anchorScroll) {
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
					link: '/fractional.min.css',
					text: 'fractional.min.css(26kb)'
				},
				button_b : {
					link: '/fractional.css',
					text: 'fractional.css(49kb)'
				}
			};
		}
	});

	$rootScope
		.$on('$locationChangeStart', function(ev, next, current) {
			$anchorScroll();
			$rootScope.active_page = '';
			$rootScope.title = 'math + CSS';
		});

}]);

app.provider('templates', function () {
    'use strict';
    var _this = this;
    angular.extend(this, {
        get:function (template) {
            return '/views/' + template + '.ng';
        }
    });
    this.$get = function () {
        return _this;
    };

});

app.config(['$routeProvider', '$locationProvider', 'templatesProvider', function($routeProvider, $locationProvider, templatesProvider) {
    'use strict';

    $locationProvider
        .html5Mode(true)
        .hashPrefix('!');

    $routeProvider
        .when('/', {
            templateUrl: templatesProvider.get('home'),
            controller: 'HomeController'
        })
        .otherwise({ 
            redirectTo: '/' 
        });
}]);

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

app.controller("FooterController", ['$scope', '$rootScope', '$location', '_$local', function($scope, $rootScope, $location, _$local) {
	'use strict';
	$scope.root = $rootScope;
}]); 

app.controller("HeaderController", ['$scope', '$rootScope', '$location', '_$local', 'templates', function($scope, $rootScope, $location, _$local, templates) {
	'use strict';

	angular.extend($scope, {
		root : $rootScope
	});
}]); 

app.controller("HomeController", ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
	'use strict';

	// Set Title and active page
	angular.extend($rootScope, {
		title: 'Home'
	});

	// Set methods and default models
	angular.extend($scope, {
		root: $rootScope
	});

	if ($scope.root.logged_in) {
		$location.path('/dashboard');
	}

}]);

app.directive('elementHeight', ['$window', function ($window) {
    var $window_element = angular.element($window);
    return {
        link: function (scope, element, attrs) {
            var handler = function () {
                scope.element_height = element.context.clientHeight;
            };
            $window_element.on('resize', scope.$apply.bind(scope, handler));
            handler();
        }
    }; 
}]);

app.directive('elementWidth', ['$window', function ($window) {
    var $window_element = angular.element($window);
    return {
        link: function (scope, element, attrs) {
            var handler = function () {
                scope.element_width = element.context.clientWidth;
            };
            $window_element.on('resize', scope.$apply.bind(scope, handler));
            handler();
        }
    }; 
}]);

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

app.directive('ngFocusMe', ['$timeout', '$parse', function($timeout, $parse) {
    return {
        link: function(scope, element, attrs) {
            var model = $parse(attrs.ngFocusMe);
            scope.$watch(model, function(value) {
                if(value === true) { 
                    $timeout(function() {
                        element[0].focus(); 
                    });
                }
            });
            element.bind('blur', function() {
                scope.$apply(model.assign(scope, false));
            });
        }
    };
}]);

app.directive('ngFooter', ['templates', function (templates) {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: templates.get('footer'),
		controller: 'FooterController'
	};
}]);

app.directive('ngHeader', ['templates', function (templates) {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: templates.get('header'),
		controller: 'HeaderController'
	};
}]);

app.directive('ngModal', ['templates', function (templates) {
	'use strict';
	return {
		restrict: 'A',
		templateUrl: templates.get('modal_overlay'),
		controller: 'ModalController'
	};
}]);

app.directive('ngDrag', function () {
	'use strict';
	return {
		restrict: 'A',

		link: function (scope, elem, attrs) {
			var $this = angular.element(elem);
			$this.attr('draggable', true);
			$this.on('dragstart', function (event) {
				event.target.style.opacity = 0.2;
				event.originalEvent.dataTransfer.setData('text/plain', true);
				app.dragged_id = $this.attr('drag-id');
				if ($this.attr('reorder')) {
					app.dragged_reorder_key = $this.attr('reorder');
				} else {
					app.dragged_reorder_key = false;
				}
			});
			$this.on('dragend', function (event) {
				event.target.style.opacity = '';
			});
		}
	};
});

app.directive('ngDrop', function () {
	'use strict';
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			var $this = angular.element(elem);
			$this.on('dragover', function (event) {
				event.preventDefault();
			});
			$this.on('dragenter', function (event) {
				event.preventDefault();
				$this.addClass('dragging');
			});
			$this.on('dragleave', function () {
				$this.removeClass('dragging');
			});
			$this.on('drop', function (event) {
				event.preventDefault();
				$this.removeClass('dragging');
				var callback = attrs.ngDrop;
				scope.$apply(callback);
			});
		}
	};
});

app.directive('scrollPosition', ['$window', function ($window) {
    return {
        link: function (scope, element, attrs) {
            var $window_element = angular.element($window);
            var handler = function () {
                scope.scroll = $window_element.scrollTop();
            };
            $window_element.on('scroll', scope.$apply.bind(scope, handler));
            handler();
        }
    }; 
}]);

app.directive('windowHeight', ['$window', function ($window) {
    var $window_element = angular.element($window);
    return {
        link: function (scope, element, attrs) {
            var handler = function () {
                scope.window_height = window.innerHeight;
            };
            $window_element.on('resize', scope.$apply.bind(scope, handler));
            handler();
        }
    }; 
}]);

app.directive('windowWidth', ['$window', function ($window) {
    var $window_element = angular.element($window);
    return {
        link: function (scope, element, attrs) {
            var handler = function () {
                scope.window_width = window.innerWidth;
            };
            $window_element.on('resize', scope.$apply.bind(scope, handler));
            handler();
        }
    };  
}]);

angular.module('dateTimeFilters', [])
	.filter('duration', function() {
		return function(ms) {
			var formatted_time,
				seconds = parseInt(ms/1000, 10),
				minutes = parseInt(ms/1000/60, 10),
				hours = parseInt(ms/1000/60/60, 10),
				days = Number(ms/1000/60/60/24, 10).toFixed(0),
				ms_loc = "ms",
				seconds_loc = "sec",
				minutes_loc = "min",
				hours_loc = "hours",
				days_loc = "days";
			if (seconds < 1) {
				formatted_time = ms + ' ' + ms_loc;
			}
			if (seconds >= 1 && seconds < 60) {
				formatted_time = seconds + ' ' + seconds_loc;
			}
			if (minutes >= 1 && minutes < 60) {
				leftover_seconds = seconds - (60 * minutes);
				formatted_time = minutes + ' ' + minutes_loc;
				if (leftover_seconds) {
					formatted_time += ', ' + leftover_seconds + ' ' + seconds_loc;
				}
			}
			if (hours >= 1 && hours < 24) {
				var leftover_minutes = minutes - (60 * hours),
					leftover_seconds = seconds - (60 * leftover_minutes);
				formatted_time = hours + ' ' + minutes_loc;
				if (leftover_minutes) {
					formatted_time += ', ' + leftover_minutes + ' ' + minutes_loc;
				}
				if (leftover_seconds) {
					formatted_time += ', ' + leftover_seconds + ' ' + seconds_loc;
				}
			}
			if (days >= 1) {
				formatted_time = days + ' ' + days_loc;
			}
			return formatted_time;
		};
	});

app.filter('obj_key', function(){
	return function(input, query){
		if(!query) return input;
			var result = {};
			var lower_query = query.toLowerCase();
			for (var key in input) {
				lower_key = key.toLowerCase();
				if(lower_key.indexOf(lower_query) > -1) {
					result[key] = input[key];
			}
		}
		return result;
	};
});

app.factory('_$local', [function() {
    'use strict';
    //Handles Local Storage
    return {
        set : function (key, obj) {
            localStorage.setItem(key, JSON.stringify(obj));
            return obj;
        },
        get : function (key) {
            var obj = {};
            if (localStorage.getItem(key) !== 'undefined') {
                obj = JSON.parse(localStorage.getItem(key));
            }
            return obj;
        },
        clear : function () {
            localStorage.clear();
            return this;
        },
        remove : function (key) {
            localStorage.removeItem(key);
            return this;
        }
    };
}]);
