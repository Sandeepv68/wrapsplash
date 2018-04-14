# WrapSplash v1.0.0 
![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg?style=plastic)
![PyPI - Status](https://img.shields.io/pypi/status/Django.svg?style=plastic)

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

### API

#### List Photos
A Promise factory to get a single page from the list of all photos.
```
GET /photos
```
##### Parameters
| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10
| **order_by** | *string* | How to sort the photos.(```Valid values: latest, oldest, popular```) | yes | latest

```js
UnspalshApi.listPhotos(1, 10, 'latest');
```

### Acknowledgements
Thanks, and Kudos to team [Unsplash](https://unsplash.com/) for creating a wonderful platform for sharing 
beautiful high quality free images and photos.

Made with :heart: at [Nylnda](https://www.nylnda.com/) by [Sandeep Vattapparambil](https://github.com/SandeepVattapparambil).