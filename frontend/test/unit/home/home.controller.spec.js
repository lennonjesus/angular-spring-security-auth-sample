(function () {
  'use strict';

  describe("Home Controller Testing", function() {

    beforeEach(module('app'));

    var vm,$q, navigationServiceMock,$rootScope,$templateCache;

    beforeAll(function () {

      var dummyFn = function () {
        return $q.when({});
      };

      navigationServiceMock = {
        getResource : dummyFn
      };

    });

    beforeEach(inject(function($controller, _$q_, _$rootScope_,_$templateCache_) {

        $q = _$q_;
        $rootScope = _$rootScope_;
        vm = $controller('HomeController',{navigationService:navigationServiceMock});
        $templateCache = _$templateCache_;
        $templateCache.put('/navigation/login.html', '');
        $templateCache.put('/home/home.html', '');
    }));

    it("Teste de funcao de inicializacao",function(){

      var greetingMock = {id:1,content:'Hello User'};

      spyOn(navigationServiceMock, "getResource").and.returnValue(
        $q.when(greetingMock)
      );

      expect(vm).toBeDefined();
      vm.init();

      $rootScope.$apply();

      expect(vm.greeting).toEqual(greetingMock);
      expect(navigationServiceMock.getResource).toHaveBeenCalled();

    });

  });

 })();
