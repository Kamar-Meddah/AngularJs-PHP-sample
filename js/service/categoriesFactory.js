app.factory('categoriesFactory', function($http, $q, $routeParams) {
    categorie = {

        categories: undefined,
        // recupérer tt les categories

        allCat: () => {
            let deferred = $q.defer();
            if (categorie.categories != undefined) {
                deferred.resolve(categorie.categories);
            } else {
                $http.post('php/index.php', { request: 'Categories.all' }).then((response) => {
                    categorie.categories = response.data;
                    deferred.resolve(categorie.categories);
                }, () => {
                    deferred.reject('recharger la page');
                });
            }
            return deferred.promise;
        },
        //----------
        allCatP: (page) => {
            let deferred = $q.defer();

            $http.post('php/index.php', { request: 'Categories.index', page: page }).then((response) => {
                categorie.categories = response.data;
                deferred.resolve(categorie.categories);
            }, () => {
                deferred.reject('recharger la page');

            });

            return deferred.promise;
        },

        delete: (id) => {
            let deferred = $q.defer();
            $http.post('php/index.php', { request: 'Categories.delete', id: id }).then((response) => {
                deferred.resolve(response.data.num );
            },()=>{
                deferred.reject('recharger la page');
            });
            return deferred.promise;
        },

        insert: (titre) => {
            let deferred = $q.defer();
            $http.post('php/index.php', { request: 'Categories.add', title: titre }).then(() => {
                deferred.resolve('Votre categorie a été ajouter');
            },()=>{
                deferred.reject('recharger la page pas de cnx')
            });
            return deferred.promise;
        },

        edit: (titre,id) => {
            let deferred = $q.defer();
            $http.post('php/index.php', { request: 'Categories.edit', title: titre, id:id}).then(() => {
                deferred.resolve('Votre categorie a été modifié');
            },()=>{
                deferred.reject('recharger la page pas de cnx')
            });
            return deferred.promise;
        }
 

    }
    return categorie;
});