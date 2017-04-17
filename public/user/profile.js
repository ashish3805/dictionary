user.controller('profileCtrl', ['$scope', 'userSrv', '$state',
    function ($scope, userSrv, $state) {

        if (!userSrv.isAuthed()) {
            $state.go('home');
        }

        let self = $scope;
        self.profile = '';

        self.flags = {
            error: '',
            errorStatus: false,
            edit: false,
        };
        self.enableEdit = function () {
            self.flags.edit = true;
        };
        self.cancelEdit = function () {
            self.flags.edit = false;
            self.profile = userSrv.getUser();
        };
        self.saveProfile = function () {
            self.flags.edit = false;
            userSrv.saveProfile(self.profile).then(function (res) {
                console.log('res:', res.data);
                if (res.data.status) {
                    console.log(res.data.message);
                    self.profile = res.data.message;
                    userSrv.save(res.data.message);
                } else {
                    self.flags.errorStatus = false;
                    self.flags.error = res.data.message;
                    self.profile = userSrv.getUser();
                }
            }, function (err) {
                self.flags.errorStatus = false;
                self.flags.error = err;
                self.profile = userSrv.getUser();
            });
        };
        self.profile = userSrv.getUser();
    }]);
