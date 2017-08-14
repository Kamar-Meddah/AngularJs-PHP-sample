app.controller('adminPostsCtrl', function($scope, $rootScope,$ngConfirm, postsFactory, EzAlert, $routeParams) {
    $rootScope.loading = true;

    $scope.pages = [];
    if ($routeParams.page == 1) {
        $scope.d = true;
    } else {
        $scope.d = false;
    }
    $scope.p = $routeParams.page;

    postsFactory.all($scope.p).then((data) => {
        $scope.posts = data.art;
        $scope.last = data.nbpage;
        for (let i = 1; i <= data.nbpage; i++) {
            $scope.pages[i - 1] = i;
        }
        $rootScope.loading = false;
    })

    $scope.delete = (id,index) => {

      $ngConfirm({
            title: 'Confirm!',
            content: 'Voulez Vous Supprimer la categorie ?',
            scope: $scope,
            buttons: {
                Oui: {
                    text: 'Oui',
                    btnClass: 'btn-red',
                    action: function(scope, button){  
                        postsFactory.delete(id).then((data) => {
                          EzAlert.success(data);
                         $scope.posts.splice(index,1);            
                      },(data)=>{
                          EzAlert.error(data);
                      }); 
                    }
                },
                 Non: {
                    text: 'Non',
                    btnClass: 'btn-orange',
                    action: function(scope, button){       
                    }
                }
            }
        });
        }
    

});