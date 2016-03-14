
(function () {

    'use strict';

    angular.module('myApp').controller('MainController', MainController);

    MainController.$inject = ['$scope', '$location', 'loginService', 'ENV_CONFIG', 'toaster', '$filter', '$translate'];

    function MainController($scope, $location, loginService, ENV_CONFIG, toaster, $filter, $translate) {

        var self = this;

        $scope.$on('event:userLogout', function () {
            $scope.hasPermission = {};
            $location.path('/');
        });

        $scope.$on('event:userDetailsPrepared', function () {
            self.hasPermission = loginService.getCurrentUser().permissions;
        });

        this.envConfig = ENV_CONFIG;
    }

})();
