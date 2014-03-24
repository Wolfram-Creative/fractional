app.directive('showHtml', ['$window', function ($window) {
    'use strict';
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            var attr_class = attrs['class'],
                element = attrs.$$element.context.localName,
                html = '<' + element + ' class="' + attr_class + '"></' + element + '>',
                emmet = element + '.' + attr_class.replace(/ /g, '.'),
                $this = angular.element(elem),
                code_snippets = [ html, ' ', emmet ];
            console.log(emmet);
            $this.on('click', function () {
                $scope.$apply(function () {
                    $scope.root.modal = {
                        display: true,
                        text: 'Copy the HTML or Emmet and paste in your favorite editor:',
                        code_snippets : code_snippets
                    };
                });
            });
        }
    };
}]);
