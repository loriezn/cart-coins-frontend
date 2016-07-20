;(function(){
    'use strict';

    angular.module('app.dashboard')
        .config(Routes);

    Routes.$inject = [
      '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('dashboard.client',{
                url:'/clients',
                parent:'dashboard',
                controller:'DashboardClientCtrl',
                templateUrl:'assets/templates/dashboard/client/dashboard.client.view.html'
            });
    }
})();