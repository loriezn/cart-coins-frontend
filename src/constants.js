(function(){
    'use strict';
    var secure = false;
    angular.module('app')
        .constant('config',{
            api:{
                protocol: secure ? 'https' : 'http',
                host: "cartcoins.api.local/",
                path: "/api/v1/"
            }
        });

})();