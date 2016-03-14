(function () {
  'use strict';

  angular.module('MyApp', [
    'ngRoute',
    'satellizer'
  ]).config(Config);

  Config.$inject = ['$authProvider'];

  function Config($authProvider) {

    $authProvider.facebook({
      clientId: '1655408654720289'
    });

    // Optional: For client-side use (Implicit Grant), set responseType to 'token'
    $authProvider.facebook({
      clientId: '1655408654720289',
      responseType: 'token'
    });

    $authProvider.google({
      clientId: '120814736608-sc6qm318fj82jcjuo812cp78itm4fr8g.apps.googleusercontent.com'
    });

    $authProvider.github({
      clientId: 'GitHub Client ID'
    });

    $authProvider.linkedin({
      clientId: 'LinkedIn Client ID'
    });

    $authProvider.instagram({
      clientId: 'Instagram Client ID'
    });

    $authProvider.yahoo({
      clientId: 'Yahoo Client ID / Consumer Key'
    });

    $authProvider.live({
      clientId: 'Microsoft Client ID'
    });

    $authProvider.twitch({
      clientId: 'Twitch Client ID'
    });

    $authProvider.bitbucket({
      clientId: 'Bitbucket Client ID'
    });

    // No additional setup required for Twitter

    $authProvider.oauth2({
      name: 'foursquare',
      url: '/auth/foursquare',
      clientId: 'Foursquare Client ID',
      redirectUri: window.location.origin,
      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
    });

  }

})();
