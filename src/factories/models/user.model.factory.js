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
            this.first_name = data.first_name || null;
            this.last_name = data.last_name || null;
            this.display_name = data.display_name || null;
            this.email = data.email || null;
            this.phone = data.phone || null;
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