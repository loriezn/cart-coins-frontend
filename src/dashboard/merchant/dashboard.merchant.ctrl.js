;(function(){
    'use strict';

    angular.module('app.dashboard')
        .controller('DashboardMerchantCtrl',DashboardMerchantCtrl);

    DashboardMerchantCtrl.$inject = [
        '$log'
    ];

    function DashboardMerchantCtrl(
        $log
    ){
        $log.info('DashboardMerchantCtrl');
    }
})();