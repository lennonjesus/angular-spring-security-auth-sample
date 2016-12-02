(function(){

  'use strict';

  UserInfoPanelController.$inject = ['navigationService'];

  function UserInfoPanelController(navigationService){

    var vm = this;
    vm.greeting = {};
    vm.init = init;
    vm.init();

    function init(){
      navigationService.getResource()
      .then(getInitSuccess)
      .catch(getInitError);

      function getInitSuccess(data){
        vm.greeting = data;
      }

      function getInitError(err){
        console.log(err);
      }

    }
  }

  var diretiva = {
    templateUrl:'components/userInfoPanel/userInfoPanel.html',
    controller:UserInfoPanelController,
  };

  angular.module('app').component('appUserInfoPanel',diretiva);


})();
