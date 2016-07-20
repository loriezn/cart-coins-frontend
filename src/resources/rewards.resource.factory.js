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

        var url = UriService.getApi('rewards/:rewardId');
        var paramDefaults = {
            rewardId : '@rewardId'
        };
        var fd = new FormData();
        var actions = {
            save:{
                method:'POST',
                transformRequest:function(data){
                    angular.forEach(data,function(key,value){
                        fd.append(value,key);
                    });
                    return fd;
                },
                headers: {'Content-type':undefined}
            }
        };
        return $resource(url,paramDefaults,actions);
    }
})();