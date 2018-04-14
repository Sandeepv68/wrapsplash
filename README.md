# wrapsplash v1.0.0
WrapSplash is a simple API wrapper for the most popular [Unsplash](https://unsplash.com/) platform. 
Unsplash provides beautiful high quality free images and photos that you can download and use for any project.  Without any attribution.

## Installation

Install the package from NPM
```sh
cd /your app root
npm install --save wrapsplash
```

## Usage
```js
//In your NodeJS app

//Require npm module
const Unsplash = require('wrapsplash');
let UnspalshApi = new UnsplashApi('<YOUR API-KEY>');

//List photos - Get a single page from the list of all photos.
UnspalshApi.listPhotos(1, 10, 'latest')
    .then(function (result) {
        console.log(result);
    }).
catch(function (e) {
    console.err(e);
});
```