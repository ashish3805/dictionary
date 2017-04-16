app.controller('signUpCtrl', ['$scope', 'signUpSrv', '$window', '$state',
    'userSrv', function($scope, signUpSrv, $window, $state, userSrv) {
        if (userSrv.isAuthed()) {
            $state.go('home');
        }

        $scope.name = '';
        $scope.email = '';
        $scope.password = '';
        $scope.repassword = '';

        $scope.form = {
            submitted: false,
            hasError: false,
            checked: false,
            error: '',
            hasSuccess: false,
            success: '',
        };

        $scope.doPasswordsMatch = function() {
            return $scope.password === $scope.repassword;
        };

        $scope.signUp = function() {
            if (!$scope.signUpForm.$valid || !$scope.doPasswordsMatch()) {
                console.log('invalid form');
                return;
            }
            $scope.form.submitted = true;
            signUpSrv.signUp({
                name: $scope.name,
                email: $scope.email,
                password: $scope.password,
            }).then(function(res) {
                if (res.data.status) {
                    $scope.form.checked = true;
                    $scope.form.hasSuccess = true;
                    $scope.form.success = 'Signed Up successfully with username ';
                    $window.localStorage['dictUser'] = JSON
                        .stringify(res.data.message);
                    console.log(res.data.message);
                    $state.go('home');
                } else {
                    $scope.form.checked = true;
                    $scope.form.hasError = true;
                    $scope.form.error = res.data.message;
                    console.log('err: ', res.data.message); ;
                }
            }, function(err) {
                $scope.form.error = err;
                $scope.form.checked = true;
                console.log(err);
            });
        };
    }]);

app.service('signUpSrv', ['$http', function($http) {
    return {
        signUp: function(data) {
            return $http.post('/users/signup', data);
        },
    };
}]);
