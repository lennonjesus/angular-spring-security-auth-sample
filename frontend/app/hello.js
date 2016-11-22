angular.module('app', [ 'ngRoute' ]).config(function($routeProvider, $httpProvider) {

	$routeProvider.when('/', {
		templateUrl : 'home/home.html',
		controller : 'HomeController',
		controllerAs: 'vm'
	}).when('/login', {
		templateUrl : 'navigation/login.html',
		controller : 'NavigationController',
		controllerAs: 'vm'
	}).when('/outro', {
		templateUrl : 'navigation/outro.html',
		controller : 'NavigationController',
		controllerAs: 'vm'
	}).otherwise('/');

	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

}).controller('NavigationController',

		function($rootScope, $http, $location, $route) {

			var self = this;

			self.tab = function(route) {
				return $route.current && route === $route.current.controller;
			};

			var authenticate = function(credentials, callback) {

				var headers = credentials ? {
					authorization : "Basic "
							+ btoa(credentials.username + ":"
									+ credentials.password)
				} : {};

				$http.get('/sample/api/user', {
					headers : headers
				}).success(function(data) {
					if (data.name) {
						$rootScope.authenticated = true;
					} else {
						$rootScope.authenticated = false;
					}
					callback && callback($rootScope.authenticated);
				}).error(function() {
					$rootScope.authenticated = false;
					callback && callback(false);
				});

			}

			authenticate();

			self.credentials = {};
			self.login = function() {
				authenticate(self.credentials, function(authenticated) {
					if (authenticated) {
						console.log("Login succeeded")
						$location.path("/");
						self.error = false;
						$rootScope.authenticated = true;
					} else {
						console.log("Login failed")
						$location.path("/login");
						self.error = true;
						$rootScope.authenticated = false;
					}
				})
			};

			self.logout = function() {
				$http.post('/sample/api/logout', {}).finally(function() {
					$rootScope.authenticated = false;
					$location.path("/");
				});
			}

		}).controller('HomeController', function($http) {
	var self = this;

	self.exibirHome = function() {
	   $http.get('/sample/api/resource/').success(function(data) {
       		self.greeting = data;
       	});

	};

	self.exibirHome();

});
