;(function(){
    'use strict';

    angular.module('app.services')
        .factory('ShopModelFactory',ShopModelFactory);
    ShopModelFactory.$inject = [
        'BusinessTypeModelFactory',
        'UserModelFactory'
    ];

    function ShopModelFactory(
        BusinessTypeModelFactory,
        UserModelFactory
    ){
        function Shop(data){
            data = data || {};

            this.id = data.id || data.shop_id || null;
            this.shopName = data.shop_name || null;
            this.country = data.country || null;
            this.city  = data.city || null;
            this.area  = data.area || null;
            this.vatNumber = data.vat_number || null;
            this.phoneNumber = data.phone_number || null;
            this.email = data.email || null;
            this.website = data.website || null;
            this.facebook = data.facebook || null;

            if(data.business_type && data.business_type.length != 0){

                this.businessType = data.business_type
            }else{
                this.businessType = [new BusinessTypeModelFactory()];
            }

            if(data.owner && data.owner.length != 0){
                this.owner = data.owner
            }else{
                this.owner = [new UserModelFactory()];
            }

            this.created_at = data.created_at || null;
            this.updated_at = data.updated_at || null;

        }

        return Shop;
    }

})();