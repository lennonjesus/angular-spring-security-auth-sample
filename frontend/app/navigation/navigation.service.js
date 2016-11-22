(function() {

  angular.module('app').factory('navigationService',navigationService);

  function navigationService($http,$q) {

    var navigationService = {
      logout : logout,
      getResource : getResource,
      login:login
    };

    return navigationService;

    function logout(){

      var promise = $http.post('/sample/api/logout')
      .then(getLogoutSuccess);

      function getLogoutSuccess() {
        return $q.when();
      }
      return promise;
    }

    function login(headers){
      var promise = $http.get('/sample/api/user', {
        headers : headers
      })
      .then(function(response) {
        return response.data;
      });

      return promise;
    }

    function getResource(){
      var promise = $http.get('/sample/api/resource/')
      .then(getResourceSuccess);

      function getResourceSuccess(response){
        return response.data;
      }

      return promise;
    }

  }


})();
