app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/dictPage/dict.html',
        controller: 'dictCtrl',
        controllerAs: 'dictCtrl',
      })
      .when('/signIn',{
        templateUrl:'login/login.html',
        controller: 'loginCtrl',
        controllerAs:'loginCtrl',
      })
      .when('/SignUp',{
        templateUrl:'signUp/signup.html',
        controller:'signUpCtrl',
        controllerAs:'signUpCtrl',
      })
    $locationProvider.html5Mode(true);
}]);
