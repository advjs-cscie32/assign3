angular.module('gzapi')
    .service('gdata', ['$q','$http','config', function($q, $http, config){
        var gds = this;
        gds.deferred = $q.defer();
        gds.currentFileId='';

        /**
         * Check if current user has authorized this application.
         */
        gds.login = function() {
            gds.deferred = $q.defer();
            gapi.auth.authorize(
                {
                    'client_id': config.clientId,
                    'scope': config.scopes.join(' '),
                    'immediate': false
                }, gds.handleAuthResult);
            return gds.deferred.promise;
        };

        gds.handleAuthResult = function(authResult) {
            if (authResult && !authResult.error) {
                var files = [];
                gapi.client.load('drive', 'v2', function () {
                    var request = gapi.client.drive.files.list({
                        'maxResults': 10,
                        'q': "mimeType = 'application/vnd.google-apps.document'"
                    });
                    request.execute(function (resp) {
                        files = resp.items;
                        gds.deferred.resolve(files);
                    });
                });

            } else {
                gds.deferred.reject('error');
            }
        };

        gds.displayFile = function(){
            gds.deferred = $q.defer();
            if(!gds.currentFileId){
                gds.deferred.reject("no file selected");
                return gds.deferred.promise;
            }
            var fileId = gds.currentFileId;
            var request = gapi.client.drive.files.get({fileId: fileId});
            request.execute(function (resp){
                var accessToken = gapi.auth.getToken().access_token;
                var url = resp.exportLinks["text/plain"];
                var config = {
                    headers:{'Authorization' : "Bearer "+accessToken}
                };
                $http.get(url, config).then(function(fresp){
                    gds.deferred.resolve(fresp.data);
                });


            });

            return gds.deferred.promise;
        };

    }]);
