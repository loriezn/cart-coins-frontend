;(function(){
    'use strict';

    angular.module('app.resources')
        .factory('RewardsResourceFactory',RewardsResourceFactory);

    RewardsResourceFactory.$inject = [
        '$resource',
        '$log',
        'UriService'
    ];

    function RewardsResourceFactory(
        $resource,
        $log,
        UriService
    ){
        $log.info('RewardsResourceFactory');

       var url = UriService.getApi('rewards');

        return $resource(url);
    }
})();