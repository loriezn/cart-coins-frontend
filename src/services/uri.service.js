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

        function getImagePath(image){
            var protocol = config.api.protocol ? config.api.protocol : $location.protocol(),
                host = config.api.host ? config.api.host : $location.host(),
                imageDir = config.images.campaignImagePath,
                uri = protocol + '://' + host + imageDir ;

            return uri;
        }

        return {
            getApi: getApi,
            getImagePath: getImagePath
        }

    }
})();