(function(){
    'use strict';

    angular.module('app')
        .controller('MainCtrl',MainCtrl);
    MainCtrl.$inject = [
        '$scope',
        '$log',
        'StorageService',
        'UserModelFactory',
        'currentUser',
        'AuthService'
    ];
    function MainCtrl(
        $scope,
        $log,
        StorageService,
        UserModelFactory,
        currentUser,
        AuthService
    ){
        $log.info('MainCtrl');

        var rvm = this;
        rvm.user = new UserModelFactory(currentUser);

        //Roles Component
        rvm.isOwner = (AuthService.getUser().role === 'admin'? true : false);
        rvm.isMerchant = (AuthService.getUser().role === 'merchant' ? true :false);
        rvm.isClient  = (AuthService.getUser().role === 'client' ? true : false);
        /* Save Current User */
        StorageService.Local.setObject('cartcoinsUser',rvm.user);


    }
})();