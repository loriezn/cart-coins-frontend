;(function(){
    'use strict';
    angular.module('app.settings')
        .controller('SettingsCtrl',SettingsCtrl);
    SettingsCtrl.$inject = [
        '$log',
        //'shopData',
        'ShopModelFactory'
    ];

    function SettingsCtrl(
        $log,
        //shopData,
        ShopModelFactory
    ){
        $log.info('SettingsCtrl');

        //view model
         var pvm = this;
         pvm.title = 'settings';
         pvm.shops = [];


        //shopData.forEach(function(shop){
        //    pvm.shops.push(new ShopModelFactory(shop));
        //});

    }
})();