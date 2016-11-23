(function(){

  'use strict';

  describe('NavigationController testing',function(){

    var $rootScope,navigationService,$q,vm,$location,deferred,navigationServiceMockError,navigationServiceMockSuccess,$templateCache,$controller,$route;

    beforeEach(module('app'));

    beforeAll(function (){

      var dummyFn = function () {
          return $q.when({});
      };

      var erroFn = function(){
        deferred = $q.defer();
        deferred.reject({status:500,statusText:'erro'});
        return deferred.promise;
      };

      var successFn = function(){
        deferred = $q.defer();
        deferred.resolve({principal:'user',authenticated:true});
        return deferred.promise;
      };

      navigationServiceMockError = {
        logout : erroFn,
        login: erroFn
      };

      navigationServiceMockSuccess = {
        logout : dummyFn,
        login: successFn
      };

    });

    beforeEach(inject(function(_$rootScope_,_$q_,_$controller_,_$location_,_$templateCache_,_$route_){
      $rootScope = _$rootScope_;
      $q = _$q_;
      $location = _$location_;
      $controller = _$controller_;
      $templateCache = _$templateCache_;
      $route = _$route_;
      $templateCache.put('/navigation/login.html', '');
      $templateCache.put('/home/home.html', '');
      vm = $controller('NavigationController',{navigationService:navigationServiceMockSuccess,$location:$location});
    }));


    it('Deve instanciar o controller',function (){
      expect(vm).toBeDefined();
    });


    it('Deve realizar login com sucesso',function (){
        vm.credentials = {username:'user',password:'user'};
        vm.login();
        $rootScope.$apply();
        expect($rootScope.principal).toEqual('user');
        expect($rootScope.authenticated).toEqual(true);
        expect($location.path()).toEqual('/');
    });

    it('Deve causar erro ao realizar login',function (){
        vm = $controller('NavigationController',{navigationService:navigationServiceMockError,$location:$location});
        vm.credentials = {username:'teste',password:'1234'};
        vm.login();
        $rootScope.$apply();
        expect($rootScope.authenticated).toEqual(false);
        expect($rootScope.principal).toBeNull();
        expect($location.path()).toEqual('/login');
        expect(vm.error).toBe(true);
    });

    it('Deve realizar logout com sucesso',function (){
        //vm.login();
        vm.credentials = {username:'user',password:'user'};
        vm.authenticated = true;

        vm.logout();
        $rootScope.$apply();

        expect($rootScope.principal).toBeNull();
        expect($rootScope.authenticated).toEqual(false);
        expect($location.path()).toEqual('/');
        expect(vm.error).toBe(false);
    });


    it('Nao deve realizar logout',function (){
        vm = $controller('NavigationController',{navigationService:navigationServiceMockError,$location:$location,$route:$route});
        vm.credentials = {username:'user',password:'user'};
        $rootScope.principal = 'user';
        $rootScope.authenticated = true;
        //vm.login();

        vm.logout();
        $rootScope.$apply();

        expect($rootScope.principal).not.toBeNull();
        expect($rootScope.principal).toBe('user');
        expect($rootScope.authenticated).toEqual(true);
        expect($location.path()).toEqual('/');
        expect(vm.error).toBe(true);
    });


    /*
    it('Deve exibir a aba corretamente',function (){

      expect($route.current).toBeUndefined();
      $location.path('/login');
      //console.log('valor de location');
      $rootScope.$apply();

      //console.log($route.current);
      //console.log($route.current.controller);
      var resultado = vm.tab('NavigationController');
      //console.log(resultado);
      expect(resultado).toBe(true);
      //console.log($route.current.controller);
      //expect($location.path()).toEqual('/');
      //expect(vm.tab('login').toBe(true));
    });
    */

  });

})();
