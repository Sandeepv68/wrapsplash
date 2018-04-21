const UnsplashApi = require('../index');

let unsplash = new UnsplashApi({
    access_key: '5a419933621f55950741e4c30182c1d5f99974112a96cf0c49d8d9091cc0ba7e',
    secret_key: '0464eb09a8590dfaaf11e562a8c7a361c15d25d7757f26e20e6b86d0fd6b9c5c',
    redirect_uri: 'urn:ietf:wg:oauth:2.0:oob',
    code: '9731c8b7616c5ab68a27419c48acfad01597d8dd99371a02a1c9b45414f43123',
    bearer_token: '7e988f5161bd81e6057ff6b0a07b9fcaea6c4ddf77f3bab51760ffbc2ef9c86d'
});

unsplash.getCuratedCollectionPhotos('166')
    .then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });