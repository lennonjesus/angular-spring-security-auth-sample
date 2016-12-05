(function(){

  describe('Teste das rotas do app',function(){

    var $state,$templateCache,pagina;

    beforeEach(module('app'));

    beforeEach(inject(function(_$state_){
      $state = _$state_;
    }));

    it('Deve rotear corretamente para home',function(){

      pagina = $state.get('home');
      expect(pagina.component).toBe('appUserInfoPanel');
      expect(pagina.url).toBe('/');
      expect(pagina.name).toBe('home');


    });


    it('Deve rotear corretamente para outro',function(){

      pagina = $state.get('outro');
      expect(pagina.component).toBe('appOutroPanel');
      expect(pagina.url).toBe('/outro');
      expect(pagina.name).toBe('outro');

    });

    it('Deve rotear corretamente para login',function(){

      pagina = $state.get('login');

      expect(pagina.component).toBe('appLoginPanel');
      expect(pagina.url).toBe('/login');
      expect(pagina.name).toBe('login');

    });

  });

})();
