(function(){
  angular.module('app').factory('navigationService',navigationService);

  navigationService.$inject = ['$http','$q'];

  function navigationService($http,$q){

    var authenticated = false;

    var navigationService = {
        logout : logout,
        isAuthenticated : isAuthenticated,
        getResource : getResource
    };

    return navigationService;

    function logout(){

      return $http.post('/sample/api/logout').
          then(getLogoutSuccess);

      function getLogoutSuccess() {
          authenticated = false;
          return $q.when();
      });
    }

    function login(headers){
        var promise = $http.get('/sample/api/user',headers)
            .then(function(response) {
                return response.data;
            });

        return promise;

    }

    function isAuthenticated(){
        return authenticated;
    }

    function getResource(){
        var promise = $http.get('/sample/api/resource/')
          .then(getResourceSuccess);

        function getResourceSuccess(response){
           return response.data;
        }

        return promise;
    }


    function getUser(){


    }

})();
