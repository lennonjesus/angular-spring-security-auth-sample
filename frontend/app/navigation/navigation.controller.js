(function(){

  'use strict';

  angular.module('app').controller('NavigationController',NavigationController);

  NavigationController.$inject  = ['$rootScope','navigationService','$state'];

  function NavigationController($rootScope,navigationService,$state){

    var vm = this;

    vm.credentials = {};
    vm.login = login;
    vm.logout = logout;

    function login(){
      var headers = vm.credentials ? {
        authorization : "Basic "
        + btoa(vm.credentials.username + ":"
        + vm.credentials.password)
      } : {};

      navigationService.login(headers)
        .then(getLoginSuccess)
        .catch(getLoginError);

      function getLoginSuccess(data){
        $state.go('home');
        $rootScope.authenticated = true;
        $rootScope.principal = data.principal;
        vm.error = false;
      }

      function getLoginError(message){
        $state.go('login');
        $rootScope.authenticated = false;
        $rootScope.principal = null;
        vm.error = true;
      }
    }

    function logout(){
      navigationService.logout()
        .then(getLogoutSuccess)
        .catch(getLogoutError);

      function getLogoutSuccess(data){
        $rootScope.authenticated = false;
        $rootScope.principal = null;
        vm.error = false;
        $state.go("home");
      }

      function getLogoutError(err){
        vm.error = true;
      }
    }
  }

})();
