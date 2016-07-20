;(function(){
    'use strict';

    angular.module('app.rewards')
        .controller('RewardDetailsCtrl',RewardDetailsCtrl);
    RewardDetailsCtrl.$inject = [
        '$log',
        '$mdDialog',
        '$mdMedia',
        '$mdToast',
        '$state',
        'rewardsDetails',
        'config',
        'UriService',
        'RewardsResourceFactory'
    ];

    function RewardDetailsCtrl(
        $log,
        $mdDialog,
        $mdMedia,
        $mdToast,
        $state,
        rewardsDetails,
        config,
        UriService,
        RewardsResourceFactory
    ){
        $log.info('RewardDetailsCtrl');
        var vm = this;
        //Toast
        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        vm.toastPosition = angular.extend({},last);
        vm.getToastPosition = function(){
            sanitizePosition();
            return Object.keys(vm.toastPosition)
                .filter(function(pos) { return vm.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = vm.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }

        vm.showNotificationToast = function(message) {
            $log.info('ToastInitiated');
            var pinTo = vm.getToastPosition();
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position(pinTo )
                    .hideDelay(3000)
            );
        };

        //View model


        vm.rewardDetails = rewardsDetails;
        vm.baseImageUrl = UriService.getImagePath(config.rewardImagePath)+vm.rewardDetails.imageUrl;
        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

        vm.deleteReward = function(ev){
            var confirm = $mdDialog.confirm()
                .title('Are you sure you would like to delete the reward ?')
                .textContent('This action can not be undone ')
                .ariaLabel('Lucky Loyal Day!')
                .targetEvent(ev)
                .ok('Please do it !')
                .cancel('OPPs i changed my mind. dont delete it !');
            $mdDialog.show(confirm).then(function(){
                var params = {rewardId: vm.rewardDetails.id};
                var deleteRewardById = RewardsResourceFactory.remove(params).$promise;
                var message = 'Reward Deleted';
                vm.showNotificationToast(message);
                $state.go('rewards');
            },function(){
                $log.info('not');
                var message = 'Reward Not Deleted';
                vm.showNotificationToast(message);
                vm.choice = 'Not Deleted'
            })

        }



    }
})();