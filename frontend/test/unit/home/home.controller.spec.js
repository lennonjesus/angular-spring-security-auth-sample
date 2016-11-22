(function () {
  'use strict';

  describe("Home Controller Testing", function() {

    beforeEach(module('app'));

    var vm,$q, navigationServiceMock,$rootScope;

    beforeAll(function () {

      var dummyFn = function () {
        return $q.when({});
      };

      navigationServiceMock = {
        getResource : dummyFn
      };

    });

    beforeEach(inject(function($controller, _$q_, _$rootScope_) {

        $q = _$q_;
        $rootScope = _$rootScope_;
        vm = $controller('HomeController',{navigationService:navigationServiceMock});
    }));

    it("Teste instanciacao de home controller",function(){
      expect(vm).toBeDefined();
    });

    it("Teste de funcao de inicializacao",function(){

      var greetingMock = {id:1,content:'Hello User'};

      spyOn(navigationServiceMock, "getResource").and.returnValue(
        $q.when(greetingMock)
      );

      vm.init();

      $rootScope.$apply();

      expect(vm.greeting).toEqual(greetingMock);
      expect(navigationServiceMock.getResource).toHaveBeenCalled();

    });

  });

 })();
