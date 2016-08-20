;(function(){
    'use strict';

    angular.module('app.services')
        .factory('CampaignResourceFactory',CampaignResourceFactory)

    CampaignResourceFactory.$inject = [
        '$resource',
        '$log',
        'UriService'
    ];

    function CampaignResourceFactory(
        $resource,
        $log,
        UriService
    ){
        $log.info('Campaign-Resource-Factory');

        var url = UriService.getApi('campaigns');

        var paramDefaults = {
            campaignId:'@campaignId'
        };

        var fd = new FormData();
        var actions={
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
        }

        return $resource(url,paramDefaults,actions);

    }
})();