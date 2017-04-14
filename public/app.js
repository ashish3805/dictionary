let app = angular.module('app', ['ngRoute']);

app.controller('baseController',["$scope", function($scope){
    $scope.name = "Ashish Dictionary";
}]);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/dictPage/dict.html',
        controller: 'dictCtrl',
        controllerAs: 'dictCtrl'
      })
    $locationProvider.html5Mode(true);
}]);
