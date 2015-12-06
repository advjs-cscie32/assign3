angular.module('gzapi')
    .controller('DisplayController',['gdata','ztrans', function(gdata, ztrans){
        var dc = this;
        var promise = gdata.displayFile();
        promise.then(function(data){
            ztrans.zombify(data).then(function(zdata){
                dc.fileData = zdata.join('');
            });
        },function (err) {
            dc.fileData = err;
            console.log('Failed: ' + err);
        });

    }]);