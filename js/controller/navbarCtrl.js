app.controller('searchFormCtrl', function($scope, $location) {
    $scope.rech = (i) => {
        $location.path('/search/' + i + '/1');
    }

});