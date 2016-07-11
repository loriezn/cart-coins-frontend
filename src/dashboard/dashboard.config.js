(function(){
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
            .state('dashboard',{
                url:'/dashboard',
                parent:'app',
                controller:'DashboardCtrl as pvm',
                templateUrl:'assets/templates/dashboard/dashboard.view.html',
                abstract:true
            })


    }

})();