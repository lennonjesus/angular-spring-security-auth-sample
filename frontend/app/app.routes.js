(function(){
  'use strict';

  angular.module('app').config(Configuracao);

  Configuracao.$inject = ['$httpProvider','$stateProvider','$urlRouterProvider'];

  function Configuracao($httpProvider,$stateProvider,$urlRouterProvider){

    $stateProvider
      .state('home',{
        url:"/",
        templateUrl:'/home/home.html',
        controller : 'HomeController',
        controllerAs: 'vm'
      })
      .state('outro',{
        url:'/outro',
        templateUrl : '/home/outro.html',
        controller : 'HomeController',
        controllerAs: 'vm'
      })
      .state('login',{
        url:'/login',
        templateUrl : '/navigation/login.html',
        controller : 'NavigationController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise("/");
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  }

})();
