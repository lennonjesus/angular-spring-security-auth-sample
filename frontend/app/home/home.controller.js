(function(){

    'use strict';
    angular.module('app').controller('HomeController',HomeController);

    HomeController.$inject = ['$http','navigationService']

    function HomeController($http,navigationService){

        var vm = this;
        vm.greeting = {};
        vm.init = init;

        vm.init();

        function init() {
          navigationService.getResource().then(function(data){
              vm.greeting = data;

          });
        }
    }

})();
