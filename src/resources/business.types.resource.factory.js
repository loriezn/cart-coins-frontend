;(function(){
    'use strict';

    angular.module('app.resources')
        .factory('BusinessTypesResourceFactory',BusinessTypesResourceFactory);

    BusinessTypesResourceFactory.$inject = [
        '$resource',
        '$log',
        'UriService'
    ];

    function BusinessTypesResourceFactory(
        $resource,
        $log,
        UriService
    ){
        $log.info('BusinessTypesResourceFactory');

        var url = UriService.getApi('business-types')

        return $resource(url);
    }
})();