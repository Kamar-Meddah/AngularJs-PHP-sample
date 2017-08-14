app.factory('commentsFactory', function($http, $q, $routeParams) {
    CommentsFactory = {

        find: (id) => {
            let deferred = $q.defer();
            $http.post('php/index.php', { request: 'Comments.find', id: id }).then((response) => {
                PostsFactory.comments = response.data;
                deferred.resolve(PostsFactory.comments);
            }, () => {
                deferred.reject('Impossible de recuperer les commentaire , recharger la page');
            });
            return deferred.promise;
        },

        commenter: (id, name, comment) => {
            let deferred = $q.defer();
            $http.post('php/index.php', { request: 'Comments.add', postId: id, name: name, comment: comment }).then(() => {
                deferred.resolve('Votre commentaire a été poster');
            }, () => {
                deferred.reject('Votre commentaire n\'a pas été poster pas de cnx internet');
            });
            return deferred.promise;
        },

        delete: (id) => {
            let deferred = $q.defer();
            $http.post('php/index.php', { request: 'Comments.delete', id: id, }).then(() => {
                deferred.resolve('Votre commentaire a été supprimmer');
            }, () => {
                deferred.reject('can not contact the server refresh the page');
            });
            return deferred.promise;
        }

    }

    return CommentsFactory;
});