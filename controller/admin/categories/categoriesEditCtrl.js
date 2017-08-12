app.controller('categoriesEditCtrl', function($scope, $rootScope, $routeParams, $http, categoriesService, adminService, EzAlert, $location, $http) {

    adminService.logged().then((data) => {
        if (data === 'false') {
            document.write('<h1 align="center">Error 403 accés interdit</h1>');
            $rootScope.dat = false;
            throw ('acces interdit');
        } else {
            $rootScope.dat = true;
        }
    });

    $scope.insert = () => {
        $http.post('php/index.php', { request: 'admin.categories.insert', title: $scope.ins }).then((response) => {
            EzAlert.success('Votre categorie a été ajouter');
            $scope.ins = '';
            $location.path('/admin/categories/1');
        });
    }
    $scope.ed = $routeParams.cat;

    $scope.edit = () => {

        $http.post('php/index.php', { request: 'admin.categories.edit', title: $scope.ed, id: $routeParams.catid }).then((response) => {
            EzAlert.success('Votre categorie a été modifié');
            $location.path('/admin/categories/1');
        });
    }

});