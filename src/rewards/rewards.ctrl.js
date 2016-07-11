;(function(){
    'use strict';

    angular.module('app.rewards')
        .controller('RewardsCtrl',RewardsCtrl);

    RewardsCtrl.$inject = [
        '$log',
        'rewardsCollection',
        'RewardsModelFactory'
    ];

    function RewardsCtrl(
        $log,
        rewardsCollection,
        RewardsModelFactory
    ){
        $log.info('RewardsCtrl');
        var vm = this;
        vm.title = 'rewards';
        vm.rewards = [];

        angular.forEach(rewardsCollection,function(reward){
            vm.rewards.push(new RewardsModelFactory(reward));
        });


    }

})();