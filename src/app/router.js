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
