;
(function () {
    'use strict';

    angular.module('app.services')
        .service('AlertService', AlertService);

    AlertService.$inject = [
        '$log'
    ];

    function AlertService($log) {

        var alerts = [];

        function add(type, msg, timeout) {
            return alerts.push({
                type: type,
                msg: msg,
                timeout: timeout,
                close: function() {
                    return close(this);
                }
            });
        }

        function close(alert) {
            return closeAlertIdx(alerts.indexOf(alert));
        }

        function closeAlertIdx(index) {
            return alerts.splice(index, 1);
        }

        function clear(){
            alerts = [];
        }

        function get() {

            return alerts;
        }

        return {
            add : add,
            close: close,
            clear: clear,
            get: get
        };

    }

})();
