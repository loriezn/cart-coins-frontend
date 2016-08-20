;(function(){
    'use strict';

    angular.module('app.campaigns')
        .controller('CampaignsCtrl',CampaignsCtrl)

    CampaignsCtrl.$inject = [
        '$log',
        'ModalService',
        'UriService',
        'ShopCampaigns',
        'CampaignModelFactory',
        'CampaignResourceFactory'

    ];

    function CampaignsCtrl(
        $log,
        ModalService,
        UriService,
        ShopCampaigns,
        CampaignModelFactory,
        CampaignResourceFactory
    ){
        $log.info('Campaigns-Ctrl');

        var vm = this;
        vm.campaigns = [];

        angular.forEach(ShopCampaigns,function(campaign){
            vm.campaigns.push(new CampaignModelFactory(campaign))
        });

        vm.imagePath = UriService.getImagePath();
        vm.deleteCampaign = function(campaignId){
            var modalSettings = {
                backdrop: true,
                keyboard: false,
                modalFade: true,
                templateUrl: 'assets/templates/partials/modal.partial.html'
            };
            var modalOptions = {
                headerText:'Are you sure you want to delete the campaign'
            };
            ModalService.showModal(modalSettings, modalOptions).then(function () {
                CampaignResourceFactory.delete(campaignId);
            });
        }



    }
})();