app.controller('dictCtrl', ['$scope', function($scope) {
    $scope.name = 'Ashish Dictionary';
    $scope.word = '';
    $scope.searchWord = function() {
        console.log('search word called: ', $scope.word);
    };
}]);
