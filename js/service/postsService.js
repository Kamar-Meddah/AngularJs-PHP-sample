app.service('postsService', function($http, $q, $routeParams) {
    $this = this;
    $this.posts = false;
    $this.categories = false;
    $this.post = false;

    $this.all = (page) => {
        let deferred = $q.defer();

        $http.post('php/index.php', { request: 'posts.home', page: page }).then((response) => {
            $this.posts = response.data;
            deferred.resolve($this.posts);
        }, () => {
            deferred.reject('Impossible de recuperer les articles , recharger la page');
        });
        return deferred.promise;
    };

    $this.allCat = () => {
        let deferred = $q.defer();

        $http.post('php/index.php', { request: 'categories' }).then((response) => {
            $this.categories = response.data;
            deferred.resolve($this.categories);
        }, () => {
            deferred.reject('recharger la page');

        });

        return deferred.promise;
    }
    $this.getpost = (id) => {
        let deferred = $q.defer();

        $http.post('php/index.php', { request: 'posts.show', id: id }).then((response) => {
            $this.post = response.data;
            deferred.resolve($this.post);
        }, () => {
            deferred.reject('recharger la page');

        });

        return deferred.promise;
    }

    $this.bycategorie = (id, page) => {
        let deferred = $q.defer();

        $http.post('php/index.php', { request: 'posts.categories', category_id: id, page: page }).then((response) => {

            $this.Cposts = response.data;
            deferred.resolve($this.Cposts);
        }, () => {
            deferred.reject('Impossible de recuperer les articles , recharger la page');
        });


        return deferred.promise;
    }
    $this.searc = (req, page) => {
        let deferred = $q.defer();

        $http.post('php/index.php', { request: 'posts.search', search: req, page: page }).then((response) => {

            $this.S = response.data;
            deferred.resolve($this.S);
        }, () => {
            deferred.reject('Impossible de recuperer les articles , recharger la page');
        });


        return deferred.promise;
    }

    $this.comment = (id) => {
        let deferred = $q.defer();

        $http.post('php/index.php', { request: 'posts.comments', id: id }).then((response) => {

            $this.comments = response.data;
            deferred.resolve($this.comments);
        }, () => {
            deferred.reject('Impossible de recuperer les commentaire , recharger la page');
        });


        return deferred.promise;
    }



});