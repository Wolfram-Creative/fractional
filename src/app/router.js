app.config(['$routeProvider', '$locationProvider', 'templatesProvider', function($routeProvider, $locationProvider, templatesProvider) {
    'use strict';
    var templates = templatesProvider;

    $locationProvider
        .html5Mode(true)
        .hashPrefix('!');

    $routeProvider
        .when('/', {
            templateUrl: templates.get('home'),
            controller: 'HomeController'
        })
        .when('/the-grid', {
            templateUrl: templates.get('the_grid'),
            controller: 'TheGridController'
        })
        .when('/responsive', {
            templateUrl: templates.get('responsive'),
            controller: 'ResponsiveController'
        })
        .otherwise({ 
            redirectTo: '/' 
        });
}]);
