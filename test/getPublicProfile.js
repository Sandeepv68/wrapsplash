const UnsplashApi = require('../index');

let unsplash = new UnsplashApi('<api-key>');

unsplash.getPublicProfile('username', 700, 700)
    .then(function (result) {
        console.log(result);
    }).
catch(function (e) {
    console.err(e);
});