;(function(){
    'use strict';

    angular.module('app.services')
        .factory('RoleModelFactory', RoleModelFactory);

    function RoleModelFactory(){

        function Role(data){
            data = data || {};

            this.slug = data.slug || null;
            this.level = data.level|| 1;

        }
        return Role;
    }

})();