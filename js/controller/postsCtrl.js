app.controller('postsCtrl', function($scope, $rootScope, postsService, $http, $routeParams) {
    $rootScope.loading = true;

    $scope.pages = [];
    if ($routeParams.page == 1) {
        $scope.d = true;
    } else {
        $scope.d = false;
    }
    $scope.p = $routeParams.page;

    postsService.all($scope.p).then((data) => {
        $scope.posts = data.art;
        $scope.last = data.nbpage;
        for (let i = 1; i <= data.nbpage; i++) {
            $scope.pages[i - 1] = i;
        }
        $rootScope.loading = false;
    }, (data) => {});
    try {
        postsService.allCat().then((data) => {
            $scope.categories = data;
        }, (data) => {});
    } catch (e) {

    }

});