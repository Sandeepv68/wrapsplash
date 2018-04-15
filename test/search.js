const UnsplashApi = require('../index');

let unsplash = new UnsplashApi('<api-key>');

unsplash.search('cars', 1, 10,'' ,'landscape')
    .then(function (result) {
        console.log(result);
    }).
catch(function (e) {
    console.err(e);
});