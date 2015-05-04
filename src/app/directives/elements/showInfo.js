app.directive('showHtml', ['$window', function ($window) {
    'use strict';
    return {
        restrict: 'A',
        link: function ($scope, elem, attrs) {
            var attr_class = attrs['class'],
                element = attrs.$$element.context.localName,
                containerStart = '<div class="whole">',
                html = '    <' + element + ' class="' + attr_class + '"></' + element + '>',
                containerEnd = '</div>',
                $this = angular.element(elem),
                code_snippets = [html];

            if (attr_class.indexOf('/') > -1) {
                code_snippets = [containerStart, html, containerEnd];
            }
            $this.on('click', function () {
                $scope.$apply( function () {
                    $scope.root.modal = {
                        display: true,
                        text: 'Copy the HTML paste in your favorite editor:',
                        code_snippets : code_snippets
                    };
                });
            });
        }
    };
}]);
