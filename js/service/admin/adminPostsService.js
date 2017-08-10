app.service('adminPostsService', function($http, $q, EzAlert) {
    $this = this;
    $this.all = (page) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'admin.posts', page: page }).then((response) => {
            $this.posts = response.data;
            deferred.resolve($this.posts);
        }, () => {
            deferred.reject('recharger la page');

        });

        return deferred.promise;
    }

    $this.find = (id) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'admin.post', id: id }).then((response) => {
            $this.po = response.data;
            deferred.resolve($this.po);
        }, () => {
            deferred.reject('recharger la page');

        });

        return deferred.promise;
    }

    $this.allCat = () => {
        let deferred = $q.defer();

        $http.post('php/index.php', { request: 'categories' }).then((response) => {
            $this.cate = response.data;
            deferred.resolve($this.cate);
        }, () => {
            deferred.reject('recharger la page');

        });

        return deferred.promise;
    }

    $this.Images = (id) => {
        let deferred = $q.defer();

        $http.post('php/index.php', { request: 'admin.post.images', id: id }).then((response) => {
            $this.c = response.data;
            deferred.resolve($this.c);
        }, () => {
            deferred.reject('recharger la page');

        });

        return deferred.promise;
    }
});