app.factory('postsFactory', function($http, $q) {
    PostsFactory={
    posts : false,
    categories :false,
    post : false,

    all : (page) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'posts.home', page: page }).then((response) => {
            PostsFactory.posts = response.data;
            deferred.resolve(PostsFactory.posts);
        }, () => {
            deferred.reject('Impossible de recuperer les articles , recharger la page');
        });
        return deferred.promise;
    },

    find : (id) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'posts.show', id: id }).then((response) => {
            PostsFactory.post = response.data;
            deferred.resolve(PostsFactory.post);
        }, () => {
            deferred.reject('recharger la page');
        });
        return deferred.promise;
    },

    bycategorie : (id, page) => {
        let deferred = $q.defer();

        $http.post('php/index.php', { request: 'posts.categories', category_id: id, page: page }).then((response) => {

            PostsFactory.Cposts = response.data;
            deferred.resolve(PostsFactory.Cposts);
        }, () => {
            deferred.reject('Impossible de recuperer les articles , recharger la page');
        });
        return deferred.promise;
    },

    searc : (req, page) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'posts.search', search: req, page: page }).then((response) => {
            PostsFactory.S = response.data;
            deferred.resolve(PostsFactory.S);
        }, () => {
            deferred.reject('Impossible de recuperer les articles , recharger la page');
        });
        return deferred.promise;
    },

    delete :(id)=>{
        let deferred = $q.defer();
             $http.post('php/index.php', { request: 'admin.posts.delete', id: id }).then(() => {
             deferred.resolve('Votre post a été bien supprimer');       
            },()=>{
                deferred.reject('Impossible de suppr l\'articles , recharger la page');
            }); 
             return deferred.promise;
    },

    add:(formData)=>{
        let deferred = $q.defer();
        $http.post('php/index.php', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Process-Data': false }}).then((response) => {
            deferred.resolve(response.data.id);
        },()=>{
            deferred.reject('Impossible de d`\'ajouter l\'articles , recharger la page');
        });
        return deferred.promise;
    },

        edit:(formData)=>{
        let deferred = $q.defer();
        $http.post('php/index.php', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined, 'Process-Data': false }}).then((response) => {
            deferred.resolve(response.data);
        },()=>{
            deferred.reject('Impossible de d`\'editer l\'articles , recharger la page');
        });
        return deferred.promise;
    }


    
}
return PostsFactory;

});