angular.module('gzapi')
    .controller('ListController', ['gdata','$location', function(gdata, $location){
        var lc = this;
        lc.files=[];
        lc.file='';
        lc.authorize = function(){
            var promise = gdata.login();
            promise.then(function(data){
                lc.files = data;
            },function (err) {
                    console.log('Failed: ' + err);
            });

        };

        lc.display = function(fileid){
            var promise = gdata.currentFileId= fileid;
            $location.path('/document');
        };

    }]);