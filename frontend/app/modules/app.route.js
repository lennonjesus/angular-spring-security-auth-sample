(function() {
   'use strict';

	angular.module('myApp').config(Config);

  Config.$inject = ['$translateProvider', '$urlRouterProvider', '$stateProvider'];

    function Config($translateProvider, $urlRouterProvider, $stateProvider) {

        $stateProvider
            .state('main', {
                url: "/",
                controller: 'loginController',
                controllerAs: 'vm',
                templateUrl: "modules/main/main.html"
            })
        ;

        $urlRouterProvider.otherwise("/");
        $translateProvider.useStaticFilesLoader({prefix: '/', suffix: '.json'});
        $translateProvider.preferredLanguage('i18n/locale-pt-BR');

    }

})();
