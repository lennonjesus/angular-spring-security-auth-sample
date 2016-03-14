(function() {
    'use strict';

    angular.module('myApp', [

        'http-auth-interceptor',

        /*
         * Angular modules
         */
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        // 'ngTouch',


        'ui.router',
        'blockUI',


        'toaster',
        'pascalprecht.translate'
    ]);

})();
