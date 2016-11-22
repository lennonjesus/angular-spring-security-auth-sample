(function(){

  'use strict';

  describe('Navigation Service testing', function(){

    beforeEach(module('app'));

    var $httpBackend,navigationService,endpoint;

    beforeEach(inject(function(_navigationService_,_$httpBackend_){
      $httpBackend = _$httpBackend_;
      navigationService = _navigationService_;
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

    });

    it('Deve instanciar navigation service',function(){

      expect(navigationService).toBeDefined();

    });

    it('Deve chamar metodo getResource',function(){

      var greetingMock = {
          id: '1',
          content: 'Hello World'
      };

      endpoint = '/sample/api/resource/';

      $httpBackend
          .whenGET(endpoint)
          .respond(200, greetingMock);

      navigationService.getResource().then(function(data){
        expect(data).toEqual(greetingMock);
      });

      $httpBackend.expectGET(endpoint);
      $httpBackend.flush();
    });


    it('Deve retornar dados usuario autenticado',function(){

      endpoint = '/sample/api/user';

      var cabecalho = {"authorization":"Basic xyz","Accept":"application/json, text/plain, */*","X-Requested-With":"XMLHttpRequest"};

      var usuario = {'name':'teste','authenticated':true};

      $httpBackend
          .whenGET(endpoint,cabecalho)
          .respond(200,usuario,{},'OK');

      navigationService.login({"authorization":"Basic xyz"}).then(function (response) {
          expect(response).toEqual(usuario);
      });

      $httpBackend.expectGET(endpoint,cabecalho);
      $httpBackend.flush();

    });


    it('Deve realizar logout',function(){

      endpoint = '/sample/api/logout';

      $httpBackend
          .whenPOST(endpoint)
          .respond(200);

      navigationService.logout();

      $httpBackend.expectPOST(endpoint);
      $httpBackend.flush();

    });


    /*
    it('Deve retornar usuario autenticado',function(){

      endpoint = '/sample/api/user';



      $httpBackend
          .whenGET(endpoint)
          .respond(401,undefined,{},'unauthorized');

      navigationService.login({authorization:'Basic blablabla'}).catch(function(erro) {
        console.log(erro);
        //expect(texto).toEqual(error);
      });


      $httpBackend.expectGET(endpoint);
      $httpBackend.flush();

      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();

    });
    */

  });
})();
