(function(){
    'use strict';

    angular.module('app.auth')
        .controller('AuthCtrl',AuthCtrl);

    AuthCtrl.$injet = [
        '$scope',
        '$log',
        '$http',
        '$state',
        '$auth',
        'StorageService',
        '$timeout',
        'AuthService',
        'UserResourceFactory'
        ];

    function AuthCtrl(
        $scope,
        $log,
        $http,
        $state,
        $auth,
        StorageService,
        $timeout,
        AuthService,
        UserResourceFactory
    ){
        $log.info('AuthCtrl');

        //view model

        var vm = this;

        vm.title = $state.current.name;
        vm.alertMessage;
        vm.closeAlerts = closeAlerts;
        switch ($state.current.name)
        {
            case 'login':
                AuthService.skipIfAuthenticated('dashboard.clients');
                vm.user = {
                    name:null,
                    email:null,
                    password:null,
                    remember:false
                };

                break;
            case 'register':
                AuthService.skipIfAuthenticated('dashboard.clients');
                vm.newUser = {
                  name:null,
                  email:null,
                  password:null,
                  passwordConfirm:null
                };
                break;
        }

        vm.login = function(isValid){
            if(isValid){

                var credentials = {
                    email:vm.user.email,
                    password:vm.user.password
                };
                if(vm.user.remeber == false){
                    $auth.setStorageType('sessionStorage');
                }else{
                    $auth.setStorageType('localStorage');
                }
                StorageService.Local.set('cartcoins_remember',vm.user.remeber);
                //Satellizer auth
                $auth.login(credentials).then(loginSuccess).catch(loginError);

                $timeout(function(){
                    vm.message = "";
                    var message = 'login failed | Sorry for the inconvenience from our side, please try again later';
                    vm.alertMessage = {type: 'error', msg: message, timeout: 5000 };
                }, 10000);

            }
        }
        function loginSuccess(response)
        {
            closeAlerts();
            $auth.setToken(response);
           var loggedUser =  AuthService.getUser();
            if(loggedUser.role === 'admin'){
                $state.go('dashboard.owner')
            }else if(loggedUser.role === 'merchant'){
                $state.go('dashboard.merchant')
            }else{
                $state.go('dashboard.clients');
            }


        }

        function loginError(error)
        {
            vm.message = '';
            showErrors(error);

        }

        function showErrors(error)
        {
            $log.info(error);
            switch(error.status)
            {
                case 401:
                    var message = 'Access Denied | Credentials dont match any in the database' ;
                    vm.alertMessage = {type: 'error', msg: message, timeout: 5000 };
                    break;
                case -1:
                    var message = 'Sorry for the inconvenience from our side, please try again later';
                    vm.alertMessage = {type: 'info', msg: message, timeout: 100000 };
                    break;
                default:
                    var message = 'login failed | Sorry for the inconvenience from our side, please try again later';
                    vm.alertMessage = {type: 'error', msg: message, timeout: 5000 };
                    break;
            }
        }

        vm.registerCustomer = function(isValid){

          if(isValid){
              var newUser = {
                  name:vm.newUser.name,
                  email:vm.newUser.email,
                  password:vm.newUser.password,
                  password_confirmation:vm.newUser.passwordConfirm
              };
              $log.info('formSubmitted');
              UserResourceFactory.saveCustomer(newUser,CustomerSavedSuccessFully)
          }
        };

        function CustomerSavedSuccessFully(){
            $log.info('UserSuccessFullySaved');
            $state.go('login');
        }

        function closeAlerts()
        {
            vm.alertMessage = "";
        }
    }

})();