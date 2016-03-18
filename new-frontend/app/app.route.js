(function () {

  'use strict';

  angular.module("myApp").config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl : 'module/login.html',
        controller  : 'LoginCtrl'
      });

  });

})();
