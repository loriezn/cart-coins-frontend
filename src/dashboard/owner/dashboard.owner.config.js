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
            .state('dashboard.owner',{
                url:'/owner',
                parent:'dashboard',
                controller:'DashboardOwnerCtrl',
                templateUrl:'assets/templates/dashboard/owner/dashboard.owner.view.html'
            })
    }
})();