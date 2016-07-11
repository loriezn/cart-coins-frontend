(function(){
    'use strict';

    angular.module('app.services')
        .service('UriService',UriService);

    UriService.$inject = [
        '$location',
        'config'
    ];

    function UriService(
        $location,
        config
    ){
        function getApi(path) {
            var protocol = config.api.protocol ? config.api.protocol : $location.protocol(),
                host = config.api.host ? config.api.host : $location.host(),
                uri = protocol + '://' + host + config.api.path + path;

            return uri;
        }

        return {
            getApi: getApi
        }

    }
})();