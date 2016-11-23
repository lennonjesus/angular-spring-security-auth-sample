(function(){

  'use strict';

  angular.module('app').controller('NavigationController',NavigationController);

  NavigationController.$inject  = ['$location','$route','$rootScope','navigationService'];

  function NavigationController($location, $route,$rootScope,navigationService){

    var vm = this;

    vm.credentials = {};
    vm.tab = tab;
    vm.login = login;
    vm.logout = logout;

    function tab(route) {
      return $route.current && route === $route.current.controller;
    }

    function login(){

      var headers = vm.credentials ? {
        authorization : "Basic "
        + btoa(vm.credentials.username + ":"
        + vm.credentials.password)
      } : {};

      console.log(headers);

      navigationService.login(headers)
      .then(getLoginSuccess)
      .catch(getLoginError);

      function getLoginSuccess(data){
        console.log("Login succeeded");
        $location.path("/");
        $rootScope.authenticated = true;
        $rootScope.principal = data.principal;

        //$rootScope.$apply();
        vm.error = false;
      }

      function getLoginError(message){
        $location.path("/login");
        console.error('ocorreu um erro');
        console.error({status:message.status, statusText:message.statusText});
        $rootScope.authenticated = false;
        $rootScope.principal = null;
        vm.error = true;
      }

    }

    function logout(){
      navigationService.logout()
      .then(getLogoutSuccess);

      function getLogoutSuccess(data){
          $rootScope.authenticated = false;
          $location.path("/");
      }

    }

  }

})();
