let app = angular.module('app', ['ngRoute']);

app.controller('baseController',["$scope", function($scope){
    $scope.name = "Ashish Dictionary";
}]);

