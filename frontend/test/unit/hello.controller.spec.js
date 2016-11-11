(function () {
  'use strict';

  describe("Hello Controller Testing", function() {

    beforeEach(module('hello'));
    beforeEach(module('ngRoute'));

    var $controller,$httpBackend;

    beforeEach(inject(function(_$controller_, _$httpBackend_){
        $httpBackend = _$httpBackend_;
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    it("Teste de chamada a home controller",function(){

        var greetingMock = {
            id: '1',
            content: 'Hello World'
        }

        var endpoint = '/sample/api/hello';

        $httpBackend
        .when('GET', endpoint)
        .respond(200, greetingMock);

        var $scope = {};
        var controller = $controller('home', { $scope: $scope});

        //$httpBackend.expectGET(endpoint);

        expect(controller.greeting).toEqual(greetingMock);

        $httpBackend.flush();

         $httpBackend.verifyNoOutstandingExpectation();
         $httpBackend.verifyNoOutstandingRequest();

    });

    });

 })();
