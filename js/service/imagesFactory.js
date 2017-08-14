app.factory('imagesFactory', function($http, $q) {
    ImagesFactory={

        find : (id) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'admin.post.images', id: id }).then((response) => {
            ImagesFactory.images = response.data;
            deferred.resolve(ImagesFactory.images);
        }, () => {
            deferred.reject('recharger la page');
        });
        return deferred.promise;
    },
        
        delete : (id) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'admin.post.imagesDel', id: id }).then((response) => {
            deferred.resolve('L`\image a été bien supprimer');
        }, () => {
            deferred.reject('recharger la page');
        });
        return deferred.promise;
    }

    }
    return ImagesFactory;
});