var auth = angular.module('auth',[]);

auth.service('authSrv', ['$window', function ($window) {
    let self = this;
    self.parseJwt = function (token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
    };
    self.saveToken = function (token) {
        $window.localStorage['jwtToken'] = token;
    };
    self.getToken = function () {
        return $window.localStorage['jwtToken'];
    };
    self.isAuthed = function () {
        let token = self.getToken();
        if (token) {
            let params = self.parseJwt(token);
            return Math.round(new Date().getTime() / 1000) <= params.exp;
        } else {
            return false;
        }
    };
    self.logout = function () {
        $window.localStorage.removeItem('jwtToken');
    };
}]);

auth.factory('authInterceptor', ['$injector', function ($injector) {
    return {
        // automatically attach Authorization header
        request: function (config) {
            var token = $injector.get('authSrv').getToken();
            if (token) {
                config.headers.Authorization = 'JWT ' + token;
            }
            return config;
        },
        // If a token was sent back, save it
        response: function (res) {
            if (res.data.token) {
                $injector.get('authSrv').saveToken(res.data.token);
            }
            return res;
        }
    };
}]);
