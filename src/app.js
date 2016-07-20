(function(){
    'use strict';

    angular.module('app',[
        'ui.router',
        'ui.bootstrap',
        'ui.calendar',
        'satellizer',
        'ngResource',
        'ngMessages',
        'ngCookies',
        'ngAnimate',
        'validation.match',
        'angularMoment',
        'angular-jsvat',
        'pascalprecht.translate',
        'ngMask',
        'angular-cache',
        'angular-loading-bar',
        'monospaced.qrcode',
        'textAngular',
        'ngSanitize',
        'ngMaterial',
        //Modules
        'app.auth',
        'app.dashboard',
        'app.services',
        'app.resources',
        'app.settings',
        'app.rewards'


    ]);

    angular.module('app.auth', []);
    angular.module('app.dashboard',[]);
    angular.module('app.services',[]);
    angular.module('app.resources',[]);
    angular.module('app.settings',[]);
    angular.module('app.rewards',[]);



    angular.module('app').run(Run);
    Run.$inject = [
        '$rootScope',
        '$log',
        '$state',
        'ModalService',
        'AuthService',
        'StorageService'
    ];

    function Run(
        $rootScope,
        $log,
        $state,
        ModalService,
        AuthService,
        StorageService
    ){
        $rootScope.$state = $state;

        $rootScope.logOut = function() {

            var modalSettings = {
                backdrop: true,
                keyboard: false,
                modalFade: true,
                templateUrl: 'assets/templates/partials/modal.logout.partial.html'
            };

            var modalOptions = {
                headerText:StorageService.Local.getObject('cartcoinsUser').name
            };

            ModalService.showModal(modalSettings, modalOptions).then(function () {
                AuthService.logOut();
            });

        }
    }

})();