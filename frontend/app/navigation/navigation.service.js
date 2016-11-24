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
        .then(getLogoutSuccess)
        .catch(getLogoutError);

      function getLogoutSuccess() {
        return $q.when();
      }

      function getLogoutError(err) {
        return $q.reject({status:err.status, statusText:err.statusText});
      }

      return promise;
    }

    function login(headers){
      var promise = $http.get('/sample/api/user', { headers : headers })
        .then(getLoginSuccess)
        .catch(getLoginError);

      function getLoginSuccess(response){
        return response.data;
      }

      function getLoginError(err) {
        return $q.reject({status:err.status, statusText:err.statusText});
      }

      return promise;
    }

    function getResource(){
      var promise = $http.get('/sample/api/resource/').then(getResourceSuccess);

      function getResourceSuccess(response){
        return response.data;
      }

      return promise;
    }

  }

})();
