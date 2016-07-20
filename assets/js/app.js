(function(){
    'use strict';

    angular.module('app',[
        'ui.router',
        'ui.bootstrap',
        'ui.calendar',
        'satellizer',
        'ngResource',
        'ngMessages',
        'ngCookies',
        'ngAnimate',
        'validation.match',
        'angularMoment',
        'angular-jsvat',
        'pascalprecht.translate',
        'ngMask',
        'angular-cache',
        'angular-loading-bar',
        'monospaced.qrcode',
        'textAngular',
        'ngSanitize',
        'ngMaterial',
        //Modules
        'app.auth',
        'app.dashboard',
        'app.services',
        'app.resources',
        'app.settings',
        'app.rewards'


    ]);

    angular.module('app.auth', []);
    angular.module('app.dashboard',[]);
    angular.module('app.services',[]);
    angular.module('app.resources',[]);
    angular.module('app.settings',[]);
    angular.module('app.rewards',[]);



    angular.module('app').run(Run);
    Run.$inject = [
        '$rootScope',
        '$log',
        '$state',
        'ModalService',
        'AuthService',
        'StorageService'
    ];

    function Run(
        $rootScope,
        $log,
        $state,
        ModalService,
        AuthService,
        StorageService
    ){
        $rootScope.$state = $state;

        $rootScope.logOut = function() {

            var modalSettings = {
                backdrop: true,
                keyboard: false,
                modalFade: true,
                templateUrl: 'assets/templates/partials/modal.logout.partial.html'
            };

            var modalOptions = {
                headerText:StorageService.Local.getObject('cartcoinsUser').name
            };

            ModalService.showModal(modalSettings, modalOptions).then(function () {
                AuthService.logOut();
            });

        }
    }

})();
(function(){
   'use strict';
    angular.module('app')
        .config(Config);

    Config.$inject = [
        '$urlRouterProvider',
        '$authProvider',
        '$httpProvider',
        '$translateProvider',
        'config'
    ];

    function Config(
        $urlRouterProvider,
        $authProvider,
        $httpProvider,
        $translateProvider,
        config
    ) {

        // Satellizer configuration
        $authProvider.tokenPrefix = 'cartcoins';
        $authProvider.baseUrl = config.api.protocol + '://' + config.api.host + config.api.path;
        $authProvider.loginUrl = '/auth';
        $authProvider.withCredentials = true;

        //Route Provider
        $urlRouterProvider.otherwise('/login');
    }
})();
(function(){
    'use strict';
    var secure = false;
    angular.module('app')
        .constant('config',{
            api:{
                protocol: secure ? 'https' : 'http',
                host: "cartcoins.api.local/",
                path: "/api/v1/",
            },
            rewardImagePath:'RewardImageDirectory'
        });

})();
(function(){
    'use strict';

    angular.module('app.auth')
        .config(Routes);

    Routes.$inject = [
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('login',{
                url:'/login',
                controller:'AuthCtrl as vm',
                templateUrl:'assets/templates/auth/login.view.html'
            })
            .state('register',{
                url:'/register',
                controller:'AuthCtrl as vm',
                templateUrl:'assets/templates/auth/register.view.html'
            })
    }

})();
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
                AuthService.skipIfAuthenticated('dashboard.client');
                vm.user = {
                    name:null,
                    email:null,
                    password:null,
                    remember:false
                };

                break;
            case 'register':
                AuthService.skipIfAuthenticated('dashboard.client');
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
                $state.go('dashboard.admin')
            }else if(loggedUser.role === 'merchant'){
                $state.go('dashboard.merchant')
            }else{
                $state.go('dashboard.client');
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
(function(){
    'use strict';
    angular.module('app.dashboard')
        .config(Routes);
    Routes.$inject = [
      '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('dashboard',{
                url:'/dashboard',
                parent:'app',
                controller:'DashboardCtrl as pvm',
                templateUrl:'assets/templates/dashboard/dashboard.view.html',
                abstract:true
            })


    }

})();
(function(){
    'use strict';

    angular.module('app.dashboard')
        .controller('DashboardCtrl',DashboardCtrl);

    DashboardCtrl.$inject = [
        '$scope',
        '$log',
        '$state'
    ];

    function DashboardCtrl(
        $scope,
        $log,
        $state
    ){
        $log.info('DashboardCtrl');
        //view model
        var vm = this ;

        vm.title = $state.current.name;

    }


})();
angular.module('app').directive('header',function(){
   return{
       restrict:'E',
       templateUrl:'assets/templates/partials/header.partial.html',
       compile: function(tElement, tAttrs, transclude){
           $.AdminLTE.pushMenu($(tElement).find('.sidebar-toggle'));

       }
   };
});
(function(){
    'use strict';

    angular.module('app')
        .directive('errSrc',function(){
            return{
                link:function(scope,element,attrs){
                    element.bind('error', function(){
                        if(attrs.src != attrs.errSrc){
                            attrs.$set('src',attrs.errSrc);
                        }
                    });
                }
            }
        });
})();
angular.module('app').directive('fileModel',['$parse',function($parse){
    return{
        restrict : 'A',
        link:function(scope,element,attrs){
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change',function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                })
            });

        }
    }
}]);
angular.module('app').directive('sidebar', function(){
    return {
        restrict: 'C',
        compile: function(tElement, tAttrs, transclude){
            //Enable sidebar tree view controls
            $.AdminLTE.tree('.' +tAttrs.class);

        }
    };
});
(function(){
    'use strict';

    angular.module('app')
        .config(Routes);

    Routes.$inject = [
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('app',{
                url:'',
                controller:'MainCtrl as rvm',
                templateUrl:'assets/templates/layout/layout.view.html',
                resolve:{
                    AuthService:'AuthService',
                    UserResourceFactory:'UserResourceFactory',
                    currentUser:function(AuthService,$log,UserResourceFactory){
                        var currentUser = AuthService.getUser();
                        var params = {
                            userId:currentUser.sub
                        };
                        return UserResourceFactory.get(params).$promise ;
                    }
                }
            })
    }

})();
(function(){
    'use strict';

    angular.module('app')
        .controller('MainCtrl',MainCtrl);
    MainCtrl.$inject = [
        '$scope',
        '$log',
        'StorageService',
        'UserModelFactory',
        'currentUser',
        'AuthService'
    ];
    function MainCtrl(
        $scope,
        $log,
        StorageService,
        UserModelFactory,
        currentUser,
        AuthService
    ){
        $log.info('MainCtrl');

        var rvm = this;
        rvm.user = new UserModelFactory(currentUser);

        //Roles Component
        rvm.isOwner = (AuthService.getUser().role === 'admin'? true : false);
        rvm.isMerchant = (AuthService.getUser().role === 'merchant' ? true :false);
        rvm.isClient  = (AuthService.getUser().role === 'client' ? true : false);
        rvm.role = AuthService.getUser().role;
        /* Save Current User */
        StorageService.Local.setObject('cartcoinsUser',rvm.user);


    }
})();
;(function(){
    'use strict';

    angular.module('app.resources')
        .factory('BusinessTypesResourceFactory',BusinessTypesResourceFactory);

    BusinessTypesResourceFactory.$inject = [
        '$resource',
        '$log',
        'UriService'
    ];

    function BusinessTypesResourceFactory(
        $resource,
        $log,
        UriService
    ){
        $log.info('BusinessTypesResourceFactory');

        var url = UriService.getApi('business-types')

        return $resource(url);
    }
})();
;(function(){
    'use strict';

    angular.module('app.resources')
        .factory('RewardsResourceFactory',RewardsResourceFactory);

    RewardsResourceFactory.$inject = [
        '$resource',
        '$log',
        'UriService'
    ];

    function RewardsResourceFactory(
        $resource,
        $log,
        UriService
    ){
        $log.info('RewardsResourceFactory');

        var url = UriService.getApi('rewards/:rewardId');
        var paramDefaults = {
            rewardId : '@rewardId'
        };
        var fd = new FormData();
        var actions = {
            save:{
                method:'POST',
                transformRequest:function(data){
                    angular.forEach(data,function(key,value){
                        fd.append(value,key);
                    });
                    return fd;
                },
                headers: {'Content-type':undefined}
            }
        };
        return $resource(url,paramDefaults,actions);
    }
})();
;(function(){
    'use strict';

    angular.module('app.resources')
        .factory('ShopResourceFactory',ShopResourceFactory);
    ShopResourceFactory.$inject = [
        '$resource',
        '$log',
        'UriService'
    ];

    function ShopResourceFactory(
        $resource,
        $log,
        UriService
    ){
        $log.info('ShopResourceFactory');
       var url = UriService.getApi('shops');
       return $resource(url);
    }
})();
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
;(function(){
    'use strict';

    angular.module('app.rewards')
        .controller('NewRewardsCtrl',NewRewardsCtrl);

    NewRewardsCtrl.$inject =[
        '$log',
        'RewardsResourceFactory',
        '$state'
    ];

    function NewRewardsCtrl(
        $log,
        RewardsResourceFactory,
        $state
    ){
        $log.info('NewRewardsCtrl');
        var vm = this;
        vm.newReward = {
            title:null,
            description:null,
            price:null,
            status:null,
            photo:null
        };



        vm.saveReward = function(){


            $log.info('SubmitFunction');
            var newReward = {
                title:vm.newReward.title,
                description:vm.newReward.description,
                price:vm.newReward.price,
                status:vm.newReward.status,
                image:vm.newReward.photo
            };
            console.log(newReward);
            RewardsResourceFactory.save(newReward,rewardSavedOnSuccess)
        };

        function rewardSavedOnSuccess(){
            $log.info('Reward Saved Successfully')
            $state.go('rewards');
        }
    }
})();
;(function(){
    'use strict';

    angular.module('app.rewards')
        .controller('RewardDetailsCtrl',RewardDetailsCtrl);
    RewardDetailsCtrl.$inject = [
        '$log',
        '$mdDialog',
        '$mdMedia',
        '$mdToast',
        '$state',
        'rewardsDetails',
        'config',
        'UriService',
        'RewardsResourceFactory'
    ];

    function RewardDetailsCtrl(
        $log,
        $mdDialog,
        $mdMedia,
        $mdToast,
        $state,
        rewardsDetails,
        config,
        UriService,
        RewardsResourceFactory
    ){
        $log.info('RewardDetailsCtrl');
        var vm = this;
        //Toast
        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };
        vm.toastPosition = angular.extend({},last);
        vm.getToastPosition = function(){
            sanitizePosition();
            return Object.keys(vm.toastPosition)
                .filter(function(pos) { return vm.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = vm.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
        }

        vm.showNotificationToast = function(message) {
            $log.info('ToastInitiated');
            var pinTo = vm.getToastPosition();
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position(pinTo )
                    .hideDelay(3000)
            );
        };

        //View model


        vm.rewardDetails = rewardsDetails;
        vm.baseImageUrl = UriService.getImagePath(config.rewardImagePath)+vm.rewardDetails.imageUrl;
        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

        vm.deleteReward = function(ev){
            var confirm = $mdDialog.confirm()
                .title('Are you sure you would like to delete the reward ?')
                .textContent('This action can not be undone ')
                .ariaLabel('Lucky Loyal Day!')
                .targetEvent(ev)
                .ok('Please do it !')
                .cancel('OPPs i changed my mind. dont delete it !');
            $mdDialog.show(confirm).then(function(){
                var params = {rewardId: vm.rewardDetails.id};
                var deleteRewardById = RewardsResourceFactory.remove(params).$promise;
                var message = 'Reward Deleted';
                vm.showNotificationToast(message);
                $state.go('rewards');
            },function(){
                $log.info('not');
                var message = 'Reward Not Deleted';
                vm.showNotificationToast(message);
                vm.choice = 'Not Deleted'
            })

        }



    }
})();
;(function(){
    'use strict';
    angular.module('app.rewards')
        .config(Routes);
    Routes.$inject = [
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('rewards',{
                url:'/rewards',
                controller:'RewardsCtrl as vm',
                parent:'app',
                templateUrl:'assets/templates/rewards/rewards.index.view.html',
                resolve:{
                    RewardsResourceFactory:'RewardsResourceFactory',
                    'rewardsCollection':function(RewardsResourceFactory){
                        return RewardsResourceFactory.query().$promise
                    }
                }
            })

            .state('rewards.new',{
                url:'/rewards/new',
                controller:'NewRewardsCtrl as vm',
                parent:'app',
                templateUrl:'assets/templates/rewards/rewards.new.view.html'
            })

            .state('rewards.details',{
                url:'/rewards/details/{rewardId}',
                controller:'RewardDetailsCtrl as vm',
                parent:'app',
                templateUrl:'assets/templates/rewards/rewards.details.view.html',
                resolve:{
                    RewardsResourceFactory:'RewardsResourceFactory',
                    'rewardsDetails':function(RewardsResourceFactory,$stateParams){
                        return RewardsResourceFactory.get($stateParams).$promise;
                    }
                }
            })

            .state('rewards.delete',{
                url:'/rewards/delete/{rewardId}',
                resolve:{
                    RewardsResourceFactory:'RewardsResourceFactory',
                    'deleteReward':function(RewardsResourceFactory,$state,$stateParams){

                    }
                }

            })
    }
})();
;(function(){
    'use strict';

    angular.module('app.rewards')
        .controller('RewardsCtrl',RewardsCtrl);

    RewardsCtrl.$inject = [
        '$log',
        'rewardsCollection',
        'RewardsModelFactory'
    ];

    function RewardsCtrl(
        $log,
        rewardsCollection,
        RewardsModelFactory
    ){
        $log.info('RewardsCtrl');
        var vm = this;
        vm.title = 'rewards';
        vm.rewards = [];

        angular.forEach(rewardsCollection,function(reward){
            vm.rewards.push(new RewardsModelFactory(reward));
        });


    }

})();
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

