app.controller('dictCtrl', ['$scope', 'dictSrv', 'userSrv', '$window', function ($scope, dictSrv, userSrv, $window) {
    $scope.isAuthed = function () {
        console.log(userSrv.isAuthed());
        return userSrv.isAuthed();
    };

    let star = angular.element(document.querySelector('#star'));

    var setIfChecked = function () {
        if (userSrv.isWordChecked($scope.word._id)) {
            star.html('★');
        } else {
            star.html('☆');
        }
    }

    $scope.isWordChecked = function () {
        return userSrv.isWordChecked($scope.word._id);
    }

    $scope.word = '';
    $scope.searchBoxWord = '';
    $scope.current = {
        word: '',
        meaning: '',
        status: true,
    };


    $scope.toggleStar = function () {
        if (userSrv.isWordChecked($scope.word._id)) {
            userSrv.unCheckWord($scope.word._id).then(function (res) {
                if (res.data.status) {
                    var userJSON = userSrv.getUser();
                    userJSON.words.pop($scope.word._id);
                    userSrv.save(userJSON);
                    star.html('☆');
                } else {
                    console.log(res.data.message);
                }
            }, function (err) {
                console.log(err);
            });

        } else {
            userSrv.checkWord($scope.word._id).then(function (res) {
                if (res.data.status) {
                    var userJSON = userSrv.getUser();
                    userJSON.words.push($scope.word._id);
                    userSrv.save(userJSON);
                    star.html('★');
                } else {
                    console.log(res.data.message);
                }
            }, function (err) {
                console.log(err);
            });
        }
    }

    $scope.searchWord = function () {
        console.log('search word called: ', $scope.searchBoxWord);
        dictSrv.getWord($scope.searchBoxWord).then(function (res) {
            if (res.data.status) {
                $scope.word = res.data.message;
                if (userSrv.isAuthed()) {
                    setIfChecked();
                }
                $scope.current.word = res.data.message.name;
                $scope.current.meaning = res.data.message.meaning;
                $scope.current.status = true;
                console.log(res.data.message);
            } else {
                console.log('word err:', res.data.message);
                $scope.current.status = false;
            }
        }, function (err) {
            console.log(err);
        });
    };
}]);

app.service('dictSrv', ['$http', function ($http) {
    return {
        getWord: function (word) {
            return $http.get('/dict?word=' + word);
        },
    };
}]);
