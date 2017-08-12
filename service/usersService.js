app.service('usersService', function($http, $q) {
    $this = this;
    $this.connect = (username, passsword) => {
        let deferred = $q.defer();

        $http.post('php/index.php', { request: 'users.connect', username: username, password: passsword }).then((response) => {

            deferred.resolve(response.data);
        }, () => {
            deferred.reject('username ou password erroné');
        });


        return deferred.promise;
    }

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