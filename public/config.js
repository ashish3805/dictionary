app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('signIn', {
      url: '/signIn',
      templateUrl: 'signIn/signIn.html',
      controller: 'signInCtrl',
    })
    .state('home', {
      templateUrl: '/dictPage/dict.html',
      controller: 'dictCtrl',
      url: '/home',
    })
    .state('signUp', {
      templateUrl: 'signUp/signUp.html',
      controller: 'signUpCtrl',
      url: '/signUp',
    })
    .state('account', {
      templateUrl: '/user/user.html',
      controller: 'profileCtrl',
      url: '/account',
    });
  $urlRouterProvider.otherwise('home');
  $httpProvider.interceptors.push('authInterceptor');
}]);
