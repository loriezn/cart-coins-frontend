;(function(){
    'use strict';

    angular.module('app.dashboard')
        .controller('DashboardOwnerCtrl',DashboardOwnerCtrl);

    DashboardOwnerCtrl.$inject = [
        '$log'
    ];

    function DashboardOwnerCtrl(
        $log
    ){
        $log.info('DashboardOwnerCtrl');
    }
})();