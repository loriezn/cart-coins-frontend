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
                abstract: true,
                resolve:{
                    AuthService:'AuthService',
                    UserResourceFactory:'UserResourceFactory',
                    ShopResourceFactory:'ShopResourceFactory',
                    currentUser:function(AuthService,UserResourceFactory){
                        var currentUser = AuthService.getUser();
                        var params = {
                            userId:currentUser.sub
                        };
                        return UserResourceFactory.get(params).$promise ;
                    },
                    userShops:function(AuthService,ShopResourceFactory){

                        if(AuthService.getUser().roles[0].slug === 'client'){
                            return false;
                        }

                        return ShopResourceFactory.query().$promise;
                    }
                }
            })
    }

})();