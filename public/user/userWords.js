user.controller('userWordsCtrl', ['$scope', 'userSrv',
    function ($scope, userSrv) {
        $scope.words = [];
        let wordIds = userSrv.getWordList();
        console.log($scope.words);

        let i;
        for (i = 0; i < wordIds.length; i++) {
            userSrv.getWordById(wordIds[i]).then(function (res) {
                if (res.data.status) {
                    $scope.words.push(res.data.message);
                } else {
                    console.log(err);
                }
            }, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        };

        $scope.removeWord = function (word) {
            console.log("in rm");
            userSrv.unCheckWord(word._id).then(function (res) {
                if (res.data.status) {
                    var index = $scope.words.indexOf(word);
                    $scope.words.splice(index, 1);
                    var userJSON = userSrv.getUser();
                    index = userJSON.words.indexOf(word._id);
                    console.log(index);
                    console.log("before:", userJSON.words)
                    console.log("delete:", word._id);
                    userJSON.words.splice(index, 1);
                    console.log("after:", userJSON.words)
                    userSrv.save(userJSON);
                } else {
                    console.log(res.data.message);
                }

            }, function (err) {
                console.log(err);
            });
        }
    }]);
