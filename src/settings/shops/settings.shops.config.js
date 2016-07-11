;(function(){
    'use strict';
    angular.module('app.settings')
        .config(Routes);

    Routes.$inject = [
      '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('settings.shops',{
                parent:'settings',
                url:'/shops',
                controller:'SettingsShopCtrl as vm',
                templateUrl:'assets/templates/settings/shops/shops.index.view.html',
                resolve:{
                    ShopResourceFactory:'ShopResourceFactory',
                    shopCollection:function(ShopResourceFactory){
                        return ShopResourceFactory.query().$promise;
                    }
                }
            })

            .state('settings.shops.new',{
                parent:'settings',
                url:'/shops/new',
                controller:'NewShopCtrl as vm',
                templateUrl:'assets/templates/settings/shops/shops.create.view.html',
                resolve:{
                    BusinessTypesResourceFactory:'BusinessTypesResourceFactory',
                    BusinessTypes:function(BusinessTypesResourceFactory){
                        return BusinessTypesResourceFactory.query().$promise;
                    }
                }
            })
    }
})();