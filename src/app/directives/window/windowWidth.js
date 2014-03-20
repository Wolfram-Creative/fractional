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
