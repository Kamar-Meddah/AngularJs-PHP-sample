app.controller('postCtrl', function($scope, adminService, adminPostsService, $rootScope, postsService, $routeParams, $http, EzAlert) {
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
        $scope.load = true;
        if (confirm('Voulez Vous Supprimer l\'categorie ?')) {
            $http.post('php/index.php', { request: 'post.comment.delete', id: id, }).then((response) => {
                postsService.comment($routeParams.postId).then((data) => {
                    $scope.comments = data;
                });
                EzAlert.success('Votre commentaire a été supprimmer');
                $scope.load = false;
            });
        }
    }


});