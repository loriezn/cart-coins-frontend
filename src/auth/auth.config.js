(function(){
    'use strict';

    angular.module('app.auth')
        .config(Routes);

    Routes.$inject = [
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('login',{
                url:'/login',
                controller:'AuthCtrl as vm',
                templateUrl:'assets/templates/auth/login.view.html'
            })
            .state('register',{
                url:'/register',
                controller:'AuthCtrl as vm',
                templateUrl:'assets/templates/auth/register.view.html'
            })
    }

})();