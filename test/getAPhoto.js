const UnsplashApi = require('../index');

let unsplash = new UnsplashApi('<api-key>');

unsplash.getAPhoto('rndjGfyInvs', 500, 500, '300, 300, 300, 300')
    .then(function (result) {
        console.log(result);
    }).
catch(function (e) {
    console.err(e);
});