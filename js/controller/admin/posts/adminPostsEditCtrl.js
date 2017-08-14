app.controller('adminPostsEditCtrl', function($scope, $ngConfirm,$rootScope, $routeParams,imagesFactory,categoriesFactory, postsFactory, EzAlert, $location, $http) {
    $rootScope.loading = true;
    $rootScope.lo = true;
    $scope.images=[];

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

    categoriesFactory.allCat().then((data) => {
        $scope.categories = data;
    });

    if ($routeParams.posid != undefined) {
        postsFactory.find($routeParams.posid).then((data) => {
            $scope.titre = data.titre;
            $scope.content = data.contenu;
            $scope.category = data.category_id;
            $scope.oop = data.id;
            $rootScope.loading = false;

        })

        imagesFactory.find($routeParams.posid).then((data) => {
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
                        imagesFactory.delete(id).then((data) => {
                          $scope.images.splice(index,1);
                          EzAlert.success(data);
                        },(data)=>{
                            EzAlert.error(data);
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
        let formElement = new FormData(document.querySelector("form"));
        postsFactory.add(formElement).then((data) => {
            EzAlert.success('Votre post a été ajouté');
            $location.path('/admin/posts/edit/' + $scope.titre + '/' + data);
        })
        }else{EzAlert.error('le champs categorie est tjr vide !!');}
     }

    $scope.edit = () => {
        let formElement = new FormData(document.querySelector("form"));
        postsFactory.edit(formElement).then((data) => {
            angular.forEach(data,(value)=>{
              $scope.images.push(value);
            });
            $('#file').val(null);
            EzAlert.success('Votre post a été modifié');
        },(data)=>{
            EzAlert.error(data);
        });
    }
});