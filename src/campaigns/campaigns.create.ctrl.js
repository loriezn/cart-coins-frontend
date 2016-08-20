;(function(){
    'use strict';

    angular.module('app.campaigns')
        .controller('CampaignsCreateCtrl',CampaignsCreateCtrl);

    CampaignsCreateCtrl.$inject = [
        '$log',
        'CampaignResourceFactory',
        '$state',
        'AuthService',
        '$rootScope'
    ];

    function CampaignsCreateCtrl(
        $log,
        CampaignResourceFactory,
        $state,
        AuthService,
        $rootScope
    ){
        $log.info('CampaignsCreateCtrl');

        var vm = this;
        vm.campaign = {
            title: null,
            price: null,
            image: null
        };

        vm.submitCampaign = function(isValid){
            if(isValid){
                var newCampaign = {
                    title:vm.campaign.title,
                    price:vm.campaign.price,
                    image:vm.campaign.image,
                    shop_id:$rootScope.shop.id
                };
                $log.info(newCampaign)
                CampaignResourceFactory.save(newCampaign,CampaignCreatedOnSuccess)
            }
        };

        function CampaignCreatedOnSuccess(){
            $log.info('CampaignCreated');
            $state.go('campaigns');
        }

    }
})();