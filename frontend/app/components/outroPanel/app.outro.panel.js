(function(){
  'use strict';

  angular.module('app').component('appOutroPanel',{
    template:'<div ng-show="$root.authenticated" class="jumbotron"><p class="text-center text-primary">Soh auth!</p></div>'
  });

})();
