;(function(){
    'use strict';

    angular.module('app.campaigns')
        .config(Routes)

    Routes.$inject = [
        '$stateProvider',
        '$mdThemingProvider'
    ];

    function Routes(
        $stateProvider,
        $mdThemingProvider
    ){
        $stateProvider
            .state('campaigns',{
                url:'/campaigns',
                controller:'CampaignsCtrl as vm',
                parent:'app',
                templateUrl:'assets/templates/campaigns/campaigns.index.view.html',
                resolve:{
                    CampaignResourceFactory:'CampaignResourceFactory',
                    ShopCampaigns:function(CampaignResourceFactory){
                        return CampaignResourceFactory.query().$promise
                    }
                }
            })

            .state('campaigns.new',{
                url:'/campaigns/new',
                controller:'CampaignsCreateCtrl as vm',
                parent:'app',
                templateUrl:'assets/templates/campaigns/campaigns.create.view.html'
            })


        $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
        $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
        $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
        $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
    }
})();