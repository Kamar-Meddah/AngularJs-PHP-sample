app.controller('userCtrl', function($scope, $rootScope, userService, EzAlert, $location, $http) {
    userService.logged().then((data) => {
        if (data === 'false') {
            document.write('<h1 align="center">Error 403 accés interdit</h1>');
            $rootScope.dat = false;
            throw ('acces interdit');
        } else {
            $rootScope.dat = true;
            $http.post('php/index.php', { request: 'users.getId' }).then((response) => {
                $scope.id = response.data.id;

            });
        }
    });

    $rootScope.decon = () => {
        $http.post('php/index.php', { request: 'users.logout' }).then(() => {
            EzAlert.success('vous etes deconnecter');
            $location.path('/');
        });
    }

    $scope.usernameChange = () => {
        userService.checkPass($scope.id, $scope.password).then((data) => {
            if (data !== 'false') {
                $http.post('php/index.php', { request: 'users.username.change', 'id': $scope.id, 'username': $scope.username }).then(() => {
                    EzAlert.success('Votre nom d\'utilisateur a été changé');
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
                $http.post('php/index.php', { request: 'users.pass.change', 'id': $scope.id, 'password': $scope.new_pass }).then(() => {
                    EzAlert.success('Votre mot de passe a été changé');
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