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
      var retorno = $route.current && route === $route.current.controller;
      console.log(retorno);
      return retorno;
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
      .then(getLogoutSuccess)
      .catch(getLogoutError);

      function getLogoutSuccess(data){
          $rootScope.authenticated = false;
          $rootScope.principal = null;
          vm.error = false;
          $location.path("/");
      }

      function getLogoutError(err){
          vm.error = true;
      }

    }

  }

})();
