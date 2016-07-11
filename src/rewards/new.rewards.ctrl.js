;(function(){
    'use strict';

    angular.module('app.rewards')
        .controller('NewRewardsCtrl',NewRewardsCtrl);

    NewRewardsCtrl.$inject =[
        '$log'
    ];

    function NewRewardsCtrl(
        $log
    ){
        $log.info('NewRewardsCtrl');
    }
})();