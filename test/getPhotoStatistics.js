const UnsplashApi = require('../index');

let unsplash = new UnsplashApi('<api-key>');

unsplash.getPhotoStatistics('<photo-id>', 'days', 10)
    .then(function (result) {
        console.log(result);
    }).
catch(function (e) {
    console.err(e);
});