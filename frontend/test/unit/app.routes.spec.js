(function(){

  describe('Teste das rotas do app',function(){

    var $state,$templateCache,pagina;

    beforeEach(module('app'));

    beforeEach(inject(function(_$state_){
      $state = _$state_;
    }));

    it('Deve rotear corretamente para home',function(){

      pagina = $state.get('home');
      expect(home.component).toBe('appUserInfoPanel');
      expect(home.url).toBe('/');
      expect(home.name).toBe('home');


    });


    it('Deve rotear corretamente para outro',function(){

      pagina = $state.get('outro');
      console.log(home);
      expect(home.component).toBe('appOutroPanel');
      expect(home.url).toBe('/outro');
      expect(home.name).toBe('outro');

    });

    it('Deve rotear corretamente para login',function(){

      pagina = $state.get('login');

      expect(home.component).toBe('appLoginPanel');
      expect(home.url).toBe('/login');
      expect(home.name).toBe('login');

    });

  });

})();
