;(function(){
    'use strict';

    angular.module('app.settings')
        .config(Routes);

    Routes.$inject = [
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('settings.system',{
                url:'/system',
                parent:'settings',
                controller:'SystemSettingsCtrl as vm',
                templateUrl:'assets/templates/settings/system/system-settings.view.html'
            })
    }
})();