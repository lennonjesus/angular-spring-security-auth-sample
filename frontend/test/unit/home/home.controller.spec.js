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
    })

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

    /*
    beforeEach(inject(function($controller, _$httpBackend_, _$rootScope_) {
        vm = $controller('HomeController');
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;

    }));



    it("Teste de chamada a home controller",function(){

        console.log('inicio');
        var greetingMock = {
            id: '1',
            content: 'Hello World'
        }

        var endpoint = '/sample/api/resource/';

        $httpBackend
            .when('GET', endpoint)
            .respond(200, greetingMock);

        vm.init();

        $httpBackend.expectGET(endpoint);
        $httpBackend.flush();

        $rootScope.$apply();

        expect(vm.greeting).toEqual(greetingMock);

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();

    });

    });
    */
  })

 })();
