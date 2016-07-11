(function(){
    'use strict';

    angular.module('app')
        .config(Routes);

    Routes.$inject = [
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('app',{
                url:'',
                controller:'MainCtrl as rvm',
                templateUrl:'assets/templates/layout/layout.view.html',
                resolve:{
                    AuthService:'AuthService',
                    UserResourceFactory:'UserResourceFactory',
                    currentUser:function(AuthService,$log,UserResourceFactory){
                        var currentUser = AuthService.getUser();
                        var params = {
                            userId:currentUser.sub
                        };
                        return UserResourceFactory.get(params).$promise ;
                    }
                }
            })
    }

})();