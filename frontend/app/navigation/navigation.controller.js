(function(){

    'use strict';

    angular.module('app').controller('NavigationController',NavigationController);

    NavigationController.$inject  = ['$http','$location','$route'];

    function NavigationController($http, $location, $route){

        var vm = this;
        vm.credentials = {};
        vm.tab = tab;
        vm.login = login;
        vm.logout = logout;
        vm.authenticate = authenticate;

        function tab(route) {
            return $route.current && route === $route.current.controller;
        }

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
                    vm.authenticated = true;
                } else {
                    vm.authenticated = false;
                }
                callback && callback(vm.authenticated);
            }).error(function() {
                vm.authenticated = false;
                callback && callback(false);
            });


        }


        function login(){
            authenticate(vm.credentials, function(authenticated) {
                if (authenticated) {
                    console.log("Login succeeded")
                    $location.path("/");
                    vm.error = false;
                    vm.authenticated = true;
                } else {
                    console.log("Login failed")
                    $location.path("/login");
                    vm.error = true;
                    vm.authenticated = false;
                }
            })
        }

        function logout(){
            $http.post('/sample/api/logout', {}).finally(function() {
                vm.authenticated = false;
                $location.path("/");
            });
        }

    }

})();
