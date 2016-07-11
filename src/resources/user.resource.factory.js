;
(function(){
    angular.module('app.resources')
        .factory('UserResourceFactory',UserResourceFactory);
    UserResourceFactory.$inject = [
        '$resource',
        '$log',
        'UriService'
    ];

    function UserResourceFactory(
        $resource,
        $log,
        UriService
    ){
        $log.info("UserResourceFactory");
        var url = UriService.getApi('users/:userId');

        var paramDefaults = {
            userId:'@userId'
        };

        var actions={
          saveCustomer:{
              method:'POST',
              url: UriService.getApi('register')
          }
        };


        return $resource(url, paramDefaults,actions);

    }
})();