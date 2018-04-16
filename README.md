# WrapSplash v1.0.7 
![Packagist](https://img.shields.io/packagist/l/doctrine/orm.svg?style=plastic)
![PyPI - Status](https://img.shields.io/pypi/status/Django.svg?style=plastic)

WrapSplash is a simple API wrapper for the most popular [Unsplash](https://unsplash.com/) platform. 
Unsplash provides beautiful high quality free images and photos that you can download and use for any project  without any attribution.

Before using the Unsplash API, you need to **register as a developer** and **read the API Guidelines.**

> **Note:**  Every application must abide by the [API Guidelines](https://unsplash.com/documentation). Specifically, remember to hotlink images and trigger a download when appropriate.

## Installation

Install the package from NPM
```sh
cd /your app root
npm install --save wrapsplash
```

### Sample usage
```js
//In your NodeJS app

//Require npm module
const WrapSplash = require('wrapsplash');
let UnsplashApi = new WrapSplash('<YOUR UNSPLASH API-KEY>');

//List photos - Get a single page from the list of all photos.
UnsplashApi.listPhotos(1, 10, 'latest')
    .then(function (result) {
        //do something with your data here
        console.log(result);
    }).catch(function (e) {
        console.err(e);
    });
```

### Changelog
#### v1.0.7
 - Added support for new API endpoint
 - - Get a list of photos liked by a user - ```GET /users/:username/likes```.
 - Minor refactorings.


### API Documentation

#### Get User's Public Profile
A Promise factory to retrieve public details on a given user.
```
GET /users/:username
```
##### Parameters
| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **username** | *string* | The username of the particular user | no | 
| **w** | *number* | Width of the profile picture in pixels | yes | 
| **h** | *number* | Height of the profile picture in pixels | yes | 
> **Note:**  When optional **height** & **width** are specified the profile image will be included in the "profile_image" object as "custom".

```js
UnsplashApi.getPublicProfile('<username>', 600, 600);
```

#### Get User's Portfolio Link
A Promise factory to retrieve a single user’s portfolio link.
```
GET /users/:username/portfolio
```
##### Parameters
| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **username** | *string* | The username of the particular user | no | 

```js
UnsplashApi.getUserPortfolio('<username>');
```

#### Get User's Photos
A Promise factory to get a list of photos uploaded by a particular user.
```
GET /users/:username/photos
```
##### Parameters
| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **username** | *string* | The username of the particular user | no | 
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10
| **stats** | *boolean* | Show the stats for each user’s photo | yes | false
| **resolution** | *string* | The frequency of the stats | yes | days
| **quantity** | *number* | The amount of for each stat | yes | 30
| **order_by** | *string* | How to sort the photos.(```Valid values: latest, oldest, popular```) | yes | latest

```js
UnsplashApi.getUserPhotos('<username>', 1, 10, false, 'days', 30, 'latest');
```


#### Get User Liked Photos
A Promise factory to get a list of photos liked by a user.
```
GET /users/:username/likes
```
##### Parameters
| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **username** | *string* | The username of the particular user | no | 
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10
| **order_by** | *string* | How to sort the photos.(```Valid values: latest, oldest, popular```) | yes | latest

```js
UnsplashApi.getUserLikedPhotos('<username>', 1, 10, 'latest');
```

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
UnsplashApi.listPhotos(1, 10, 'latest');
```

#### Search Photos
A Promise factory to get a single page of photo results for a particular query.
```
GET /search/photos
```
##### Parameters
| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **query** | *string* | The search query | no | 
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10
| **collections** | *number* | Collection ID(‘s) to narrow search. If multiple, comma-separated. | yes | 
| **orientation** | *string* | Filter search results by photo orientation. (```Valid values are landscape, portrait, and squarish.```) | yes | landscape

```js
UnsplashApi.search('cars', 1, 10, '', 'landscape');
```


### Acknowledgements
Thanks, and Kudos to team [Unsplash](https://unsplash.com/) for creating a wonderful platform for sharing 
beautiful high quality free images and photos.

Made with :heart: at [Nylnda](https://www.nylnda.com/) by [Sandeep Vattapparambil](https://github.com/SandeepVattapparambil).