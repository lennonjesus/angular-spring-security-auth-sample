(function () {

  'use strict';

  angular.module("myApp").config(Config);

  function Config($authProvider) {
    $authProvider.loginUrl = '/sample/api/authentication';
    $authProvider.tokenPrefix = 'com.lennonjesus';
  }

})();
