;(function () {
    'use strict';

    angular.module('app.services')
        .service('StorageService', StorageService);

    StorageService.$inject = [
        '$log',
        '$window',
        '$cookies'
    ];

    function StorageService(
        $log,
        $window,
        $cookies
    ) {

        $log.info('StorageService');

        function get(key) {
            var value = $window.localStorage.getItem(key);
            return value;
        }

        function getObject(key) {
            var objectJson = get(key);

            return angular.fromJson(objectJson);
        }

        function has(key) {
            return $window.localStorage.hasOwnProperty(key);
        }

        function remove(key) {
            $window.localStorage.removeItem(key);
        }

        function set(key, value) {
            $window.localStorage.setItem(key, value);
        }

        function setObject(key, object) {
            var objectJson = angular.toJson(object);
            this.set(key, objectJson);
        }

        function getCookie(key)
        {
            return $cookies.get(key);
        }

        return {
            Local: {
                get             : get,
                getObject       : getObject,
                has             : has,
                remove          : remove,
                set             : set,
                setObject       : setObject
            },
            Cookie: {
                get             : getCookie
            }
        };
    }

})();
