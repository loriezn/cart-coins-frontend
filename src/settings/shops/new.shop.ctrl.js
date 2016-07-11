;(function(){
   'use strict';

    angular.module('app.settings')
        .controller('NewShopCtrl',NewShopCtrl);
    NewShopCtrl.$inject = [
        '$log',
        'BusinessTypes',
        'BusinessTypeModelFactory',
        'ShopResourceFactory',
        '$state'
    ];
    function NewShopCtrl(
        $log,
        BusinessTypes,
        BusinessTypeModelFactory,
        ShopResourceFactory,
        $state
    ){

        $log.info('NewShopCtrl');

        //View model

        var vm = this;
        vm.title = 'new.shop';
        var businessTypes = [];

        angular.forEach(BusinessTypes,function(type){
            businessTypes.push(new BusinessTypeModelFactory(type));
        });

        vm.businessTypes = businessTypes;
        var shopBusinessType =
        vm.shop = {
            shopname:null,
            country:null,
            city:null,
            area:null,
            vat_number:null,
            phone_number:null,
            email:null,
            website:null,
            facebook:null,
            businessType:null,
            owner:null
        };
        vm.addShop = function(){
            var params = {
                shop_name:vm.shop.shopname,
                country:vm.shop.country,
                city:vm.shop.city,
                area:vm.shop.area,
                vat_number:vm.shop.vat_number,
                phone_number:vm.shop.phone_number,
                email:vm.shop.email,
                website:vm.shop.website,
                facebook:vm.shop.facebook,
                business_type:vm.shop.businessType,
                owner:vm.shop.owner
            };

            ShopResourceFactory.save(params,ShopSavedOnSuccess)
        };

        function ShopSavedOnSuccess(){
            $log.info('Shop Saved With Success');
            $state.go('settings.shops');

        }
    }
})();