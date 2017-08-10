app.controller('bycategorieCtrl', function($scope, $rootScope, postsService, $http, $routeParams) {
    $rootScope.loading = true;
    $scope.pages = [];
    if ($routeParams.page == 1) {
        $scope.d = true;
    } else {
        $scope.d = false;
    }
    $scope.p = $routeParams.page;

    postsService.bycategorie($routeParams.category_id, $routeParams.page).then((data) => {
        $rootScope.loading = false;
        $scope.posts = data.art;
        $scope.last = data.nbpage;
        for (let i = 1; i <= data.nbpage; i++) {
            $scope.pages[i - 1] = i;
        }
        $scope.categorie = { title: $routeParams.categorie, id: $routeParams.category_id };
    }, (data) => {

    });

    postsService.allCat().then((data) => {

        $scope.categories = data;
    }, (data) => {

    });
});