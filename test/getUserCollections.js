const UnsplashApi = require('../index');

let unsplash = new UnsplashApi('<api-key>');

unsplash.getUserCollections('<username>', 1, 10)
    .then(function (result) {
        console.log(result);
    }).
catch(function (e) {
    console.err(e);
});