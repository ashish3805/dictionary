let app = angular.module('app', ['ui.router', 'user']);

app.controller('baseController', ["$scope", 'userSrv', '$state',function (
    $scope, userSrv, $state) {
    $scope.user = {};
    $scope.isAuthed = function () {
        if (userSrv.isAuthed()) {
            $scope.user = userSrv.getUser();
            return true;
        } else {
            return false;
        }
    }
    $scope.signOut= function(){
        userSrv.signOut();
        $state.go('home');
    }
}]);

