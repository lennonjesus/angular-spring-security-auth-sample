(function () {
  'use strict';

  angular.module('MyApp').config(Config);

  Config.$inject = ['$routeProvider', '$httpProvider'];

  function Config($routeProvider, $httpProvider) {
    $routeProvider.when('/', {
      templateUrl: 'main.html',
      controllerAs: 'vm',
      controller: 'LoginCtrl'
    }).otherwise({
      redirectTo: '/'
    });

    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  }

})();
