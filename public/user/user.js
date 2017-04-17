let user = angular.module('user', ['auth']);
user.service('userSrv', ['authSrv', '$http', '$window', function (
    authSrv, $http, $window) {
    let isUserAuthed = function () {
        return authSrv.isAuthed();
    };

    let getUser = function () {
        if (!isUserAuthed()) {
            return null;
        } else {
            return JSON.parse($window.localStorage['dictUser']);
        }
    }
    let isWordChecked = function (wordId) {
        if (isUserAuthed) {
            var userJSON = getUser()
            if (userJSON) {
                return userJSON.words.includes(wordId);
            } else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    return {
        getUser: function () {
            return getUser();
        },
        save: function (userJSON) {
            if (!isUserAuthed()) {
                return null;
            } else {
                var userData = JSON.stringify(userJSON)
                $window.localStorage['dictUser'] = userData;
                return JSON.parse($window.localStorage['dictUser']);
            }
        },
        isAuthed: function () {
            return isUserAuthed();
        },
        signOut: function () {
            $window.localStorage.removeItem('dictUser');
            $window.localStorage.removeItem('jwtToken');
        },
        isWordChecked: function (wordId) {
            return isWordChecked(wordId);
        },
        checkWord: function (wordId) {
            return $http.put('/users/checkword?word_id=' + wordId);
        },
        unCheckWord: function (wordId) {
            return $http.put('/users/uncheckword?word_id=' + wordId);
        },
        saveProfile: function (userData) {
            console.log('saving user:', userData);
            return $http.put('/users/update', userData);
        },
        getWordList: function () {
            return getUser().words;
        },
        getWordById: function (word) {
            return $http.get('/dict/byid/?word=' + word);
        }
    };
}]);
