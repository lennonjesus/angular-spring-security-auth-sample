(function(){

'use strict';
angular.module('app').directive('appLogoutUser',appLogoutUser);

function appLogoutUser(){

  var directive = {
    restrict: 'A',
    link:linkFunc,
    controller: LogoutController,
    bindToController: true
  };

  return directive;

  function linkFunc(scope,el,attr,vm){
    el.on('click',function(event){
      event.preventDefault();
      vm.logout();
    });
  }
}

angular.module('app').controller('LogoutController',LogoutController);

LogoutController.$inject  = ['$rootScope','navigationService','$state'];

function LogoutController($rootScope,navigationService,$state){
  var vm = this;
  vm.logout = logout;

  function logout(){
    navigationService.logout()
      .then(getLogoutSuccess)
      .catch(getLogoutError);

    function getLogoutSuccess(){
      $rootScope.authenticated = false;
      $rootScope.principal = null;
      vm.error = false;
      $state.go("home");
    }

    function getLogoutError(){
      vm.error = true;
    }
  }
}



})();
