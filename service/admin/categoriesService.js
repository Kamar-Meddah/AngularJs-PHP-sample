app.service('categoriesService', function($http, $q, EzAlert) {
    $this = this;
    $this.allCat = (page) => {
        let deferred = $q.defer();

        $http.post('php/index.php', { request: 'admin.categories', page: page }).then((response) => {
            $this.categories = response.data;
            deferred.resolve($this.categories);
        }, () => {
            deferred.reject('recharger la page');

        });

        return deferred.promise;
    }

});