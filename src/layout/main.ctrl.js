(function(){
    'use strict';

    angular.module('app')
        .controller('MainCtrl',MainCtrl);
    MainCtrl.$inject = [
        '$scope',
        '$log',
        'StorageService',
        'UserModelFactory',
        'ShopModelFactory',
        'currentUser',
        'AuthService',
        'userShops',
        '$rootScope'
    ];
    function MainCtrl(
        $scope,
        $log,
        StorageService,
        UserModelFactory,
        ShopModelFactory,
        currentUser,
        AuthService,
        userShops,
        $rootScope
    ){
        $log.info('MainCtrl');

        var rvm = this;
        rvm.user = new UserModelFactory(currentUser);
        rvm.shops = [];
        if(userShops !== false){
            angular.forEach(userShops,function(shop){
                rvm.shops.push(new ShopModelFactory(shop))
            });
        $rootScope.shop = rvm.shops[0];
            StorageService.Local.setObject('cartcoinsUser_shops',rvm.shops);
        }

        //Roles Component
        rvm.isOwner = (AuthService.getUser().roles[0].slug === 'admin'? true : false);
        rvm.isMerchant = (AuthService.getUser().roles[0].slug === 'shop' ? true :false);
        rvm.isClient  = (AuthService.getUser().roles[0].slug === 'client' ? true : false);
        rvm.role = AuthService.getUser().roles[0];
        /* Save Current User */
        StorageService.Local.setObject('cartcoinsUser',rvm.user);


    }
})();