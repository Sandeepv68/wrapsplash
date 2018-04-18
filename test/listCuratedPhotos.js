const UnsplashApi = require('../index');

let unsplash = new UnsplashApi('<api-key>');

unsplash.listCuratedPhotos(1, 10, 'latest')
    .then(function (result) {
        console.log(result);
    }).
catch(function (e) {
    console.err(e);
});