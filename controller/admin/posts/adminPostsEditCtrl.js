app.controller('adminPostsEditCtrl', function($scope, $ngConfirm,$rootScope, $routeParams, $http, adminPostsService, adminService, EzAlert, $location, $http) {
    $rootScope.loading = true;
    $rootScope.lo = true;
    $scope.images=[];
    adminService.logged().then((data) => {
        if (data === 'false') {
            document.write('<h1 align="center">Error 403 accés interdit</h1>');
            $rootScope.dat = false;
            throw ('acces interdit');
        } else {
            $rootScope.dat = true;
        }
    });

    $scope.tinymceOptions = {
        onChange: function(e) {
            // put logic here for keypress and cut/paste changes
        },
        height: 300,
        inline: false,
        plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code insertdatetime media table contextmenu paste code ',
        skin: 'lightgray',
        theme: 'modern'
    };

    adminPostsService.allCat().then((data) => {
        $scope.categories = data;
    });

    if ($routeParams.posid != undefined) {
        adminPostsService.find($routeParams.posid).then((data) => {
            $scope.titre = data.titre;
            $scope.content = data.contenu;
            $scope.category = data.category_id;
            $scope.oop = data.id;
            $rootScope.loading = false;

        })

        adminPostsService.Images($routeParams.posid).then((data) => {
            $scope.images = data;
            $rootScope.lo = false;
        });
    } else {
        $rootScope.loading = false;
    }

    $scope.deleteImg = (id,index) => {

        $ngConfirm({
            title: 'Confirm!',
            content: 'Voulez Vous Supprimer cette image ?',
            scope: $scope,
            buttons: {
                Oui: {
                    text: 'Oui',
                    btnClass: 'btn-red',
                    action: function(scope, button) {
                          $http.post('php/index.php', { request: 'admin.post.imagesDel', id: id }).then((response) => {
                          $scope.images.splice(index,1);
                          EzAlert.success('L`\image a été bien supprimer');
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

    $scope.add = () => {
      if($scope.category !== undefined){
        let formElement = document.querySelector("form");
        $http.post('php/index.php', new FormData(formElement), {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Process-Data': false }
        }).then(response => {
            EzAlert.success('Votre post a été ajouté');
            $location.path('/admin/posts/edit/' + $scope.titre + '/' + response.data.id);
        })
        }else{EzAlert.error('le champs categorie est tjr vide !!');}
     }

    $scope.edit = () => {
        let formElement = document.querySelector("form");
        $http.post('php/index.php', new FormData(formElement), {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Process-Data': false }
        }).then(response => {
            angular.forEach(response.data,(value)=>{
              $scope.images.push(value);
            })
            
        $('#file').val(null);
            EzAlert.success('Votre post a été modifié');
        })
    }
});