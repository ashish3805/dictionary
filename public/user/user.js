let user = angular.module('user', ['auth']);
user.service('userSrv', ['authSrv', '$http', '$window', function(
    authSrv, $http, $window) {
    let isUserAuthed = function() {
        return authSrv.isAuthed();
    };

    return {
        getUser: function() {
            if (!isUserAuthed()) {
                return null;
            } else {
                return JSON.parse($window.localStorage['dictUser']);
            }
        },
        isAuthed: function() {
            return isUserAuthed();
        },
        signOut: function() {
            $window.localStorage.removeItem('dictUser');
            $window.localStorage.removeItem('jwtToken');
        },
    };
}]);
