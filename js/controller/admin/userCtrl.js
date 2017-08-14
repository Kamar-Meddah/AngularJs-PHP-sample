app.controller('userCtrl', function($scope, $rootScope, userService, EzAlert, $location) {
    userService.logged().then((data) => {
        if (data === 'false') {
            document.write('<h1 align="center">Error 403 accés interdit</h1>');
            $rootScope.dat = false;
            throw ('acces interdit');

        } else {
            $rootScope.dat = true;
            userService.getId().then((data) => {
                $scope.id = data.id;

            });
        }
    });

    $rootScope.decon = () => {
        userService.logout().then((data) => {
            EzAlert.success(data);
            $location.path('/');
        }, (data) => {
            EzAlert.error(data);
        });
    }

    $scope.usernameChange = () => {
        userService.checkPass($scope.id, $scope.password).then((data) => {
            if (data !== 'false') {
                userService.usernameChange($scope.id, $scope.username).then((data) => {
                    EzAlert.success(data);
                    $scope.password = '';
                    $scope.username = '';
                });
            } else {
                EzAlert.error('Mot de passe incorrect');
            }
        }, (data) => {
            EzAlert.error(data);
        })
    }

    $scope.passChange = () => {
        userService.checkPass($scope.id, $scope.password).then((data) => {
            if (data !== 'false') {
                userService.passChange($scope.id, $scope.new_pass).then((data) => {
                    EzAlert.success(data);
                    $scope.password = '';
                    $scope.new_pass = '';
                });
            } else {
                EzAlert.error('Mot de passe incorrect');
            }
        }, (data) => {
            EzAlert.error(data);
        })
    }

});