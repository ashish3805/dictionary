app.controller('signUpCtrl', ['$scope', 'signUpSrv', function (
    $scope, signUpSrv) {
    $scope.name = '';
    $scope.email = '';
    $scope.password = '';
    $scope.repassword = '';
    $scope.dob;

    $scope.signUp = function () {
        signUpSrv.signUp({
            name: $scope.name,
            email: $scope.email,
            password: $scope.password,
            dob: $scope.dob
        }).then(function(res){
            if(res.data.status){
                console.log("signed up:", res.data.message);
            }else{
                console.log("sign up err:", res.data.message);
            }
        },function(err){
            console.log(err);
        });
    };
}]);

app.service('signUpSrv', ['$http', function ($http) {
    let self = this;
    self.signUp = function (data) {
        return $http.post('/users/signup', data);
    };
}]);
