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
