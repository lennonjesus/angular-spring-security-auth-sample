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
        console.log("Login succeeded")
        $rootScope.authenticated = true;
        $location.path("/");
      }

      function getLoginError(message){
        $location.path("/login");
        var erro = {status:message.status, statusText:message.statusText};
        console.error('ocorreu um erro');
        console.error(erro);
        $rootScope.authenticated = false;
        vm.error = true;
      }
    }

    function logout(){
      navigationService.logout().then(function(data){
        $rootScope.authenticated = false;
        $location.path("/");
      });
    }

  }

})();
