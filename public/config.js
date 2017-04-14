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
    $locationProvider.html5Mode(true);
}]);
