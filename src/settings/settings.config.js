;(function(){
    'use strict';

    angular.module('app.settings')
        .config(Routes);
    Routes.$inject=[
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('settings',{
               url:'/settings',
               controller:'SettingsCtrl as pvm',
               templateUrl:'assets/templates/settings/settings.view.html',
               parent:'app',
               abstract:true,
               resolve:{
                   ShopResourceFactory: 'ShopResourceFactory',
                   shopData:function(ShopResourceFactory){
                       return ShopResourceFactory.query().$promise;
                   }

               }
            });
    }


})();