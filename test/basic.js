const UnsplashApi = require('../index');

let unsplash = new UnsplashApi('5a419933621f55950741e4c30182c1d5f99974112a96cf0c49d8d9091cc0ba7e');

unsplash.listPhotos(1, 10)
    .then(function (result) {
        console.log(result);
    }).
catch(function (e) {
    console.err(e);
});