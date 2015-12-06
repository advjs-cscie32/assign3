angular.module('gzapi', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/list',{
                templateUrl: 'templates/list.html'
            })
            .when('/document',{
                templateUrl:'templates/document.html'
            })
            .otherwise({
                redirectTo:'/list'
            });
    }]);