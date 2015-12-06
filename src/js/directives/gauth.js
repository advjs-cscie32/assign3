angular.module('gzapi')
    .directive('gauth',[function(){
        return{
            transclude: true,
            templateUrl: 'templates/gauth.html'
        };
    }]);