app.service('userService', function($http, $q) {
    $this = this;

    $this.logged = () => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'Users.logged' }).then((response) => {
            deferred.resolve(response.data);
        }, () => {});
        return deferred.promise;
    }

    $this.checkPass = (id, pass) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'Users.passwordCheck', password: pass, 'id': id }).then((response) => {
            deferred.resolve(response.data);
        }, () => {
            deferred.reject('Impossible de verifié votre infos , merci de rechager la page');
        });
        return deferred.promise;
    }


    $this.connect = (username, passsword) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'Users.login', username: username, password: passsword }).then((response) => {
            deferred.resolve(response.data);
        }, () => {
            deferred.reject('username ou password erroné');
        });
        return deferred.promise;
    }

    $this.logout = () => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'Users.logout' }).then(() => {
            deferred.resolve('vous etes deconnecter');
        }, () => {
            deferred.reject('pas de cnx');
        });
        return deferred.promise;
    }

    $this.usernameChange = (id, username) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'Users.usernameChange', 'id': id, 'username': username }).then(() => {
            deferred.resolve('Votre nom d\'utilisateur a été changé');
        });
        return deferred.promise;
    }

    $this.passChange = (id, pass) => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'Users.passwordChange', 'id': id, 'password': pass }).then(() => {
            deferred.resolve('Votre mot de passe a été changé');
        });
        return deferred.promise;
    }

    $this.getId = () => {
        let deferred = $q.defer();
        $http.post('php/index.php', { request: 'Users.getUserId' }).then((response) => {
            deferred.resolve(response.data);
        });
        return deferred.promise;
    }
});