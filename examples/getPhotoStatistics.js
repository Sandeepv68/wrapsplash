const UnsplashApi = require('../index');

let unsplash = new UnsplashApi({
    access_key: '<api-key>',
    secret_key: '<secret-key>',
    redirect_uri: '<callback-url>',
    code: '<authorization-code>'
});

unsplash.getPhotoStatistics('<photo-id>', 'days', 10)
    .then(function (result) {
        console.log(result);
    }).catch(function (e) {
       console.log(e);
    });