let app = angular.module('app', ['ui.router']);

app.controller('baseController',["$scope", function($scope){
    $scope.name = "Ashish Dictionary";
}]);

