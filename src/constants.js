(function(){
    'use strict';
    var secure = false;
    angular.module('app')
        .constant('config',{
            api:{
                protocol: secure ? 'https' : 'http',
                host: "api.cartcoins.local/",
                path: "/api/v1/",
            },
            images:{
                campaignImagePath:'uploads/campaign/'
            }

        });

})();