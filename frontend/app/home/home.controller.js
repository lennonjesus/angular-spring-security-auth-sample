(function(){

    'use strict';
    angular.module('app').controller('HomeController',HomeController);

    HomeController.$inject = ['$http']

    function HomeController($http){

        var vm = this;
        vm.greeting = {};
        vm.init = init;

        vm.init();

        function init() {

            $http.get('/sample/api/resource/').success(function(data) {
                            vm.greeting = data;
                            vm.authenticated = true;
                        });
        }
    }


})();
