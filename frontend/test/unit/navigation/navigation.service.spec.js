(function(){

  'use strict';

  describe('Navigation Service testing', function(){

    beforeEach(module('app'));

    var $httpBackend,navigationService,endpoint,$templateCache;

    beforeEach(inject(function(_navigationService_,_$httpBackend_,_$templateCache_){
      $httpBackend = _$httpBackend_;
      navigationService = _navigationService_;
      $templateCache = _$templateCache_;
      $templateCache.put('/navigation/login.html', '');
      $templateCache.put('/home/home.html', '');
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


    it('Deve realizar login e retornar dados usuario autenticado',function(){

      endpoint = '/sample/api/user';

      var cabecalho = {"authorization":"Basic xyz","Accept":"application/json, text/plain, *\/*","X-Requested-With":"XMLHttpRequest"};

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


    it('Deve causar erro ao realizar login',function(){

      endpoint = '/sample/api/user';

      var cabecalho = {"authorization":"Basic xyz","Accept":"application/json, text/plain, *\/*","X-Requested-With":"XMLHttpRequest"};

      var err = {status:401,statusText:'unauthorized'};

      $httpBackend
          .whenGET(endpoint,cabecalho)
          .respond(401,{},{},'unauthorized');

      navigationService.login({"authorization":"Basic xyz"}).catch(function (response) {
          expect(response).toEqual(err);
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

    it('Deve exibir erro ao realizar logout',function(){

      endpoint = '/sample/api/logout';

      var responseMock = {status:500, statusText:'Nao foi possivel realizar a operacao'};

      $httpBackend
          .whenPOST(endpoint)
          .respond(500,{},{},'Nao foi possivel realizar a operacao');

      navigationService.logout().catch(function (err) {
        expect(err).toEqual(responseMock);
      });

      $httpBackend.expectPOST(endpoint);
      $httpBackend.flush();

    });


  });
})();
