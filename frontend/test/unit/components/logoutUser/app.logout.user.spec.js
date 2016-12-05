(function(){

  'use strict';

  describe('LoginPanelController testing',function(){

    var $rootScope,$q,vm,deferred,navigationServiceMockError,navigationServiceMockSuccess,$controller,$state;

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

    beforeEach(inject(function(_$rootScope_,_$q_,_$controller_,_$templateCache_,_$state_){
      $rootScope = _$rootScope_;
      $q = _$q_;
      $state = _$state_;
      $controller = _$controller_;
      vm = $controller('LogoutController',{navigationService:navigationServiceMockSuccess,$state:$state});
    }));


    it('Deve instanciar o controller',function (){
      expect(vm).toBeDefined();
    });


    it('Deve realizar logout com sucesso',function (){
        vm.credentials = {username:'user',password:'user'};
        vm.authenticated = true;

        spyOn($state,'go').and.callThrough();

        vm.logout();
        $rootScope.$apply();

        expect($rootScope.principal).toBeNull();
        expect($rootScope.authenticated).toEqual(false);
        expect($state.current.url).toEqual('/');
        expect($state.go).toHaveBeenCalledWith('home');
        expect(vm.error).toBe(false);
    });


    it('Nao deve realizar logout',function (){

        vm = $controller('LogoutController',{navigationService:navigationServiceMockError});
        vm.credentials = {username:'user',password:'user'};
        $rootScope.principal = 'user';
        $rootScope.authenticated = true;

        spyOn($state,'go').and.callThrough();
        vm.logout();
        $rootScope.$apply();

        expect($rootScope.principal).not.toBeNull();
        expect($rootScope.principal).toBe('user');
        expect($rootScope.authenticated).toEqual(true);
        expect($state.current.url).toEqual('/');
        expect(vm.error).toBe(true);
    });

  });

})();
