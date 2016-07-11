;(function(){
    'use strict';
    angular.module('app.dashboard')
        .config(Routes);
    Routes.$inject=[
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('dashboard.merchant',{
                url:'/merchant',
                parent:'dashboard',
                controller:'DashboardMerchantCtrl',
                templateUrl:'assets/templates/dashboard/merchant/dashboard.merchant.view.html'
            })
    }
})();