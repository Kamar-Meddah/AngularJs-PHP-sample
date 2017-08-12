    app.filter('contenu', function() {
        return function(input) {
            return input.contenu + " ...<br>" + '<a href="#!/category=' + input.categorie + '/post=' + input.titre + '/' + input.id + '">Voir la suite</a>';
        }
    })