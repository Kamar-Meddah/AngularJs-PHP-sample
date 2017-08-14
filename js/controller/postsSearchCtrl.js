app.controller('postsSearchCtrl', function($scope, $rootScope, $routeParams, categoriesFactory, postsFactory, $rootScope, $location) {
    $rootScope.loading = true;

    $scope.pages = [];
    if ($routeParams.page == 1) {
        $scope.d = true;
    } else {
        $scope.d = false;
    }
    $scope.p = $routeParams.page;

    postsFactory.searc($routeParams.post, $scope.p).then((data) => {
        $scope.posts = data.art;
        $scope.last = data.nbpage;
        for (let i = 1; i <= data.nbpage; i++) {
            $scope.pages[i - 1] = i;
        }
        $rootScope.loading = false;
        $scope.z = $routeParams.post;
        $scope.search = $routeParams.post;
    }, () => {});

    categoriesFactory.allCat().then((data) => {
        $scope.categories = data;
    }, (data) => {});
});