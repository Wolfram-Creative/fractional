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
