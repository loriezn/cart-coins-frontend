;(function(){
    'use strict';
    angular.module('app.settings')
        .controller('SettingsShopCtrl',SettingsShopCtrl);
    SettingsShopCtrl.$inject = [
       'shopCollection',
        '$log',
        'ShopModelFactory'
    ];

    function SettingsShopCtrl(
        shopCollection,
        $log,
        ShopModelFactory
    ){
        $log.info('SettingsShopCtrl');

        var vm = this;
        vm.title = 'shops';
        vm.shops = [];

        angular.forEach(shopCollection,function(shop){
            vm.shops.push(new ShopModelFactory(shop));
        });

    }
})();