(function(){
    'use strict';

    angular.module('app.services')
        .service('AuthService',AuthService);

    AuthService.$inject = [
        '$auth',
        '$state',
        '$log',
        '$window',
        'CacheFactory',
        'StorageService'
    ];

    function AuthService(
        $auth,
        $state,
        $log,
        $window,
        CacheFactory,
        StorageService
    ){

        function authCheck(){
            var auth = $auth.isAuthenticated();
            if(auth === false){
                $state.go('login')
            }
            return auth;
        }

        function getUser(){
            return _parseJWT(getToken());
        }

        function skipIfAuthenticated(state){
            var token = getToken();
            if(token){
                $state.go(state);
            }
        }

        function logOut(){
            $auth.logout();
            $log.info('logout');
            var remember = StorageService.Local.get('cartcoins_remember');
            if (remember === 'false')
            {
                CacheFactory.destroyAll();

            }
            StorageService.Local.remove('cartcoinsUser');
            StorageService.Local.remove('cartcoins_remember');
            $state.go('login');
        }

        function getToken(){
            var token = $auth.getToken();
            if(!token){
                $auth.setStorageType('sessionStorage')
                token = $auth.getToken();
            }

            if(token){
                return token;
            }
        }

        function _parseJWT(token){
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        }

        return {
            authCheck: authCheck,
            logOut: logOut,
            getUser: getUser,
            skipIfAuthenticated: skipIfAuthenticated,
            getToken: getToken

        };
    }

})();
angular.module('app').service('ModalService', ModalService);


