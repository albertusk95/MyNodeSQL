var app = angular.module('mynodesql', ['ngRoute', 'searchRes'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: '/searchRes'
    });
}]);