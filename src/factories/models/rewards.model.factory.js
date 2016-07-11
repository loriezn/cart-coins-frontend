;(function(){
    'use strict';

    angular.module('app.services')
        .factory('RewardsModelFactory',RewardsModelFactory);

    RewardsModelFactory.$inject = [
        'ShopModelFactory'
    ];

    function RewardsModelFactory(
        ShopModelFactory
    ){

        function Reward(data){

            data = data || {};
            this.title = data.title || null;
            this.description = data.description || null;
            this.imageUrl = data.imageUrl || null ;
            this.status  = (data.status ===1 ? 'Published' : 'Unpublished') || null;
            if(data.shop && data.shop.length !=0){
                this.shop = data.shop
            }else{
                this.shop = [new ShopModelFactory()];
            }
            this.price = data.price || null;
            this.created_at = data.created_at || null;
            this.updated_at = data.updated_at || null;
        }

        return Reward;

    }
})();