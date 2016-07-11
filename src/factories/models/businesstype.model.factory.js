;(function(){
    'use strict';

    angular.module('app.services')
        .factory('BusinessTypeModelFactory',BusinessTypeModelFactory);

    BusinessTypeModelFactory.$inject = [

    ];
    function BusinessTypeModelFactory(

    ){
        function BusinessType(data){
            data = data || {};
            this.id = data.id || null;
            this.name = data.name || null;
            this.created_at = data.created_at || null;
            this.update_at = data.updated_at || null;
        }
        return BusinessType;
    }
})();