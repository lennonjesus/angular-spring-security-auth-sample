(function() {
    'use strict';

    angular.module('myApp')
        .controller('loginController', ['$scope', 'loginService' , 'authService' , '$document', '$animate', function ($scope, loginService , authService,$document, $animate) {

        $scope.submit = function() {



            // var element = angular.element($document[0].querySelector('#login-holder'));
            // $animate.removeClass(element, 'shake');

            console.log("login!");

            loginService.login( {'username':$scope.username , 'password':$scope.password} , function (data) {
                loginService.activateLogin(data);
            }, function (data) {
                $animate.addClass(element, 'shake');
                loginService.logoff(data);
            });
        };

        $scope.logout = function() {
            loginService.logoff(data);
            loginService.logout( {'username':$scope.username , 'password':$scope.password} , function (data) {});
        };

    }]);

})();
