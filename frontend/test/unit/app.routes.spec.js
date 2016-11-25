(function(){

  describe('Teste das rotas do app',function(){

    var $state,$templateCache;

    beforeEach(module('app'));

    beforeEach(inject(function(_$state_,_$templateCache_){
      $state = _$state_;
      $templateCache = _$templateCache_;
      $templateCache.put('/navigation/login.html', '');
      $templateCache.put('/home/home.html', '');
    }));

    it('Deve rotear corretamente para home',function(){

      var home = $state.get('home');

      expect(home.controller).toBe('HomeController');
      expect(home.controllerAs).toBe('vm');
      expect(home.url).toBe('/');
      expect(home.name).toBe('home');


    });


    it('Deve rotear corretamente para outro',function(){

      var home = $state.get('outro');

      expect(home.controller).toBe('HomeController');
      expect(home.controllerAs).toBe('vm');
      expect(home.url).toBe('/outro');
      expect(home.name).toBe('outro');

    });

    it('Deve rotear corretamente para login',function(){

      var home = $state.get('login');

      expect(home.controller).toBe('NavigationController');
      expect(home.controllerAs).toBe('vm');
      expect(home.url).toBe('/login');
      expect(home.name).toBe('login');

    });






  });

})();
