let app = angular.module('blog-v3', ['ngRoute', 'ngSanitize', 'ez.alert', 'ui.tinymce', 'cp.ngConfirm']);

app.config(($routeProvider) => {
    $routeProvider

        .when('/:page', {
            templateUrl: 'view/posts/postsHome.html',
            controller: 'postsCtrl'
        })
        .when('/category=:categorie :category_id/:page', {
            templateUrl: 'view/posts/postsByCategorie.html',
            controller: 'bycategorieCtrl'
        })
        .when('/category=:categorie/post=:post/:postId', {
            templateUrl: 'view/posts/postsShow.html',
            controller: 'postCtrl'
        })
        .when('/search/:post/:page', {
            templateUrl: 'view/posts/postsSearch.html',
            controller: 'postsSearchCtrl'
        })
        .when('/users/login', {
            templateUrl: 'view/users/login.html',
            controller: 'usersCtrl'
        })
        .when('/admin/home', {
            templateUrl: 'view/admin/adminHome.html',
            controller: 'userCtrl'
        })
        .when('/admin/categories/:page', {
            templateUrl: 'view/admin/categories/adminCategories.html',
            controller: 'categoriesCtrl'
        })
        .when('/admin/categories/edit/:cat/:catid', {
            templateUrl: 'view/admin/categories/categoriesEdit.html',
            controller: 'categoriesEditCtrl'
        })
        .when('/admin/categories/edit/add', {
            templateUrl: 'view/admin/categories/categoriesAdd.html',
            controller: 'categoriesEditCtrl'
        })
        .when('/admin/posts/:page', {
            templateUrl: 'view/admin/posts/adminPosts.html',
            controller: 'adminPostsCtrl'
        })
        .when('/admin/posts/edit/:pos/:posid', {
            templateUrl: 'view/admin/posts/postsEdit.html',
            controller: 'adminPostsEditCtrl'
        })
        .when('/admin/posts/edit/add', {
            templateUrl: 'view/admin/posts/postsAdd.html',
            controller: 'adminPostsEditCtrl'
        })
        .when('/admin/user/edit/password', {
            templateUrl: 'view/admin/user/passwordEdit.html',
            controller: 'userCtrl'
        })
        .when('/admin/user/edit/username', {
            templateUrl: 'view/admin/user/usernameEdit.html',
            controller: 'userCtrl'
        })
        .otherwise({
            redirectTo: '/1',
        });
})