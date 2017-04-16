app.controller('signInCtrl', ['$scope', '$window', '$state', 'signInSrv', 'userSrv', function ($scope, $window, $state, signInSrv, userSrv) {
        if(userSrv.isAuthed()){
            $state.go('home');
        }
        
        $scope.email = '';
        $scope.password = '';

        var reset = function () {
            $scope.email = '';
            $scope.password = '';
        };

        $scope.signInForm = {
            submitted: false,
            hasError: false,
            checked: false,
            error: ''
        };

        $scope.signIn = function () {
            $scope.signInForm.submitted = true;
            signInSrv.signIn({
                email: $scope.email,
                password: $scope.password
            }).then(
                function (res) {
                    if (res.data.status) {
                        $scope.signInForm.checked = true;
                        $window.localStorage['dictUser'] = JSON
                            .stringify(res.data.message);
                        console.log(res.data.message);
                        $state.go('home');
                    }
                    else {
                        $scope.signInForm.checked = true;
                        $scope.signInForm.hasError = true;
                        $scope.signInForm.error = res.data.message;
                        console.log(res.data.message);
                    }
                },
                function (err) {
                    $scope.signInForm.checked = true;
                    $scope.signInForm.hasError = true;
                    $scope.signInForm.error = res.data.message;
                });
        }
    }]);

app.service('signInSrv', ['$http', function ($http) {
    let $scope = this;
    $scope.signIn = function (data) {
        return $http.post('/users/signin', data);
    };
}]);
