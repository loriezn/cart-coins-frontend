(function(){
    'use strict';

    angular.module('app.dashboard')
        .controller('DashboardCtrl',DashboardCtrl);

    DashboardCtrl.$inject = [
        '$scope',
        '$log',
        '$state'
    ];

    function DashboardCtrl(
        $scope,
        $log,
        $state
    ){
        $log.info('DashboardCtrl');
        //view model
        var vm = this ;

        vm.title = $state.current.name;

    }


})();