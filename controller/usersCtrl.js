app.controller('usersCtrl', function($scope, $rootScope, usersService, $http, EzAlert, $location) {

    usersService.logged().then((data) => {
        if (data === 'true') {
            $rootScope.dat = true;
            EzAlert.warning('Vous etes déja connecter');
            $location.path('/admin/home');
        } else {
            $rootScope.dat = false;
        }
    });
    $scope.connecter = () => {
        usersService.connect($scope.username, $scope.password).then((data) => {
            if (data === 'true') {
                EzAlert.success('Bienvenu a votre administration');
                $location.path('/admin/home');
            } else {
                EzAlert.error('username ou mot de passe erroné');
            }
        })
    }
});