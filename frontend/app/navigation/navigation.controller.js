(function(){

    'use strict';

    angular.module('app').controller('NavigationController',NavigationController);

    NavigationController.$inject  = ['$http','$location','$route','$rootScope','navigationService'];

    function NavigationController($http, $location, $route,$rootScope,navigationService){

        var vm = this;
        vm.credentials = {};
        vm.tab = tab;
        vm.login = login;
        vm.logout = logout;
        vm.authenticate = authenticate;
        vm.isAuthenticated = isAuthenticated;

        function tab(route) {
            return $route.current && route === $route.current.controller;
        }

        /*
        function authenticate(credentials,callback){

            var headers = credentials ? {
                        authorization : "Basic "
                                + btoa(credentials.username + ":"
                                        + credentials.password)
                 } : {};



            $http.get('/sample/api/user', {
                headers : headers
            }).success(function(data) {
                if (data.name) {
                    $rootScope.authenticated = true;
                } else {
                    $rootScope.authenticated = false;
                }
                callback && callback(false);
            }).error(function() {
                $rootScope.authenticated = false;
                callback && callback(false);
            });


        }
        */

        function login() {

          var headers = credentials ? {
              authorization : "Basic "
                 + btoa(credentials.username + ":"
                 + credentials.password)
          } : {};


          navigationService.login(headers)
          .then(getLoginSuccess)
          .catch(function(message){

              console.log("Login failed")
              vm.error = true;
              $location.path("/login");

            });


          function getLoginSuccess(data){
              console.log("Login succeeded")
              vm.error = false;
              $location.path("/");
          }


             /*
            authenticate(vm.credentials, function(authenticated) {
                if ($rootScope.authenticated) {
                    console.log("Login succeeded")
                    $location.path("/");
                    vm.error = false;
                    $rootScope.authenticated = true;
                } else {
                    console.log("Login failed")
                    $location.path("/login");
                    vm.error = true;
                    $rootScope.authenticated = false;
                }
            })*/
        }

        function logout(){
            navigationService.logout().then(function(data){
                $location.path("/");
            });
       }

       function isAuthenticated(){
          return navigationService.isAuthenticated();
       }

    }

})();
