(function(){

  'use strict';

  describe('LoginPanelController testing',function(){

    var $rootScope,$q,vm,deferred,navigationServiceMockError,navigationServiceMockSuccess,$componentController,$state;

    beforeEach(module('app'));

    beforeAll(function (){

      var dummyFn = function () {
          return $q.when({});
      };

      var erroFn = function(){
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
        logout : erroFn,
        login: erroFn
      };

      navigationServiceMockSuccess = {
        logout : dummyFn,
        login: successFn
      };

    });

    beforeEach(inject(function(_$rootScope_,_$q_,_$componentController_,_$templateCache_,_$state_){
      $rootScope = _$rootScope_;
      $q = _$q_;
      $state = _$state_;
      $componentController = _$componentController_;
      vm = $componentController('appLoginPanel',{navigationService:navigationServiceMockSuccess,$state:$state});
    }));


    it('Deve instanciar o controller',function (){
      expect(vm).toBeDefined();
    });


    it('Deve realizar login com sucesso',function (){
        vm.credentials = {username:'user',password:'user'};

        spyOn($state,'go').and.callThrough();
        vm.login();
        $rootScope.$apply();

        expect($rootScope.principal).toEqual('user');
        expect($rootScope.authenticated).toEqual(true);
        expect($state.current.url).toEqual('/');
        expect($state.go).toHaveBeenCalledWith('home');
    });


    it('Deve causar erro ao realizar login',function (){

        vm = $componentController('appLoginPanel',{navigationService:navigationServiceMockError});
        spyOn($state,'go').and.callThrough();
        vm.credentials = {username:'teste',password:'1234'};

        vm.login();
        $rootScope.$apply();

        expect($rootScope.principal).toBeNull();
        expect($rootScope.authenticated).toEqual(false);
        expect(vm.error).toBe(true);
        expect($state.current.url).toEqual('/login');
        expect($state.go).toHaveBeenCalledWith('login');
    });

  });

})();
