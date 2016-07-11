;(function(){
    'use strict';
    angular.module('app.rewards')
        .config(Routes);
    Routes.$inject = [
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('rewards',{
                url:'/rewards',
                controller:'RewardsCtrl as vm',
                parent:'app',
                templateUrl:'assets/templates/rewards/rewards.index.view.html',
                resolve:{
                    RewardsResourceFactory:'RewardsResourceFactory',
                    'rewardsCollection':function(RewardsResourceFactory){
                        return RewardsResourceFactory.query().$promise
                    }
                }
            })

            .state('rewards.new',{
                url:'/rewards/new',
                controller:'NewRewardsCtrl as vm',
                parent:'app',
                templateUrl:'assets/templates/rewards/rewards.new.view.html'
            });
    }
})();