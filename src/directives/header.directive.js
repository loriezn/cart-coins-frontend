angular.module('app').directive('header',function(){
   return{
       restrict:'E',
       templateUrl:'assets/templates/partials/header.partial.html',
       compile: function(tElement, tAttrs, transclude){
           $.AdminLTE.pushMenu($(tElement).find('.sidebar-toggle'));

       }
   };
});