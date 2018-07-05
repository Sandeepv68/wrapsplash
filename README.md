![wrapsplash-logo](https://raw.githubusercontent.com/SandeepVattapparambil/wrapsplash/master/logo.png)
# WrapSplashJS v3.0.4

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f5061e7366044dd3a250baba5a2e9f6b)](https://app.codacy.com/app/sandeepv68/wrapsplash?utm_source=github.com&utm_medium=referral&utm_content=SandeepVattapparambil/wrapsplash&utm_campaign=badger)
![license](https://img.shields.io/github/license/SandeepVattapparambil/wrapsplash.svg) ![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg) ![Dependecies](https://david-dm.org/SandeepVattapparambil/wrapsplash.svg) ![Status](https://img.shields.io/badge/status-stable-green.svg) ![npm version](https://badge.fury.io/js/wrapsplash.svg) [![Greenkeeper badge](https://badges.greenkeeper.io/SandeepVattapparambil/wrapsplash.svg)](https://greenkeeper.io/) ![Travis](https://travis-ci.org/SandeepVattapparambil/wrapsplash.svg?branch=master) ![GitHub issues](https://img.shields.io/github/issues/SandeepVattapparambil/wrapsplash.svg) ![GitHub forks](https://img.shields.io/github/forks/SandeepVattapparambil/wrapsplash.svg) ![GitHub stars](https://img.shields.io/github/stars/SandeepVattapparambil/wrapsplash.svg) ![Twitter](https://img.shields.io/twitter/url/https/github.com/SandeepVattapparambil/wrapsplash.svg?style=social)


WrapSplashJS is a simple, promise-based API wrapper for the popular [Unsplash](https://unsplash.com/) platform. 
Unsplash provides beautiful high quality free images and photos that you can download and use for any project  without any attribution.

Before using the Unsplash API, you need to **register as a developer** and **read the API Guidelines.**

> **Note:**  Every application must abide by the [API Guidelines](https://unsplash.com/documentation). Specifically, remember to hotlink images and trigger a download when appropriate.

## Table of Contents
<!--ts-->
* [About](#wrapsplashjs-v304)
* [Installation](#installation)
* [Sample Usage](#sample-usage)
* [Dependency](#dependency)
* [Changelog](#changelog)
    * [v3.0.4](#v304)
    * [v3.0.3](#v303)
    * [v3.0.2](#v302)
    * [v3.0.1](#v301)
    * [v3.0.0](#v300)
    * [v2.0.1](#v201)
    * [v2.0.0](#v200)
    * [v1.1.0](#v110)
    * [v1.0.10](#v1010)
    * [v1.0.9](#v109)
    * [v1.0.8](#v108)
    * [v1.0.7](#v107)
* [API Documentation](#api-documentation)
    * [Schema](#schema)
        * [Location](#location)
        * [Summary Objects](#summary-objects)
        * [Error Messages](#error-messages)
    * [Authorization](#authorization)
        * [Public Actions](#public-actions)
        * [User Authentication](#user-authentication)
        * [Generate Bearer Token](#generate-bearer-token)
    * [Users APIs](#users-apis)
        * [Get User's Public Profile](#get-users-public-profile)
        * [Get User's Portfolio Link](#get-users-portfolio-link)
        * [Get User's Photos](#get-users-photos)
        * [Get User Liked Photos](#get-user-liked-photos)
        * [Get User's Collections](#get-users-collections)
        * [Get User's Statistics](#get-users-statistics)
    * [Photos APIs](#photos-apis)
        * [List Photos](#list-photos)
        * [List Curated Photos](#list-curated-photos)
        * [Get a Photo by Id](#get-a-photo-by-id)
        * [Get a Random Photo](#get-a-random-photo)
        * [Get a Photo's Statistics](#get-a-photos-statistics)
        * [Get a Photo's Download Link](#get-a-photos-download-link)
        * [Update a Photo](#update-a-photo)
        * [Like a Photo](#like-a-photo)
        * [Unlike a Photo](#unlike-a-photo)
    * [Search APIs](#search-apis)
        * [Search Photos](#search-photos)
        * [Search Collections](#search-collections)
        * [Search Users](#search-users)
    * [Current User APIs](#current-user-apis)
        * [Get the user’s profile](#get-users-profile)
        * [Update User’s Profile](#update-users-profile)
    * [Stats APIs](#stats-apis)
        * [Totals](#stats-totals)
        * [Months](#stats-month)
    * [Collections APIs](#collections-apis)
        * [Link Relations](#link-relations)
        * [List Collections](#list-collections)
        * [List Featured Collections](#list-featured-collections)
        * [List Curated Collections](#list-curated-collections)
        * [Get a Collection](#get-a-collection)
        * [Get a Curated Collection](#get-a-curated-collection)
        * [Get a Collection's Photos](#get-a-collections-photos)
        * [Get a Curated Collection's Photos](#get-a-curated-collections-photos)
        * [List a Collection’s Related Collections](#list-a-collections-related-collections)
        * [Create a New Collection](#create-a-new-collection)
        * [Update an Existing Ccollection](#update-an-existing-ccollection)
        * [Delete a Collection](#delete-a-collection)
        * [Add a Photo to a Collection](#add-a-photo-to-a-collection)
        * [Remove a Photo from a Collection](#remove-a-photo-from-a-collection)
* [Continuous Integration (CI)](#continuous-integration-ci)
* [Tests](#tests)
* [License](#license)
* [Acknowledgements](#acknowledgements)


<!--te-->
## Installation

Install the package from NPM
```sh
npm install --save wrapsplash
```

### Sample usage
```js
//In your NodeJS app

//Require npm module
const WrapSplash = require('wrapsplash');

//OR using ES6/7 Import statement
import WrapSplash from 'wrapsplash';

let UnsplashApi = new WrapSplash({
    access_key: '<api-key>',
    secret_key: '<secret-key>',
    redirect_uri: '<callback-url>',
    code: '<authorization-code>',
    bearer_token: '<bearer-token>'
});

//List photos - Get a single page from the list of all photos.
UnsplashApi.getPhotoLink('<photo-id>')
    .then(function (result) {
        //do something with the data
        console.log(result);
    }).catch(function (e) {
        console.err(e);
    });
```
#### Response
```sh
200 OK
```
```sh
{
  "url": "https://image.unsplash.com/example"
}
```
### Dependency
This library depends on [fetch](https://github.com/github/fetch) to make requests to the [Unsplash API](https://unsplash.com/documentation). For environments that don't support fetch, you'll need to provide a **polyfill**.

### Changelog
#### v3.0.4
- Updated Documentation
- Updated dependecies

#### v3.0.3
- Updated dependecies

#### v3.0.2
- Minor bug fix.

#### v3.0.1
- Minor security fixes.
- Minor bug fixes.
- Code cleanups.
- Updated documentations.
- Test environment setup using Mochajs.
- Assertion test specs added using Chaijs.
- Strict server response validations added.

#### v3.0.0
- Completely re-written in ```ES6``` & ```ES7``` specifications.
- Continuous Integrations (CI) using Travis CI.
- Minor bug fixes.
- Major code optimizations.
- Updated documentaions.
- Major refactorings.
- Now supports Yarn package manager
    - ```https://yarnpkg.com/en/package/wrapsplash```.
- Now available at major CDNs:
    - unpkg - ```https://unpkg.com/wrapsplash@3.0.0/```.
    - bundle.run - ```https://bundle.run/wrapsplash@3.0.0```.
    - jsDelivr - ```https://cdn.jsdelivr.net/npm/wrapsplash@3.0.0/```.

#### v2.0.1
- Minor bug fix.

#### v2.0.0
- Documentation updated.
- Added support for Collections APIs.
    - Get a single page from the list of all collections - ```GET /collections```.
    - Get a single page from the list of featured collections - ```GET /collections/featured```.
    - Get a single page from the list of curated collections - ```GET /collections/curated```.
    - Retrieve a single collection - ```GET /collections/:id```.
    - Retrieve a curated collection - ```GET /collections/curated/:id```.
    - Retrieve a collection’s photos - ```GET /collections/:id/photos```.
    - Retrieve a curated collection’s photos - ```GET /collections/curated/:id/photos```.
    - Retrieve a list of collections - ```GET /collections/:id/related```.
    - Create a new collection - ```POST /collections```.
    - Update an existing collection belonging to the logged-in user - ```PUT /collections/:id```.
    - Delete a collection belonging to the logged-in user - ```DELETE /collections/:id```.
    - Add a photo to one of the logged-in user’s collections - ```POST /collections/:collection_id/add```.
    - Remove a photo from one of the logged-in user’s collections - ```DELETE /collections/:collection_id/remove```.
- Added support for Current User APIs
    - Get the user’s profile - ```GET /me```.
    - Update the current user’s profile - ```PUT /me```.
- Added support for Stats APIs
    - Get a list of counts for all of Unsplash - ```GET /stats/total```.
    - Get the overall Unsplash stats for the past 30 days - ```GET /stats/month```.
- Major refactorings.

#### v1.1.0
- Documentation updated.
- Added support for Authorization.
- Added support for Bearer Token.
- Added support for private data Read Write Access.
- Added support for full Photos APIs
    - Get a single page from the list of all photos - ```GET /photos```.
    - Get a single page from the list of the curated photos - ```GET /photos/curated```.
    - Retrieve a single photo - ```GET /photos/:id```.
    - Retrieve a single random photo, given optional filters - ```GET /photos/random```.
    - Retrieve statistics of a photo in a specific timeframe - ```GET /photos/:id/statistics```.
    - Retrieve a single photo’s download link - ```GET /photos/:id/download```.
    - Update a photo on behalf of the logged-in user - ```PUT /photos/:id```.
    - Like a photo on behalf of the logged-in user - ```POST /photos/:id/like```.
    - Remove a user’s like of a photo - ```DELETE /photos/:id/like```.
- Major refactorings.

#### v1.0.10
- Documentation patch.

#### v1.0.9
- Now supports full Search APIs.
- Added support for new API endpoints.
  - Get a single page of photo results for a query - ```GET /search/photos```.
  - Get a single page of collection results for a query - ```GET /search/collections```.
  - Get a single page of user results for a query - ```GET /search/users```.

#### v1.0.8
- Now supports full Users APIs.
- Added support for new API endpoints.
  - Get a list of collections created by the user - ```GET /users/:username/collections```.
  - Get a user's account statistics - ```GET /users/:username/statistics ```.
- Major refactorings.

#### v1.0.7
 - Added support for new API endpoint.
   - Get a list of photos liked by a user - ```GET /users/:username/likes```.
 - Minor refactorings.


### API Documentation

### Schema
#### Location
The API we are using is ```https://api.unsplash.com/```. Responses are sent as JSON.

#### Summary objects
When retrieving a list of objects, an abbreviated or summary version of that object is returned - i.e., a subset of its attributes. To get a full detailed version of that object, fetch it individually.

#### Error messages
If an error occurs, whether on the server or client side, the error message(s) will be returned in an ```errors``` array. 
For example:
```sh
422 Unprocessable Entity
```
```js
{
  "errors": ["Username is missing", "Password cannot be blank"]
}
```

### Authorization
#### Public Actions
Many actions can be performed without requiring authentication from a specific user. For example, downloading a photo does not require a user to log in.
To authenticate requests in this way, pass your application’s access key via the HTTP ```Authorization``` header:
```sh
Authorization: Client-ID YOUR_ACCESS_KEY
```
You can also pass this value using a ```client_id``` query parameter:
```sh
https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
```
If only your access key is sent, attempting to perform non-public actions that require user authorization will result in a ```401 Unauthorized response```.

#### User Authentication
The Unsplash API uses OAuth2 to authenticate and authorize Unsplash users. Unsplash’s OAuth2 paths live at ```https://unsplash.com/oauth/```.

Before using wrapsplash: 
- Developers are required to create a developer account from [Unsplash](https://unsplash.com/developers).
- Create a new App from Your Apps page.
- Get the ```Access Key```, ```Secret key```, ```Callback URLs```, and ```Authorization code```.
- If you have a Bearer Token, then its super, or else you can generate it using **wrapsplash**.
> **Note:** ```Authorization code``` can be obtained by clicking the ```Authorize``` link  next to ```Callback URLs```. Also ```Authorization code``` is a one-time use code, you have to generate it again, if the action fails!.

#### Generate Bearer Token 
A Promise factory to generate a Bearer Token for ```write_access``` to private data.
> **Note:** No Parameters are required.

```js
const WrapSplash = require('wrapsplash');
let UnsplashApi = new WrapSplash({
    access_key: '<api-key>',
    secret_key: '<secret-key>',
    redirect_uri: '<callback-url>',
    code: '<authorization-code>'
});
UnsplashApi.generateBearerToken()
    .then(function (result) {
        console.log(result);
    }).catch(function (e) {
        console.err(e);
    });
```
If successful, the response body will be a JSON representation of your user’s access token a.k.a bearer token:

```sh
{
   "access_token": "091343ce13c8ae780065ecb3b13dc903475dd22cb78a05503c2e0c69c5e98044",
   "token_type": "bearer",
   "scope": "public read_photos write_photos",
   "created_at": 1436544465
 }
```
and once you have your ```bearer_token``` you can use it in your app like this:
```js
let UnsplashApi = new WrapSplash({
    access_key: '<api-key>',
    secret_key: '<secret-key>',
    redirect_uri: '<callback-url>',
    code: '<authorization-code>',
    bearer_token: '<bearer-token>'
});
```
### Users APIs
#### Get User's Public Profile
A Promise factory to retrieve public details on a given user.
```
GET /users/:username
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **username** | *string* | The username of the particular user | no | 
| **width** | *number* | Width of the profile picture in pixels | yes | 
| **height** | *number* | Height of the profile picture in pixels | yes | 

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

#### Get User's Collections
A Promise factory to get a list of collections created by the user.
```
GET /users/:username/collections
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **username** | *string* | The username of the particular user | no | 
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10

```js
UnsplashApi.getUserCollections('<username>', 1, 10);
```

#### Get User's Statistics
A Promise factory to get a user's account statistics.
```
GET /users/:username/statistics
```

##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **username** | *string* | The username of the particular user | no | 
| **resolution** | *string* | The frequency of the stats | yes | days
| **quantity** | *number* | The amount of for each stat | yes | 30

```js
UnsplashApi.getUserStatistics('<username>', 'days', 30);
```

### Photos APIs
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

#### List Curated Photos
A Promise factory to get a single page from the list of the curated photos.
```
GET /photos/curated
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10
| **order_by** | *string* | How to sort the photos.(```Valid values: latest, oldest, popular```) | yes | latest

```js
UnsplashApi.listCuratedPhotos(1, 10, 'latest');
```

#### Get a Photo by Id
A Promise factory to retrieve a single photo.
```
GET /photos/:id
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **id** | *string* | The photo’s ID | no | 
| **width** | *number* | Image width in pixels | yes | 
| **height** | *number* | Image height in pixels | yes | 
| **rect** | *string* |4 comma-separated integers representing x, y, width, height of the cropped rectangle | yes | 
> **Note:** Supplying the optional **width** or **height** parameters will result
in the custom photo URL being added to the urls object:

```js
UnsplashApi.getAPhoto('<id of the photo>', 500, 500, 'x, y, width, height');
```

#### Get a Random Photo
A Promise factory to retrieve a single random photo, given optional filters.
```
GET /photos/random
```
##### Parameters
> **Note:** All parameters are optional, and can be combined to narrow the pool of photos from which a random one will be chosen.

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- | 
| **collection** | *String* | The public collection ID(‘s) to filter selection. If multiple, comma-separated | yes |
| **featured** | *Boolean* | Limit selection to featured photos | yes | false
| **username** | *String* | Limit selection to a single user | yes |
| **query** | *String* | Limit selection to photos matching a search term | yes |
| **width** | *Number* | The Image width in pixels | yes |
| **height** | *Number* | The Image height in pixels | yes |
| **orientation** | *String* | Filter search results by photo orientation. (```Valid values are landscape, portrait, and squarish```) | yes | landscape
| **count** | *Number* | The number of photos to return. (```max: 30```) | yes | 1

> **Note:** You can’t use the collections and query parameters in the same request.
> When supplying a **count** parameter - and only then - the response will be an array of photos,   even if the value of **count** is 1.

```js
UnsplashApi.getARandomPhoto();
```

#### Get a Photo's Statistics
A Promise factory to retrieve total number of downloads, views and likes of a single photo, as well as the historical breakdown of these stats in a specific timeframe (default is 30 days).
```
GET /photos/:id/statistics
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- | 
| **id** | *string* | The photo’s ID | no | 
| **resolution** | *string* | The frequency of the stats | yes | days
| **quantity** | *number* | The amount of for each stat | yes | 30
> **Note:** Currently, the only resolution param supported is “days”. The quantity param can be any number between 1 and 30.

```js
UnsplashApi.getPhotoStatistics('<photo-id>', 'days', 10);
```

#### Get a Photo's Download Link
A Promise factory to retrieve a single photo’s download link. Preferably hit this endpoint if a photo is downloaded in your application for use (example: to be displayed on a blog article, to be shared on social media, to be remixed, etc).
```
GET /photos/:id/download
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- | 
| **id** | *string* | The photo’s ID | no | 
> **Note:** This is different than the concept of a view, which is tracked automatically when you hotlink an image.

```js
UnsplashApi.getPhotoLink('<photo-id>');
```

#### Update a Photo
A Promise factory to update a photo on behalf of the logged-in user. This requires the ```write_photos``` scope and ```bearer_token```.
```
PUT /photos/:id
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **id** | *string* | The photo’s ID | no | 
| **location** | *object* | The location object holding location data | yes | 
| **exif** | *object* | The exif object holding exif data | yes
> **Note:** **Exchangeable image file format** (officially Exif, according to JEIDA/JEITA/CIPA specifications) is a standard that specifies the formats for images, sound, and ancillary tags used by digital cameras (including smartphones), scanners and other systems handling image and sound files recorded by digital cameras. [Readmore](https://en.wikipedia.org/wiki/Exif)

##### location & exif objects

| object[key] | Description |
| ----- | ----------- |
| location[latitude] | The photo location’s latitude (Optional) | 
| location[longitude] | The photo location’s longitude (Optional) |
| location[name] | The photo location’s name (Optional) |
| location[city] | The photo location’s city (Optional) |
| location[country] | The photo location’s country (Optional) |
| location[confidential] | The photo location’s confidentiality (Optional) | 
| exif[make] | Camera’s brand (Optional) |
| exif[model] | Camera’s model (Optional) |
| exif[exposure_time] | Camera’s exposure time (Optional) |
| exif[aperture_value] | Camera’s aperture value (Optional) |
| exif[focal_length] | Camera’s focal length (Optional) |
| exif[iso_speed_ratings] | Camera’s iso (Optional) |

```js
UnsplashApi.updatePhoto('<photo-id>', {country: 'INDIA'}, {make: 'Redmi Note 3'});
```

#### Like a Photo
A Promise factory to like a photo on behalf of the logged-in user. This requires the ```write_likes``` scope.
```
POST /photos/:id/like
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **id** | *string* | The photo’s ID | no | 
> **Note:**  This action is idempotent; sending the POST request to a single photo multiple times has no additional effect.

```js
UnsplashApi.likePhoto('<photo-id>');
```

#### Unlike a Photo
A Promise factory to remove a user’s like of a photo. 
```
DELETE /photos/:id/like
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **id** | *string* | The photo’s ID | no | 
> **Note:** This action is idempotent; sending the DELETE request to a single photo multiple times has no additional effect.

```js
UnsplashApi.unlikePhoto('<photo-id>');
```

### Search APIs
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

#### Search Collections
A Promise factory to get a single page of collection results for a query.
```
GET /search/collections
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **query** | *string* | The search query | no | 
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10

```js
UnsplashApi.searchCollections('cars', 1, 10);
```

#### Search Users
A Promise factory to get a single page of user results for a query.
```
GET /search/users
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **query** | *string* | The search query | no | 
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10

```js
UnsplashApi.searchUsers('<search-keyword>', 1, 10);
```

### Current User APIs
#### Get User’s Profile
A Promise factory to get the current User's profile. To access a user’s private data, the user is required to authorize the ```read_user``` scope. Without it, this request will return a ```403 Forbidden response```.
```
GET /me
```
> **Note:** No Parameters are required.

> **Note:**  Without a Bearer token (i.e. using a ```Client-ID token```) this request will return a ```401 Unauthorized``` response.

```js
UnsplashApi.getCurrentUserProfile();
```

#### Update User’s Profile
A Promise factory to update the current User's profile. 
```
PUT /me
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| username | *String* | The username of the current user | yes |
| first_name | *String* | The first name of the current user | yes |
| last_name | *String* | The last name of the current user | yes |
| email | *String* | The email id of the current user | yes |
| url | *String* | The Portfolio/personal URL of the current user | yes |
| location | *String* | The location of the current user | yes |
| bio | *String* | The About/bio of the current user | yes |
| instagram_username | *String* | The Instagram username of the current user | yes |
> **Note:** This action requires the ```write_user scope```. Without it, it will return a ```403 Forbidden response```.

```js
UnsplashApi.updateCurrentUserProfile('<username>', '<first_name>', '<last_name>', '<email>', '<url>', '<location>', '<bio>', '<instagram_username>');
```

### Stats APIs
#### Stats Totals
A Promise factory to get a list of counts for all of Unsplash.
```
GET /stats/total
``` 
```js
UnsplashApi.getStatsTotals();
```
#### Response
```sh
200 OK
```
```sh
{
  total_stats = {
    "photos" => 10000,
    "downloads" => 2000,
    "views" => 5000,
    "likes" => 800,
    "photographers" => 100,
    "pixels" => 200000,
    "downloads_per_second" => 10, // average number of downloads per second for the past 7 days
    "views_per_second" => 20,  // average number of views per second for the past 7 days
    "developers" => 20,
    "applications" => 50,
    "requests" => 8000
  }
}
```
#### Stats Month
A Promise factory to get the overall Unsplash stats for the past 30 days.
```
GET /stats/month
```
```js
UnsplashApi.getStatsMonth();
```
#### Response
```sh
200 OK
```
```sh
{
  month_stats = {
    "downloads" => 20,
    "views" => 200,
    "likes" => 60,
    "new_photos" => 10,
    "new_photographers" => 5,
    "new_pixels" => 2000,
    "new_developers" => 8,
    "new_applications" => 5,
    "new_requests" => 100
  }
}
```

### Collections APIs
#### Link Relations
Collections have the following link relations:

| rel | Description |
| --- | ----------- |
| ```self``` | API location of this collection |
| ```html``` | HTML location of this collection |
| ```photos``` | API location of this collection’s photos |
| ```related``` | API location of this collection’s related collections (Non-curated collections only) |
| ```download``` | Download location of this collection’s zip file (Curated collections only) |

#### List Collections
A Promise factory to get a single page from the list of all collections.
```
GET /collections
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10
```js
UnsplashApi.listCollections();
```

#### List Featured Collections
A Promise factory to get a single page from the list of featured collections.
```
GET /collections/featured
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10
```js
UnsplashApi.listFeaturedCollections();
```

#### List Curated Collections
A Promise factory to get a single page from the list of curated collections.
```
GET /collections/curated
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10
```js
UnsplashApi.listCuratedCollections();
```

#### Get a Collection
A Promise factory to retrieve a single collection. To view a user’s private collections, the ```read_collections``` scope is required.
```
GET /collections/:id
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **id** | *string* | The Collection ID  | no | 
```js
UnsplashApi.getCollection('<collection-id>');
```

#### Get a Curated Collection
A Promise factory to retrieve a single curated collection. To view a user’s private collections, the ```read_collections``` scope is required.
```
GET /collections/curated/:id
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **id** | *string* | The Collection ID  | no | 
```js
UnsplashApi.getCuratedCollection('<curated-collection-id>');
```

#### Get a Collection's Photos
A Promise factory to retrieve a collection’s photos.
```
GET /collections/:id/photos
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **id** | *string* | The Collection ID  | no | 
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10
```js
UnsplashApi.getCollectionPhotos('<collection-id>', 1, 10);
```

#### Get a Curated Collection's Photos
A Promise factory to retrieve a curated collection’s photos.
```
GET /collections/curated/:id/photos
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **id** | *string* | The Collection ID  | no | 
| **page** | *number* | Page number to retrieve | yes | 1
| **per_page** | *number* | Number of items per page | yes | 10
```js
UnsplashApi.getCuratedCollectionPhotos('<curated-collection-id>', 1, 10);
```

#### List a Collection’s Related Collections
A Promise factory to retrieve a list of collections related to this one.
```
GET /collections/:id/related
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **id** | *string* | The Collection ID  | no | 
```js
UnsplashApi.listRelatedCollections('<collection-id>');
```

#### Create a New Collection
A Promise factory to create a new collection. This requires the ```write_collections``` scope.
```
POST /collections
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **title** | *string* | The title of the collection | no | 
| **description** | *string* | The collection’s description | yes |
| **private** | *boolean* | Whether to make this collection private | yes | false
```js
UnsplashApi.createNewColection('<collection-name>', '<description>', false);
```

#### Update an Existing Ccollection
A Promise factory to update an existing collection belonging to the logged-in user. This requires the ```write_collections``` scope.
```
PUT /collections/:id
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **id** | *string* | The collection id | no |
| **title** | *string* | The title of the collection | yes | 
| **description** | *string* | The collection’s description | yes |
| **private** | *boolean* | Whether to make this collection private | yes | false
```js
UnsplashApi.updateExistingCollection('<collection-id>','<collection-name>', '<description>', false);
```

#### Delete a Collection 
A Promise factory to delete a collection belonging to the logged-in user. This requires the ```write_collections``` scope.
```
DELETE /collections/:id
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **id** | *string* | The Collection ID  | no | 
```js
UnsplashApi.deleteCollection('<collection-id>');
```

#### Add a Photo to a Collection
A Promise factory to add a photo to one of the logged-in user’s collections. Requires the ```write_collections``` scope.
```
POST /collections/:collection_id/add
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **collection_id** | *string* | The Collection ID  | no | 
| **photo_id** | *string* | The Photo ID  | no | 
> **Note:**  If the photo is already in the collection, this acion has no effect.

```js
UnsplashApi.addPhotoToCollection('<collection-id>', '<photo-id>');
```

#### Remove a Photo from a Collection
A Promise factory to remove a photo from one of the logged-in user’s collections. Requires the ```write_collections``` scope.
```
DELETE  /collections/:collection_id/remove
```
##### Parameters

| Parameter | Type | Description | Optional | Default |
| ----- | ---- | ----------- | -------- | ------- |
| **collection_id** | *string* | The Collection ID  | no | 
| **photo_id** | *string* | The Photo ID  | no | 
```js
UnsplashApi.removePhotoFromCollection('<collection-id>', '<photo-id>');
```


### Continuous Integration (CI)
Continuous Integration services monitor repositories for changes, then automatically run unit tests on your behalf, typically in a containerized environment. To test this setup works in a continuous integration environment, an integration was done with [Travis CI](https://travis-ci.org/). According to the [Travis Node.js Documentation](http://docs.travis-ci.com/user/languages/javascript-with-nodejs/), Travis automatically runs `npm install` and `npm test`. The only additional thing I had to add to the Travis configuration was to run `npm run build` before running the tests. The working Travis config looks like this:

```yml
language: node_js

node_js:
  - stable

install:
  - npm install

script:
  - npm run build
  - npm test
```
Here's the [Travis build page for this project](https://travis-ci.org/SandeepVattapparambil/wrapsplash), which shows the tests passing.

### Tests
WrapSplashJS uses ```Mochajs``` as the testing environment and ```Chaijs``` as the assertion library.
All the test spec files are available in the ```test``` folder. For more information read the README file from the test folder.

### License
The MIT License

Copyright (c) 2018- Sandeep  Vattapparambil, http://www.sandeepv.in

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


### Acknowledgements
Thanks, and Kudos to team [Unsplash](https://unsplash.com/) for creating a wonderful platform for sharing 
beautiful high quality free images and photos.

Made with :heart: at [Nylnda](https://www.nylnda.com/) by [Sandeep Vattapparambil](https://github.com/SandeepVattapparambil).
