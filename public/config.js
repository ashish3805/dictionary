app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/dictPage/dict.html',
        controller: 'dictCtrl',
        controllerAs: 'dictCtrl',
      })
      .when('/signIn',{
        templateUrl:'signIn/signIn.html',
        controller: 'signInCtrl',
        controllerAs:'signInCtrl',
      })
      .when('/signup',{
        templateUrl:'signUp/signup.html',
        controller:'signUpCtrl',
        controllerAs:'signUpCtrl',
      })
    $locationProvider.html5Mode(true);
}]);
