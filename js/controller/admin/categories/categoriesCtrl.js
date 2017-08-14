app.controller('categoriesCtrl', function($ngConfirm, $scope, $rootScope, categoriesFactory, EzAlert,$routeParams) {
    $rootScope.loading = true;

    $scope.pages = [];
    if ($routeParams.page == 1) {
        $scope.d = true;
    } else {
        $scope.d = false;
    }
    $scope.p = $routeParams.page;


    categoriesFactory.allCatP($scope.p).then((data) => {
        $scope.categories = data.art;
        $scope.last = data.nbpage;
        for (let i = 1; i <= data.nbpage; i++) {
            $scope.pages[i - 1] = i;
        }
        $rootScope.loading = false;

    })

    $scope.delete = (id, index) => {

        $ngConfirm({
            title: 'Confirm!',
            content: 'Voulez Vous Supprimer la categorie ?',
            scope: $scope,
            buttons: {
                Oui: {
                    text: 'Oui',
                    btnClass: 'btn-red',
                    action: function(scope, button) {
                        categoriesFactory.delete(id).then((data) => {
                            if (data!== '0') {
                                EzAlert.error('Impossible d\'effectué la suppression ! La categorie n\'est pas vide');
                            } else {
                                EzAlert.success('Votre categorie a été bien supprimer');
                                $scope.categories.splice(index, 1);
                            }
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