ModalService.$inject = [
    '$modal',
    '$log',
];
function ModalService(
    $modal,
    $log
) {

    $log.info('ModalService');

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'assets/templates/partials/layout/modal.partial.html'
    };

    var modalOptions = {
        closeButtonText: null,
        actionButtonText: 'OK',
        headerText: null,
    };

    function showModal (customModalDefaults, customModalOptions) {
        if (!customModalDefaults) customModalDefaults = {};
        customModalDefaults.backdrop = 'static';
        return this.show(customModalDefaults, customModalOptions);
    };

    function show (customModalDefaults, customModalOptions) {
        //Create temp objects to work with since we're in a singleton service
        var tempModalDefaults = {};
        var tempModalOptions = {};

        //Map angular-ui modal custom defaults to modal defaults defined in service
        angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

        //Map modal.html $scope custom properties to defaults defined in service
        angular.extend(tempModalOptions, modalOptions, customModalOptions);

        if (!tempModalDefaults.controller) {

            tempModalDefaults.controller = ['$scope', '$modalInstance' ,function ($scope, $modalInstance) {
                $scope.modalOptions = tempModalOptions;
                $scope.modalOptions.ok = function (result) {
                    $modalInstance.close(result);
                };
                $scope.modalOptions.close = function (result) {
                    $modalInstance.dismiss('cancel');
                };
            }];
        }

        return $modal.open(tempModalDefaults).result;
    };

    return {
        showModal: showModal,
        show: show
    }

}

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

