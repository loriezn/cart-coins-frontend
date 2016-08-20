;(function(){
    'use strict';

    angular.module('app.settings')
        .controller('SystemSettingsCtrl',SystemSettingsCtrl);

    SystemSettingsCtrl.$inject = [
        '$log'
    ]

    function SystemSettingsCtrl(
        $log
    ){
        $log.info ('System-Settings');
    }
})();