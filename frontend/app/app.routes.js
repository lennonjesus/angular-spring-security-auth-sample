(function(){
    'use strict';

    angular.module('app').config(Configuracao);

    Configuracao.$inject = ['$routeProvider'];

    function Configuracao($routeProvider){

        $routeProvider.when('/', {
        		templateUrl : '/home/home.html',
        		controller : 'HomeController',
        		controllerAs: 'vm'
        	}).when('/login', {
        		templateUrl : '/navigation/login.html',
        		controller : 'NavigationController',
        		controllerAs: 'vm'
        	}).when('/outro', {
        		templateUrl : '/navigation/outro.html',
        		controller : 'NavigationController',
        		controllerAs: 'vm'
        	}).otherwise('/');
    }

})();