(function(){
    'use strict';

    angular.module('app.services')
        .service('UriService',UriService);

    UriService.$inject = [
        '$location',
        'config'
    ];

    function UriService(
        $location,
        config
    ){
        function getApi(path) {
            var protocol = config.api.protocol ? config.api.protocol : $location.protocol(),
                host = config.api.host ? config.api.host : $location.host(),
                uri = protocol + '://' + host + config.api.path + path;

            return uri;
        }

        function getImagePath(path){
            var protocol = config.api.protocol ? config.api.protocol : $location.protocol(),
                host = config.api.host ? config.api.host : $location.host(),
                uri = protocol + '://' + host + path + '/';

            return uri;
        }

        return {
            getApi: getApi,
            getImagePath: getImagePath
        }

    }
})();
;(function(){
    'use strict';
    angular.module('app.settings')
        .controller('SettingsCtrl',SettingsCtrl);
    SettingsCtrl.$inject = [
        '$log',
        'shopData',
        'ShopModelFactory'
    ];

    function SettingsCtrl(
        $log,
        shopData,
        ShopModelFactory
    ){
        $log.info('SettingsCtrl');

        //view model
         var pvm = this;
         pvm.title = 'settings';
         pvm.shops = [];


        shopData.forEach(function(shop){
            pvm.shops.push(new ShopModelFactory(shop));
        });

    }
})();
;(function(){
    'use strict';

    angular.module('app.settings')
        .config(Routes);
    Routes.$inject=[
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('settings',{
               url:'/settings',
               controller:'SettingsCtrl as pvm',
               templateUrl:'assets/templates/settings/settings.view.html',
               parent:'app',
               abstract:true,
               resolve:{
                   ShopResourceFactory: 'ShopResourceFactory',
                   shopData:function(ShopResourceFactory){
                       return ShopResourceFactory.query().$promise;
                   }

               }
            });
    }


})();
;(function(){
    'use strict';

    angular.module('app.dashboard')
        .config(Routes);

    Routes.$inject = [
      '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('dashboard.client',{
                url:'/clients',
                parent:'dashboard',
                controller:'DashboardClientCtrl',
                templateUrl:'assets/templates/dashboard/client/dashboard.client.view.html'
            });
    }
})();
;(function(){
    'use strict';

    angular.module('app.dashboard')
        .controller('DashboardClientCtrl',DashboardClientCtrl);

    DashboardClientCtrl.$inject = [
        '$log'
    ];

    function DashboardClientCtrl(
        $log
    ){
        $log.info('DashboardClientCtrl');
    }
})();
;(function(){
    'use strict';
    angular.module('app.dashboard')
        .config(Routes);
    Routes.$inject=[
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('dashboard.merchant',{
                url:'/merchant',
                parent:'dashboard',
                controller:'DashboardMerchantCtrl',
                templateUrl:'assets/templates/dashboard/merchant/dashboard.merchant.view.html'
            })
    }
})();
;(function(){
    'use strict';

    angular.module('app.dashboard')
        .controller('DashboardMerchantCtrl',DashboardMerchantCtrl);

    DashboardMerchantCtrl.$inject = [
        '$log'
    ];

    function DashboardMerchantCtrl(
        $log
    ){
        $log.info('DashboardMerchantCtrl');
    }
})();
;(function(){
    'use strict';

    angular.module('app.dashboard')
        .config(Routes);

    Routes.$inject = [
        '$stateProvider'
    ];

    function Routes(
        $stateProvider
    ){
        $stateProvider
            .state('dashboard.admin',{
                url:'/owner',
                parent:'dashboard',
                controller:'DashboardOwnerCtrl',
                templateUrl:'assets/templates/dashboard/owner/dashboard.owner.view.html'
            })
    }
})();
;(function(){
    'use strict';

    angular.module('app.dashboard')
        .controller('DashboardOwnerCtrl',DashboardOwnerCtrl);

    DashboardOwnerCtrl.$inject = [
        '$log'
    ];

    function DashboardOwnerCtrl(
        $log
    ){
        $log.info('DashboardOwnerCtrl');
    }
})();
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
;(function(){
    'use strict';

    angular.module('app.services')
        .factory('RewardsModelFactory',RewardsModelFactory);

    RewardsModelFactory.$inject = [
        'ShopModelFactory'
    ];

    function RewardsModelFactory(
        ShopModelFactory
    ){

        function Reward(data){

            data = data || {};
            this.id = data.id || null;
            this.title = data.title || null;
            this.description = data.description || null;
            this.imageUrl = data.imageUrl || null ;
            this.status  = (data.status ===1 ? 'Published' : 'Unpublished') || null;
            if(data.shop && data.shop.length !=0){
                this.shop = data.shop
            }else{
                this.shop = [new ShopModelFactory()];
            }
            this.price = data.price || null;
            this.created_at = data.created_at || null;
            this.updated_at = data.updated_at || null;
        }

        return Reward;

    }
})();
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
;(function(){
    'use strict';

    angular.module('app.services')
        .factory('ShopModelFactory',ShopModelFactory);
    ShopModelFactory.$inject = [
        'BusinessTypeModelFactory',
        'UserModelFactory'
    ];

    function ShopModelFactory(
        BusinessTypeModelFactory,
        UserModelFactory
    ){
        function Shop(data){
            data = data || {};

            this.id = data.id || data.shop_id || null;
            this.shopName = data.shop_name || null;
            this.country = data.country || null;
            this.city  = data.city || null;
            this.area  = data.area || null;
            this.vatNumber = data.vat_number || null;
            this.phoneNumber = data.phone_number || null;
            this.email = data.email || null;
            this.website = data.website || null;
            this.facebook = data.facebook || null;

            if(data.business_type && data.business_type.length != 0){

                this.businessType = data.business_type
            }else{
                this.businessType = [new BusinessTypeModelFactory()];
            }

            if(data.owner && data.owner.length != 0){
                this.owner = data.owner
            }else{
                this.owner = [new UserModelFactory()];
            }

            this.created_at = data.created_at || null;
            this.updated_at = data.updated_at || null;

        }

        return Shop;
    }

})();
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
;(function(){
   'use strict';

    angular.module('app.settings')
        .controller('NewShopCtrl',NewShopCtrl);
    NewShopCtrl.$inject = [
        '$log',
        'BusinessTypes',
        'BusinessTypeModelFactory',
        'ShopResourceFactory',
        '$state'
    ];
    function NewShopCtrl(
        $log,
        BusinessTypes,
        BusinessTypeModelFactory,
        ShopResourceFactory,
        $state
    ){

        $log.info('NewShopCtrl');

        //View model

        var vm = this;
        vm.title = 'new.shop';
        var businessTypes = [];

        angular.forEach(BusinessTypes,function(type){
            businessTypes.push(new BusinessTypeModelFactory(type));
        });

        vm.businessTypes = businessTypes;
        var shopBusinessType =
        vm.shop = {
            shopname:null,
            country:null,
            city:null,
            area:null,
            vat_number:null,
            phone_number:null,
            email:null,
            website:null,
            facebook:null,
            businessType:null,
            owner:null
        };
        vm.addShop = function(){
            var params = {
                shop_name:vm.shop.shopname,
                country:vm.shop.country,
                city:vm.shop.city,
                area:vm.shop.area,
                vat_number:vm.shop.vat_number,
                phone_number:vm.shop.phone_number,
                email:vm.shop.email,
                website:vm.shop.website,
                facebook:vm.shop.facebook,
                business_type:vm.shop.businessType,
                owner:vm.shop.owner
            };

            ShopResourceFactory.save(params,ShopSavedOnSuccess)
        };

        function ShopSavedOnSuccess(){
            $log.info('Shop Saved With Success');
            $state.go('settings.shops');

        }
    }
})();
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
            .state('settings.shops',{
                parent:'settings',
                url:'/shops',
                controller:'SettingsShopCtrl as vm',
                templateUrl:'assets/templates/settings/shops/shops.index.view.html',
                resolve:{
                    ShopResourceFactory:'ShopResourceFactory',
                    shopCollection:function(ShopResourceFactory){
                        return ShopResourceFactory.query().$promise;
                    }
                }
            })

            .state('settings.shops.new',{
                parent:'settings',
                url:'/shops/new',
                controller:'NewShopCtrl as vm',
                templateUrl:'assets/templates/settings/shops/shops.create.view.html',
                resolve:{
                    BusinessTypesResourceFactory:'BusinessTypesResourceFactory',
                    BusinessTypes:function(BusinessTypesResourceFactory){
                        return BusinessTypesResourceFactory.query().$promise;
                    }
                }
            })
    }
})();
;(function(){
    'use strict';
    angular.module('app.settings')
        .controller('SettingsShopCtrl',SettingsShopCtrl);
    SettingsShopCtrl.$inject = [
       'shopCollection',
        '$log',
        'ShopModelFactory'
    ];

    function SettingsShopCtrl(
        shopCollection,
        $log,
        ShopModelFactory
    ){
        $log.info('SettingsShopCtrl');

        var vm = this;
        vm.title = 'shops';
        vm.shops = [];

        angular.forEach(shopCollection,function(shop){
            vm.shops.push(new ShopModelFactory(shop));
        });

    }
})();