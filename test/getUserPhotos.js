const UnsplashApi = require('../index');

let unsplash = new UnsplashApi('<api-key>');

unsplash.getUserPhotos('<username>', 1, 10, false, 'days', 30, 'latest')
    .then(function (result) {
        console.log(result);
    }).
catch(function (e) {
    console.err(e);
});