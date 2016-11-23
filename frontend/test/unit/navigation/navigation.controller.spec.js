(function(){

  'use strict';

  describe('NavigationController testing',function(){

    var $rootScope,navigationService,$q,vm,$location,deferred,navigationServiceMockError,navigationServiceMockSuccess,$templateCache,$controller;

    beforeEach(module('app'));

    beforeAll(function (){

      var dummyFn = function () {
          return $q.when({});
      };

      var errorFn = function(){
        deferred = $q.defer();
        deferred.reject({status:500,statusText:'erro'});
        return deferred.promise;
      };

      var successFn = function(){
        deferred = $q.defer();
        deferred.resolve({principal:'user',authenticated:true});
        return deferred.promise;
      };

      navigationServiceMockError = {
        logout : dummyFn,
        login: errorFn
      };

      navigationServiceMockSuccess = {
        logout : dummyFn,
        login: successFn
      };

    });

    beforeEach(inject(function(_$rootScope_,_$q_,_$controller_,_$location_,_$templateCache_){
      $rootScope = _$rootScope_;
      $q = _$q_;
      $location = _$location_;
      $controller = _$controller_;
      $templateCache = _$templateCache_;
      $templateCache.put('/navigation/login.html', '');
      $templateCache.put('/home/home.html', '');
      vm = $controller('NavigationController',{navigationService:navigationServiceMockSuccess,$location:$location});
    }));


    it('Deve instanciar o controller',function (){
      expect(vm).toBeDefined();
    });


    it('Deve realizar login com erro',function (){
        vm = $controller('NavigationController',{navigationService:navigationServiceMockError,$location:$location});
        vm.credentials = {username:'teste',password:'1234'};
        vm.login();
        $rootScope.$apply();
        expect($rootScope.authenticated).toEqual(false);
        expect($rootScope.principal).toBeNull();
        expect($location.path()).toEqual('/login');
    });


    it('Deve realizar login com sucesso',function (){
        vm.credentials = {username:'user',password:'user'};
        vm.login();
        $rootScope.$apply();
        expect($rootScope.principal).toEqual('user');
        expect($rootScope.authenticated).toEqual(true);
        expect($location.path()).toEqual('/');
    });

  });

})();
