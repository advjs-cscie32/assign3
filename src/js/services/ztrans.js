angular.module('gzapi')
    .service('ztrans',['$http','$q',function($http, $q){
        var zt = this;
        zt.zdata = '';
        zt.zombify = function(data){
            var promises = [];
            var chunks = stringChunker(data, 2000);
            angular.forEach(chunks, function(value, index){
                promises.push(makeRequest(value,index))
            });
            return $q.all(promises);
        };

        function stringChunker (str, len){
            var size = Math.ceil(str.length/len);
            var chunks  = new Array(size);
            var offset ;

            for (var i=0; i<size; i++) {
                offset = i * len;
                chunks[i] = str.substring(offset, offset + len);
            }
            return chunks;
        };

        function makeRequest(data, index){
            var deferred = $q.defer();
            $http({
                url:'http://ancient-anchorage-9224.herokuapp.com/zombify',
                method:'GET',
                params:{'q':data}
            }).then(function successCallback(response){
                deferred.resolve(response.data.message);
            }, function errorCallback(response){
                console.log('Error in ztrans', response);
            });
            return deferred.promise;
        };

    }]);