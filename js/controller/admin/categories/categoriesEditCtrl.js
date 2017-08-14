app.controller('categoriesEditCtrl', function($scope, $routeParams,categoriesFactory, EzAlert, $location) {

    $scope.insert = () => {
        categoriesFactory.insert($scope.ins).then((data) => {
            EzAlert.success(data);
            $scope.ins = '';
            $location.path('/admin/categories/1');
        },(data)=>{
            EzAlert.error(data);
        });
    }
    $scope.ed = $routeParams.cat;

    $scope.edit = () => {
        categoriesFactory.edit($scope.ed,$routeParams.catid).then((data) => {
            EzAlert.success(data);
            $location.path('/admin/categories/1');
        },(data)=>{
            EzAlert.error(data);
        });
    }

});