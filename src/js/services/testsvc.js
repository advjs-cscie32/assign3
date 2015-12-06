angular.module('gzapi')
    .service('testsvc',['$http', '$q', function($http, $q){

        var svc = this;
        svc.login = function(){
            var deferred = $q.defer();
            $http.get('http://jsonplaceholder.typicode.com/users')
                .then(function(response){
                    console.log('service data - ',response.data);
                    var j = 0;
                    for (var i=0; i<100000; i++) {
                        j = j + i;
                    }
                    console.log(j);
                    deferred.resolve(response.data)
                });
            return deferred.promise;
        }

    }]);