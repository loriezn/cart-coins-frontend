;(function(){
    'use strict';

    angular.module('app.dashboard')
        .controller('DashboardClientCtrl',DashboardClientCtrl);

    DashboardClientCtrl.$inject = [
        '$log'
    ];

    function DashboardClientCtrl(
        $log
    ){
        $log.info('DashboardClientCtrl');
    }
})();