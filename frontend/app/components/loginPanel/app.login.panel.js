(function(){
  'use strict';

  LoginController.$inject  = ['$rootScope','navigationService','$state'];

  function LoginController($rootScope,navigationService,$state){

    var vm = this;
    vm.error = false;
    vm.credentials = {};
    vm.login = login;

    function login(){
      console.log('navigation controller');
      console.log(vm.credentials);
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
  }

  var diretiva = {

    templateUrl:'components/loginPanel/loginPanel.html',
    controller: LoginController,
  };

  angular.module('app').component('appLoginPanel',diretiva);
})();
