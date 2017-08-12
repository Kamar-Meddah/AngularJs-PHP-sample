app.controller('postCtrl', function($scope, $ngConfirm, adminService, adminPostsService, $rootScope, postsService, $routeParams, $http, EzAlert,$filter) {
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

        $http.post('php/index.php', { request: 'post.commenter', postId: $routeParams.postId, name: $scope.name, comment: $scope.comment }).then(() => {
             
            EzAlert.success('Votre commentaire a été poster');
                $scope.comments.push({'name':$scope.name,'content':$scope.comment,'date':$filter('date')(Date.now(), 'yyyy-MM-d H:mm:ss')  });
                $scope.name = '';
                $scope.comment = '';
        }, () => {
            EzAlert.error('Votre commentaire n\'a pas été poster');
        })
    }

    $scope.delete = (id,index) => {
        $ngConfirm({
            title: 'Confirm!',
            content: 'Voulez Vous Supprimer ce commentaire ?',
            scope: $scope,
            buttons: {
                Oui: {
                    text: 'Oui',
                    btnClass: 'btn-red',
                    action: function(scope, button, element) {
                        $http.post('php/index.php', { request: 'post.comment.delete', id: id, }).then((response) => {
                             $scope.comments.splice(index,1);   
                            EzAlert.success('Votre commentaire a été supprimmer');
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