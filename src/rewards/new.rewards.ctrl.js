;(function(){
    'use strict';

    angular.module('app.rewards')
        .controller('NewRewardsCtrl',NewRewardsCtrl);

    NewRewardsCtrl.$inject =[
        '$log',
        'RewardsResourceFactory',
        '$state'
    ];

    function NewRewardsCtrl(
        $log,
        RewardsResourceFactory,
        $state
    ){
        $log.info('NewRewardsCtrl');
        var vm = this;
        vm.newReward = {
            title:null,
            description:null,
            price:null,
            status:null,
            photo:null
        };



        vm.saveReward = function(){


            $log.info('SubmitFunction');
            var newReward = {
                title:vm.newReward.title,
                description:vm.newReward.description,
                price:vm.newReward.price,
                status:vm.newReward.status,
                image:vm.newReward.photo
            };
            console.log(newReward);
            RewardsResourceFactory.save(newReward,rewardSavedOnSuccess)
        };

        function rewardSavedOnSuccess(){
            $log.info('Reward Saved Successfully')
            $state.go('rewards');
        }
    }
})();