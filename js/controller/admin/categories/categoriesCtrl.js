app.controller('categoriesCtrl', function($ngConfirm,$scope, $rootScope, categoriesService, EzAlert, $http, adminService, $routeParams) {
    $rootScope.loading = true;
    adminService.logged().then((data) => {
        if (data === 'false') {
            document.write('<h1 align="center">Error 403 accés interdit</h1>');
            $rootScope.dat = false;
            throw ('acces interdit');
        } else {
            $rootScope.dat = true;
        }
    });


    $scope.pages = [];
    if ($routeParams.page == 1) {
        $scope.d = true;
    } else {
        $scope.d = false;
    }
    $scope.p = $routeParams.page;


    categoriesService.allCat($scope.p).then((data) => {
        $scope.categories = data.art;
        $scope.last = data.nbpage;
        for (let i = 1; i <= data.nbpage; i++) {
            $scope.pages[i - 1] = i;
        }
        $rootScope.loading = false;

    })

    $scope.delete = (id) => {
 
        $ngConfirm({
            title: 'Confirm!',
            content: 'Voulez Vous Supprimer la categorie ?',
            scope: $scope,
            buttons: {
                Oui: {
                    text: 'Oui',
                    btnClass: 'btn-red',
                    action: function(scope, button){  
                        $rootScope.loading = true; 
                    $http.post('php/index.php', { request: 'admin.categories.delete', id: id }).then((response) => {
                        if (response.data.num !=='0'){
                            $rootScope.loading = false;
                           EzAlert.error('Impossible d\'effectué la suppression ! La categorie n\'est pas vide');
                        }else{

                    EzAlert.success('Votre categorie a été bien supprimer');
                    categoriesService.allCat($routeParams.page).then((data) => {
                    $scope.categories = data.art;
                    $rootScope.loading = false;
                 })}
            });
                    }
                },
                 Non: {
                    text: 'Non',
                    btnClass: 'btn-orange',
                    action: function(scope, button){       
                    }
                }
            }
        });
    }
});