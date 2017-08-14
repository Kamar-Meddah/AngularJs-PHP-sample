app.controller('postCtrl', function($scope, $ngConfirm, commentsFactory, categoriesFactory, userService, imagesFactory, $rootScope, postsFactory, $routeParams, EzAlert, $filter) {
    $rootScope.loading = true;
    $scope.load = true;

    userService.logged().then((data) => {
        if (data === 'false') {
            $rootScope.dat = false;
        } else {
            $rootScope.dat = true;
        }
    });

    postsFactory.find($routeParams.postId, $routeParams.post).then((data) => {
        $rootScope.loading = false;
        $scope.post = data;
    });

    imagesFactory.find($routeParams.postId).then((data) => {
        $scope.images = data;
    })

    categoriesFactory.allCat().then((data) => {
        $scope.categories = data;
    }, (data) => {});

    commentsFactory.find($routeParams.postId).then((data) => {
        $scope.comments = data;
        $scope.select = "-date";
        $scope.load = false;
    });

    $scope.commenter = () => {
        commentsFactory.commenter($routeParams.postId, $scope.name, $scope.comment).then((data) => {
            EzAlert.success(data);
            $scope.comments.push({ 'name': $scope.name, 'content': $scope.comment, 'date': $filter('date')(Date.now(), 'yyyy-MM-d H:mm:ss') });
            $scope.name = '';
            $scope.comment = '';
        }, (data) => {
            EzAlert.error(data);
        });
    }

    $scope.delete = (id, index) => {
        $ngConfirm({
            title: 'Confirm!',
            content: 'Voulez Vous Supprimer ce commentaire ?',
            scope: $scope,
            buttons: {
                Oui: {
                    text: 'Oui',
                    btnClass: 'btn-red',
                    action: function(scope, button) {
                        commentsFactory.delete(id).then((data) => {
                            $scope.comments.splice(index, 1);
                            EzAlert.success(data);
                        }, (data) => {
                            EzAlert.error(data);
                        });
                    }
                },
                Non: {
                    text: 'Non',
                    btnClass: 'btn-orange',
                    action: function() {}
                }
            }
        });
    }
});