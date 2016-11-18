(function () {
  'use strict';

  describe("Hello Controller Testing", function() {

    beforeEach(module('app'));

    var vm, $httpBackend, $rootScope;

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

 })();
