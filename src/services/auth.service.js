(function(){
    'use strict';

    angular.module('app.services')
        .service('AuthService',AuthService);

    AuthService.$inject = [
        '$auth',
        '$state',
        '$log',
        '$window',
        'CacheFactory',
        'StorageService'
    ];

    function AuthService(
        $auth,
        $state,
        $log,
        $window,
        CacheFactory,
        StorageService
    ){

        function authCheck(){
            var auth = $auth.isAuthenticated();
            if(auth === false){
                $state.go('login')
            }
            return auth;
        }

        function getUser(){
            return _parseJWT(getToken());
        }

        function skipIfAuthenticated(state){
            var token = getToken();
            if(token){
                $state.go(state);
            }
        }

        function logOut(){
            $auth.logout();
            $log.info('logout');
            var remember = StorageService.Local.get('cartcoins_remember');
            if (remember === 'false')
            {
                CacheFactory.destroyAll();

            }
            StorageService.Local.remove('cartcoinsUser');
            StorageService.Local.remove('cartcoins_remember');
            $state.go('login');
        }

        function getToken(){
            var token = $auth.getToken();
            if(!token){
                $auth.setStorageType('sessionStorage')
                token = $auth.getToken();
            }

            if(token){
                return token;
            }
        }

        function _parseJWT(token){
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }

        return {
            authCheck: authCheck,
            logOut: logOut,
            getUser: getUser,
            skipIfAuthenticated: skipIfAuthenticated,
            getToken: getToken

        };
    }

})();