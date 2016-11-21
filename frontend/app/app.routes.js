(function(){
    'use strict';

    angular.module('app').config(Configuracao);

    Configuracao.$inject = ['$routeProvider','$httpProvider'];

    function Configuracao($routeProvider,$httpProvider){

        $routeProvider.when('/', {
        		templateUrl : '/home/home.html',
        		controller : 'HomeController',
        		controllerAs: 'vm'
        	}).when('/outro', {
        		templateUrl : '/home/outro.html',
        		controller : 'HomeController',
        		controllerAs: 'vm'
        	}).when('/login', {
        		templateUrl : '/navigation/login.html',
        		controller : 'NavigationController',
        		controllerAs: 'vm'
        	}).otherwise('/');

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }

})();
