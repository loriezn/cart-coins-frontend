;(function(){
    'use strict';

    angular.module('app.services')
        .factory('UserModelFactory',UserModelFactory);

    UserModelFactory.$inject = [
        'RoleModelFactory'
    ];

    function UserModelFactory(
        RoleModelFactory
    ){
        function User(data){
        data = data || {};
            this.id = data.user_id || data.id || null;
            this.name = data.name || null;
            this.email = data.email || null;
            this.secureCode = data.customer_secure_code || null;
            this.created_at = data.created_at || null;
            this.updated_at = data.updated_at || null;
            this.deleted_at = data.deleted_at || null;

            if(data.roles && data.roles.length !== 0)
            {
                this.roles = data.roles
            } else {
                this.roles = [new RoleModelFactory()];
            }
        }
        return User;

    }

})();