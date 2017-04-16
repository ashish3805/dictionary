app.controller('signInCtrl', ['$scope', '$window', '$state', 'signInSrv',
    function ($scope, $window, $state, signInSrv) {
        $scope.email = '';
        $scope.password = '';
        $scope.signIn = function () {
            signInSrv.signIn({
                email: $scope.email,
                password: $scope.password
            }).then(
                function (res) {
                    if (res.data.status) {
                        $window.localStorage['dictUser'] = JSON
                            .stringify(res.data.message);
                        console.log(res.data.message);
                        $state.go('home');
                    }
                    else {
                        console.log(res.data.message);
                    }
                },
                function (err) {
                    console.log(err);
                });
        }
    }]);

app.service('signInSrv', ['$http', function ($http) {
    let self = this;
    self.signIn = function (data) {
        return $http.post('/users/signin', data);
    };
}]);
