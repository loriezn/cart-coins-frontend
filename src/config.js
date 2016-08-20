(function(){
   'use strict';
    angular.module('app')
        .config(Config);

    Config.$inject = [
        '$urlRouterProvider',
        '$authProvider',
        '$httpProvider',
        '$translateProvider',
        'config'
    ];

    function Config(
        $urlRouterProvider,
        $authProvider,
        $httpProvider,
        $translateProvider,
        config
    ) {

        // Satellizer configuration
        $authProvider.tokenPrefix = 'cartcoins';
        $authProvider.baseUrl = config.api.protocol + '://' + config.api.host + config.api.path;
        $authProvider.loginUrl = '/login';
        $authProvider.withCredentials = true;

        //Route Provider
        $urlRouterProvider.otherwise('/login');
    }
})();