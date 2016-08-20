;(function(){
    'use strict';
    angular.module('app.services')
        .factory('CampaignModelFactory',CampaignModelFactory)

    CampaignModelFactory = [

    ];

    function CampaignModelFactory(

    ){
        function Campaign(
            data
        ){
            data = data || {};

            this.id = data.campaign_id || data.id || null;
            this.title = data.title || null;
            this.shop_id = data.shop_id || null;
            this.image = data.image || null;
            this.price = data.price || null;
            this.created_at = data.created_at || null;
            this.updated_at = data.updated_at || null;
        }

        return Campaign

    }
})();