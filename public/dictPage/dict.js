app.controller('dictCtrl', ['$scope', 'dictSrv', function($scope, dictSrv) {
    $scope.word = '';
    $scope.current = {
        word: '',
        meaning: '',
        status: true,
    };
    $scope.searchWord = function() {
        console.log('search word called: ', $scope.word);
        dictSrv.getWord($scope.word).then(function(res) {
            if (res.data.status) {
                $scope.current.word = res.data.message.name;
                $scope.current.meaning = res.data.message.meaning;
                $scope.current.status = true;
                console.log(res.data.message);
            } else {
                console.log('word err:', res.data.message);
                $scope.current.status = false;
            }
        }, function(err) {
            console.log(err);
        });
    };
}]);

app.service('dictSrv', ['$http', function($http) {
    return {
        getWord: function(word) {
            return $http.get('/dict?word=' + word);
        },
    };
}]);
