app.service('adminService', function($http, $q, EzAlert) {
    $this = this;
    $this.logged = () => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'users.logged' }).then((response) => {
            deferred.resolve(response.data);
        }, () => {
            deferred.reject('username ou password erroné');
        });
        return deferred.promise;
    }



});