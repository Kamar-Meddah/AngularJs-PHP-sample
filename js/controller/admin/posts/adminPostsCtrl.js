app.controller('adminPostsCtrl', function($scope, $rootScope,$ngConfirm, adminPostsService, EzAlert, $http, adminService, $routeParams) {
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


    adminPostsService.all($scope.p).then((data) => {
        $scope.posts = data.art;
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
                                    $http.post('php/index.php', { request: 'admin.posts.delete', id: id }).then((response) => {
                EzAlert.success('Votre post a été bien supprimer');
                adminPostsService.all($routeParams.page).then((data) => {
                   $scope.posts = data.art;
                   $rootScope.loading = false;
                })
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