const UnsplashApi = require('../index');

let unsplash = new UnsplashApi('<api-key>');

unsplash.getPhotoLink('<photo-id>')
    .then(function (result) {
        console.log(result);
    }).
catch(function (e) {
    console.err(e);
});