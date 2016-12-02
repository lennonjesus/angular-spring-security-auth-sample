(function(){
  'use strict';

  angular.module('app').config(Configuracao);

  Configuracao.$inject = ['$httpProvider','$stateProvider','$urlRouterProvider'];

  function Configuracao($httpProvider,$stateProvider,$urlRouterProvider){

    $stateProvider

      .state('home',{
        url:"/",
        component: 'appUserInfoPanel',
      })

      .state('outro',{
        component:'appOutroPanel',
        url:'/outro'
      })
      .state('login',{
        url:'/login',
        component:'appLoginPanel'
      });
    $urlRouterProvider.otherwise("/");
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  }

})();
