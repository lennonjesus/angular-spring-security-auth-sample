(function(){

  'use strict';

  describe('NavigationController testing',function(){

    var $rootScope,navigationService,$q,vm,$location,deferred,navigationServiceMock,$templateCache;

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

      navigationServiceMock = {
        logout : dummyFn,
        login: errorFn
      };

    });

    beforeEach(inject(function(_$rootScope_,_$q_,$controller,_$location_,_$templateCache_){
      $rootScope = _$rootScope_;
      $q = _$q_;
      $location = _$location_;
      $templateCache = _$templateCache_;
      $templateCache.put('/navigation/login.html', '');
      vm = $controller('NavigationController',{navigationService:navigationServiceMock,$location:$location});
    }));

    it('Deve instanciar o controller',function (){

      expect(vm).toBeDefined();
    });


    it('Deve realizar erro de login',function (){

        vm.login();
        $rootScope.$apply();
        console.log($rootScope.authenticated);
        expect($rootScope.authenticated).toEqual(false);
        expect($location.path()).toEqual('/login');
    });


  });

})();
