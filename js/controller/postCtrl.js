app.controller('postCtrl', function($scope, $ngConfirm, adminService, adminPostsService, $rootScope, postsService, $routeParams, $http, EzAlert) {
    $rootScope.loading = true;
    $scope.load = true;
    $scope.lo = true;

    adminService.logged().then((data) => {
        if (data === 'false') {
            $rootScope.dat = false;
        } else {
            $rootScope.dat = true;
        }
    });

    postsService.getpost($routeParams.postId, $routeParams.post).then((data) => {
        $rootScope.loading = false;
        $scope.post = data;

    });

    adminPostsService.Images($routeParams.postId).then((data) => {
        $scope.images = data;
        $rootScope.lo = false;
    })

    postsService.allCat().then((data) => {
        $scope.categories = data;
    }, (data) => {});

    postsService.comment($routeParams.postId).then((data) => {
        $scope.comments = data;
        $scope.select = "-date";
        $scope.load = false;
    });

    $scope.commenter = () => {
        $scope.load = true;
        $http.post('php/index.php', { request: 'post.commenter', postId: $routeParams.postId, name: $scope.name, comment: $scope.comment }).then(() => {
            postsService.comment($routeParams.postId).then((data) => {
                EzAlert.success('Votre commentaire a été poster');
                $scope.comments = data;

            });
            $scope.name = '';
            $scope.comment = '';
            $scope.load = false;

        }, () => {
            EzAlert.error('Votre commentaire n\'a pas été poster');
        })
    }

    $scope.delete = (id) => {
        $ngConfirm({
            title: 'Confirm!',
            content: 'Voulez Vous Supprimer la categorie ?',
            scope: $scope,
            buttons: {
                Oui: {
                    text: 'Oui',
                    btnClass: 'btn-red',
                    action: function(scope, button) {
                        $scope.load = true;
                        $http.post('php/index.php', { request: 'post.comment.delete', id: id, }).then((response) => {
                            postsService.comment($routeParams.postId).then((data) => {
                                $scope.comments = data;
                            });
                            EzAlert.success('Votre commentaire a été supprimmer');
                            $scope.load = false;
                        });

                    }
                },
                Non: {
                    text: 'Non',
                    btnClass: 'btn-orange',
                    action: function(scope, button) {}
                }
            }
        });




    }


});