const UnsplashApi = require('../index');

let unsplash = new UnsplashApi('<api-key>');

unsplash.getUserStatistics('<username>', 'days', 30)
    .then(function (result) {
        console.log(result);
    }).
catch(function (e) {
    console.err(e);
});