;(function(){
    'use strict';

    angular.module('app.resources')
        .factory('ShopResourceFactory',ShopResourceFactory);
    ShopResourceFactory.$inject = [
        '$resource',
        '$log',
        'UriService'
    ];

    function ShopResourceFactory(
        $resource,
        $log,
        UriService
    ){
        $log.info('ShopResourceFactory');
       var url = UriService.getApi('shops');
       return $resource(url);
    }
})();