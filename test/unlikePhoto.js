const UnsplashApi = require('../index');

let unsplash = new WrapSplash({
    access_key: '<api-key>',
    secret_key: '<secret-key>',
    redirect_uri: '<callback-url>',
    code: '<authorization-code>',
    bearer_token: '<bearer-token>'
});

unsplash.unlikePhoto('XY7O2gp-m_Q')
    .then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });