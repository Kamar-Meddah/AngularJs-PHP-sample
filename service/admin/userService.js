app.service('userService', function($http, $q, EzAlert) {
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

    $this.checkPass = (id, pass) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'users.password.check', password: pass, 'id': id }).then((response) => {
            deferred.resolve(response.data);
        }, () => {
            deferred.reject('Impossible de verifié votre infos , merci de rechager la page');
        });
        return deferred.promise;
    }
});