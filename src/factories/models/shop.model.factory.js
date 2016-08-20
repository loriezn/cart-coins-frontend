;(function(){
    'use strict';

    angular.module('app.services')
        .factory('ShopModelFactory',ShopModelFactory);
    ShopModelFactory.$inject = [
        'BusinessTypeModelFactory',
        'UserModelFactory'
    ];

    function ShopModelFactory(

    ){
        function Shop(data){
            data = data || {};

            this.id = data.id || data.shop_id || null;
            this.name = data.name || null;
            this.country = data.country || null;
            this.state  = data.state || null;
            this.city  = data.city || null;
            this.website = data.website || null;
            this.created_at = data.created_at || null;
            this.updated_at = data.updated_at || null;
            this.deleted_at = data.deleted_at || null;

        }

        return Shop;
    }

})();