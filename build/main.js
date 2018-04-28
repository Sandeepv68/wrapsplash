/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Wrapsplash API wrapper v2.0.1 for Unspalsh API
 * written by: Sandeep Vattapparambil
 * email: sandeepv68@gmail.com
 * website: www.sandeepv.in
 * github: github.com/SandeepVattapparambil
 * license: MIT
 */

/**
 * WrapSplash Module
 * @module WrapSplashApi
 */


//constants. 

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//API Schema definitions


var _nodeFetch = __webpack_require__(1);

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _crypto = __webpack_require__(7);

var _crypto2 = _interopRequireDefault(_crypto);

var _url_config = __webpack_require__(8);

var _url_config2 = _interopRequireDefault(_url_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The main WrapSplash Class.
 * @class WrapSplash
 */
var WrapSplashApi = function () {
    /**
     * The Options object constructor
     * @param  {Object} options - The Options object to initialize the class.
     */
    function WrapSplashApi(options) {
        _classCallCheck(this, WrapSplashApi);

        //The location of the Unsplash API
        this.API_LOCATION = 'https://api.unsplash.com/';
        //The API to generate Unsplash API Bearer Token.
        this.BEARER_TOKEN_URL = 'https://unsplash.com/oauth/token';

        if (options) {
            options = _extends({}, options);
            this.access_key = options.access_key ? options.access_key : function () {
                throw new Error('Access Key missing!');
            }();
            this.secret_key = options.secret_key ? options.secret_key : function () {
                throw new Error('Secret Key missing!');
            }();
            this.redirect_uri = options.redirect_uri ? options.redirect_uri : function () {
                throw new Error('Redirect URI missing!');
            }();
            this.code = options.code ? options.code : function () {
                throw new Error('Authorization Code missing!');
            }();
            this.grant_type = 'authorization_code';
            var hash = _crypto2.default.createHmac('sha256', this.access_key).digest('hex');
            if (options.bearer_token) {
                this.bearer_token = options.bearer_token;
            }
            this.headers = {
                'Content-type': 'application/json',
                'Authorization': this.bearer_token ? 'Bearer ' + this.bearer_token : 'Client-ID ' + this.access_key,
                'X-WrapSplash-Header': hash
            };
            console.log(this.headers);
        } else {
            throw new Error('Initilisation parameters missing!');
        }
        //Set available order_by options
        this.availableOrders = ['latest', 'oldest', 'popular'];
        //Sset available orientation options
        this.availableOrientations = ['landscape', 'portrait', 'squarish'];
    }

    _createClass(WrapSplashApi, [{
        key: 'fetchUrl',


        /**
         * Heler function to fetch a given url
         * @function fetchUrl
         * @param {String} url - The url to be fetched (required).
         * @param {String} method - The HTTP method to be used (required).
         * @returns {Object} - The JSON data object.
         */
        value: function fetchUrl(url, method) {
            return (0, _nodeFetch2.default)(url, {
                method: method,
                headers: this.headers ? this.headers : ''
            }).then(function (res) {
                return res.json();
            }).catch(function (err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: 'generateBeareToken',


        /**
         * Promise factory to generate a Bearer Token for write_access to private data.
         * The Unsplash API uses OAuth2 to authenticate and authorize Unsplash users. 
         * Unsplash’s OAuth2 paths live at https://unsplash.com/oauth/.
         * @function generateBearerToken
         * @memberof UnsplashApi
         * @returns {Object} - The user's Access Token JSON data object.
         */
        value: function generateBeareToken() {
            var url = this.BEARER_TOKEN_URL + '?client_id=' + this.access_key + '&client_secret=' + this.secret_key + '&redirect_uri=' + this.redirect_uri + '&code=' + this.code + '&grant_type=' + this.grant_type;
            return this.fetchUrl(url, 'POST');
        }
    }, {
        key: 'getCurrentUserProfile',


        /**
         * Promise factory to get the current User's profile.
         * To access a user’s private data, the user is required to 
         * authorize the read_user scope. Without it, this request 
         * will return a 403 Forbidden response.
         * Without a Bearer token (i.e. using a Client-ID token) this request 
         * will return a 401 Unauthorized response.
         * @function getCurrentUserProfile
         * @memberof UnsplashApi
         * @returns {Object} - The JSON data Object.
         */
        value: function getCurrentUserProfile() {
            var url = this.API_LOCATION + _url_config2.default.CURRENT_USER_PROFILE;
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'updateCurrentUserProfile',


        /**
         * Promise factory to update the current User's profile.
         * This action requires the write_user scope. Without it, it will return a 403 Forbidden response.
         * @function updateCurrentUserProfile
         * @memberof UnsplashApi
         * @param {String} username - The username of the current user (Optional).
         * @param {String} first_name - The first name of the current user (Optional).
         * @param {String} last_name - The last name of the current user (Optional).
         * @param {String} email - The email id of the current user (Optional).
         * @param {String} url - The Portfolio/personal URL of the current user (Optional).
         * @param {String} location - The location of the current user (Optional).
         * @param {String} bio - The About/bio of the current user (Optional).
         * @param {String} instagram_username - The Instagram username of the current user (Optional).
         * @returns {Object} - The JSON data Object.
         */
        value: function updateCurrentUserProfile(username, first_name, last_name, email, url, location, bio, instagram_username) {
            var _url = this.API_LOCATION + _url_config2.default.UPDATE_CURRENT_USER_PROFILE + '?' + (username ? '?username=' + username : '') + (first_name ? '&first_name=' + first_name : '') + (last_name ? '&last_name=' + last_name : '') + (email ? '&email=' + email : '') + (url ? '&url=' + url : '') + (location ? '&location=' + location : '') + (bio ? '&bio=' + bio : '') + (instagram_username ? '&instagram_username=' + instagram_username : '');
            return this.fetchUrl(_url, 'PUT');
        }
    }, {
        key: 'getPublicProfile',


        /**
         * Promise factory to retrieve public details on a given user.
         * @function getPublicProfile
         * @memberof UnsplashApi
         * @param {*} username - The username of the particular user (required). 
         * @param {Number} width - The width of the profile image to be fetched (Optional).
         * @param {Number} height - The height of the profile image to be fetched (Optional).
         *                          Will be included in the 'profile_image' object as 'custom'. 
         * @returns {Object} - The JSON data object. 
         */
        value: function getPublicProfile(username, width, height) {
            var url = this.API_LOCATION + _url_config2.default.USERS_PUBLIC_PROFILE + username + '?w=' + (width && !isNaN(width) ? +width : '') + '&h=' + (height && !isNaN(height) ? +height : '');
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getUserPortfolio',


        /**
         * Promise factory to retrieve a single user’s portfolio link.
         * @function getUserPortfolio
         * @memberof UnsplashApi
         * @param {*} username - The username of the user to fetch the portfolio (required).
         * @returns {Object} - The JSON data object. 
         */
        value: function getUserPortfolio(username) {
            if (!username || username === '' || username === undefined) {
                throw new Error('Parameter : username is required and cannot be empty!');
            }
            var url = this.API_LOCATION + _url_config2.default.USERS_PORTFOLIO.replace(/:username/gi, username);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getUserPhotos',


        /**
         * Promise factory to get a list of photos uploaded by a particular user.
         * @function getUserPhotos
         * @memberof UnsplashApi
         * @param {*} username - The username of the user to fetch the portfolio (required).
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @param {Booelan} stats - Show the stats for each user’s photo (Optional; default: false).
         * @param {String} resolution - The frequency of the stats (Optional; default: 'days').
         * @param {Number} quantity - The amount of for each stat (Optional; default: 30).
         * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest).
         * @returns {Object} - The JSON data object. 
         */
        value: function getUserPhotos(username, page, per_page, stats, resolution, quantity, order_by) {
            if (!username || username === '' || username === undefined) {
                throw new Error('Parameter : username is required and cannot be empty!');
            }
            if (order_by !== undefined && !this.availableOrders.includes(order_by)) {
                throw new Error('Parameter : order_by has an unsupported value!');
            }
            if (stats !== undefined && typeof stats !== 'boolean') {
                throw new Error('Parameter : stats is a boolean or optional!');
            }
            var url = this.API_LOCATION + _url_config2.default.USERS_PHOTOS.replace(/:username/gi, username) + '?page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) + '&order_by=' + (order_by ? order_by : 'latest') + '&stats=' + (stats ? stats : 'false') + '&resolution=' + (resolution ? encodeURIComponent(resolution) : 'days') + '&quantity=' + (quantity ? quantity : 30);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getUserLikedPhotos',


        /**
         * Promise factory to get a list of photos liked by a user.
         * @function getUserLikedPhotos
         * @memberof UnsplashApi
         * @param {*} username - The username of the user to fetch the portfolio (required).
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest).
         * @returns {Object} - The JSON data object. 
         */
        value: function getUserLikedPhotos(username, page, per_page, order_by) {
            if (!username || username === '' || username === undefined) {
                throw new Error('Parameter : username is required and cannot be empty!');
            }
            if (order_by !== undefined && !this.availableOrders.includes(order_by)) {
                throw new Error('Parameter : order_by has an unsupported value!');
            }
            var url = this.API_LOCATION + _url_config2.default.USERS_LIKED_PHOTOS.replace(/:username/gi, username) + '?page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) + '&order_by=' + (order_by ? order_by : 'latest');
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getUserCollections',


        /**
         * Promise factory to get a list of collections created by the user.
         * @function getUserCollections
         * @memberof UnsplashApi
         * @param {*} username - The username of the user to fetch the portfolio (required).
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @returns {Object} - The JSON data object. 
         */
        value: function getUserCollections(username, page, per_page) {
            if (!username || username === '' || username === undefined) {
                throw new Error('Parameter : username is required and cannot be empty!');
            }
            var url = this.API_LOCATION + _url_config2.default.USERS_COLLECTIONS.replace(/:username/gi, username) + '?page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getUserStatistics',


        /**
         * Pomise factory to retrieve the consolidated number of downloads, views and likes of all user’s photos, 
         * as well as the historical breakdown and average of these stats in a specific timeframe.
         * @function getUserStatistics
         * @memberof UnsplashApi
         * @param {*} username - The username of the user to fetch the portfolio (required).
         * @param {String} resolution - The frequency of the stats (Optional; default: 'days').
         * @param {Number} quantity - The amount of for each stat (Optional; default: 30).
         * @returns {Object} - The JSON data object. 
         */
        value: function getUserStatistics(username, resolution, quantity) {
            if (!username || username === '' || username === undefined) {
                throw new Error('Parameter : username is required and cannot be empty!');
            }
            var url = this.API_LOCATION + _url_config2.default.USERS_STATISTICS.replace(/:username/gi, username) + '?resolution=' + (resolution ? encodeURIComponent(resolution) : 'days') + '&quantity=' + (quantity ? quantity : 30);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'listPhotos',


        /**
         * Promise factory to access the list Photos endpoint of the Unsplash API.
         * @function listPhotos
         * @memberof UnsplashApi
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest).
         * @returns {Object} - The JSON data object. 
         */
        value: function listPhotos(page, per_page, order_by) {
            if (order_by !== undefined && !this.availableOrders.includes(order_by)) {
                throw new Error('Parameter : order_by has an unsupported value!');
            }
            var url = this.API_LOCATION + _url_config2.default.LIST_PHOTOS + '?page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) + '&order_by=' + (order_by ? order_by : 'latest');
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'listCuratedPhotos',


        /**
         * Promise factory to get a single page from the list of the curated photos.
         * @function listCuratedPhotos
         * @memberof UnsplashApi
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest).
         * @returns {Object} - The JSON data object. 
         */
        value: function listCuratedPhotos(page, per_page, order_by) {
            if (order_by !== undefined && !this.availableOrders.includes(order_by)) {
                throw new Error('Parameter : order_by has an unsupported value!');
            }
            var url = this.API_LOCATION + _url_config2.default.LIST_CURATED_PHOTOS + '?page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) + '&order_by=' + (order_by ? order_by : 'latest');
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getAPhoto',


        /**
         * Promise factory to retrieve a single photo.
         * @function getAPhoto
         * @memberof UnsplashApi
         * @param {String} id - The photo’s ID (required).
         * @param {Number} width - Image width in pixels (optional).
         * @param {Number} height - Image height in pixels (optionl).
         * @param {String} rect - 4 comma-separated integers representing x, y, width, height of the cropped rectangle (optional).
         * @returns {Object} - The JSON data object. 
         */
        value: function getAPhoto(id, width, height, rect) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.GET_A_PHOTO.replace(/:id/gi, id) + '?w=' + (width && !isNaN(width) ? +width : '') + '&h=' + (height && !isNaN(height) ? +height : '') + '&rect=' + (rect && rect.typeof === 'string' ? +encodeURIComponent(rect) : '');
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getARandomPhoto',


        /**
         * Promise factory to retrieve a single random photo, given optional filters.
         * All parameters are optional, and can be combined to narrow the pool of 
         * photos from which a random one will be chosen.
         * You can’t use the collections and query parameters in the same request 
         * When supplying a count parameter - and only then - the response will be an 
         * array of photos, even if the value of count is 1.
         * @function getARandomPhoto
         * @memberof UnsplashApi
         * @param {String} collections - The public collection ID(‘s) to filter selection. If multiple, comma-separated
         * @param {Boolean} featured - Limit selection to featured photos.
         * @param {String} username - Limit selection to a single user.
         * @param {String} query - Limit selection to photos matching a search term.
         * @param {Number} width - The Image width in pixels.
         * @param {Number} height - The Image height in pixels.
         * @param {String} orientation - Filter search results by photo orientation. Valid values are landscape, portrait, and squarish.
         * @param {Number} count - The number of photos to return. (Default: 1; max: 30).
         * @returns {Object} - The JSON data object.
         */
        value: function getARandomPhoto(collections, featured, username, query, width, height, orientation, count) {
            if (!this.availableOrientations.includes(orientation) && orientation !== undefined) {
                throw new Error('Parameter : orientation has an unsupported value!');
            }
            var url = this.API_LOCATION + _url_config2.default.GET_A_RANDOM_PHOTO + '?collections=' + (collections && !isNaN(collections) ? +encodeURIComponent(collections) : '') + '&featured=' + (featured ? featured : false) + '&username=' + (username ? username : '') + '&query=' + (query ? encodeURIComponent(query) : '') + '&width=' + (width ? width : '') + '&height=' + (height ? height : '') + '&orientation=' + (orientation ? orientation : 'landscape') + '&count=' + (count ? count : 1);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getPhotoStatistics',


        /**
         * Promise factory to retrieve total number of downloads, views and likes of a single photo, 
         * as well as the historical breakdown of these stats in a specific timeframe (default is 30 days).
         * @function getPhotoStatistics
         * @memberof UnsplashApi
         * @param {String} id - The photo’s ID (required).
         * @param {String} resolution - The frequency of the stats (Optional; default: 'days').
         * @param {Number} quantity - The amount of for each stat (Optional; default: 30).
         * @returns {Object} - The JSON data object.
         */
        value: function getPhotoStatistics(id, resolution, quantity) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.GET_A_PHOTO_STATISTICS.replace(/:id/gi, id) + '?resolution=' + (resolution ? encodeURIComponent(resolution) : 'days') + '&quantity=' + (quantity ? quantity : 30);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getPhotoLink',


        /**
         * Promise factory to retrieve a single photo’s download link. Preferably hit this endpoint 
         * if a photo is downloaded in your application for use (example: to be displayed on a blog article, 
         * to be shared on social media, to be remixed, etc).
         * This is different than the concept of a view, which is tracked automatically when you hotlinking an image.
         * @function getPhotoLink
         * @memberof UnsplashApi
         * @param {String} id - The photo’s ID (required).
         * @returns {Object} - The JSON data object.
         */
        value: function getPhotoLink(id) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.GET_A_PHOTO_DOWNLOAD_LINK.replace(/:id/gi, id);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'updatePhoto',


        /**
         * Promise factory to update a photo on behalf of the logged-in user. 
         * This requires the write_photos scope.
         * @function updatePhoto
         * @memberof UnsplashApi
         * @param {String} id - The photo’s ID (required).
         * @param {Object} location - The location object holding location data (Optional).
         * @param {Object} exif - The exif object holding exif data (Optional).
         * @returns {Object} - The updated photo data object.
         */
        value: function updatePhoto(id, location, exif) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            location = Object.assign({}, location) || {};
            exif = Object.assign({}, exif) || {};
            var url = this.API_LOCATION + _url_config2.default.UPDATE_A_PHOTO.replace(/:id/, id) + '?' + (location.latitude ? '&location[latitude]=' + encodeURIComponent(location.latitude) : '') + (location.longitude ? '&location[longitude]=' + encodeURIComponent(location.longitude) : '') + (location.name ? '&location[name]=' + encodeURIComponent(location.name) : '') + (location.city ? '&location[city]=' + encodeURIComponent(location.city) : '') + (location.country ? '&location[country]=' + encodeURIComponent(location.country) : '') + (location.confidential ? '&location[confidential]=' + encodeURIComponent(location.confidential) : '') + (exif.make ? '&exif[make]=' + encodeURIComponent(exif.make) : '') + (exif.model ? '&exif[model]=' + encodeURIComponent(exif.model) : '') + (exif.exposure_time ? '&exif[exposure_time]=' + encodeURIComponent(exif.exposure_time) : '') + (exif.aperture_value ? '&exif[aperture_value]=' + encodeURIComponent(exif.aperture_value) : '') + (exif.focal_length ? '&exif[focal_length]=' + encodeURIComponent(exif.focal_length) : '') + (exif.iso_speed_ratings ? '&exif[iso_speed_ratings]=' + encodeURIComponent(exif.iso_speed_ratings) : '');
            return this.fetchUrl(url, 'PUT');
        }
    }, {
        key: 'likePhoto',


        /**
         * Promise factory to like a photo on behalf of the logged-in user. 
         * This requires the write_likes scope.
         * This action is idempotent; sending the POST request to a single photo 
         * multiple times has no additional effect.
         * @function likePhoto
         * @memberof UnsplashApi
         * @param {String} id - The photo’s ID (required).
         * @returns {Object} - The updated photo data object.
         */
        value: function likePhoto(id) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.LIKE_A_PHOTO.replace(/:id/gi, id);
            return this.fetchUrl(url, 'POST');
        }
    }, {
        key: 'unlikePhoto',


        /**
         * Promise factory to remove a user’s like of a photo.
         * This action is idempotent; sending the DELETE request 
         * to a single photo multiple times has no additional effect.
         * @function unlikePhoto
         * @memberof UnsplashApi
         * @param {String} id - The photo’s ID (required).
         * @returns {Object} - The updated photo data object.
         */
        value: function unlikePhoto(id) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.UNLIKE_A_PHOTO.replace(/:id/gi, id);
            return this.fetchUrl(url, 'DELETE');
        }
    }, {
        key: 'search',


        /**
         * Promise factory to access the Search Photos endpoint of the Unsplash API.
         * @function search
         * @memberof UnsplashApi
         * @param {String} query - The search query (required).
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @param {Number} collections - The collection ID(‘s) to narrow the search. If multiple, comma-separated (Optional).
         * @param {String} orientation - Filter search results by photo orientation (Optional, Valid values are landscape, portrait, and squarish, defaults to: landscape).
         * @returns {Object} - The JSON data object.
         */
        value: function search(query, page, per_page, collections, orientation) {
            if (!this.availableOrientations.includes(orientation) && orientation !== undefined) {
                throw new Error('Parameter : orientation has an unsupported value!');
            }
            if (query === undefined) {
                throw new Error('Parameter : query is missing!');
            }
            var url = this.API_LOCATION + _url_config2.default.SEARCH_PHOTOS + '?query=' + (query ? encodeURIComponent(query) : '') + '&page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) + '&collections=' + (collections && !isNaN(collections) ? +collections : '') + '&orientation=' + (orientation ? encodeURIComponent(orientation) : '');
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'searchCollections',


        /**
         * Promise factory to get a single page of collection results for a query.
         * @function searchCollections
         * @memberof UnsplashApi
         * @param {String} query - The search query (required).
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @returns {Object} - The JSON data object.
         */
        value: function searchCollections(query, page, per_page) {
            if (query === undefined) {
                throw new Error('Parameter : query is missing!');
            }
            var url = this.API_LOCATION + _url_config2.default.SEARCH_COLLECTIONS + '?query=' + (query ? encodeURIComponent(query) : '') + '&page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'searchUsers',


        /**
         * Promise factory to get a single page of user results for a query.
         * @function searchUsers
         * @memberof UnsplashApi
         * @param {String} query - The search query (required).
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @returns {Object} - The JSON data object.
         */
        value: function searchUsers(query, page, per_page) {
            if (query === undefined) {
                throw new Error('Parameter : query is missing!');
            }
            var url = this.API_LOCATION + _url_config2.default.SEARCH_USERS + '?query=' + (query ? encodeURIComponent(query) : '') + '&page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getStatsTotals',


        /**
         * Promise factory to get a list of counts for all of Unsplash.
         * @function getStatsTotals
         * @memberof UnsplashApi
         * @returns {Object} - The JSON data object.
         */
        value: function getStatsTotals() {
            var url = this.API_LOCATION + _url_config2.default.STATS_TOTALS;
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getStatsMonth',


        /**
         * Promise factory to get the overall Unsplash stats for the past 30 days.
         * @function getStatsMonth
         * @memberof UnsplashApi
         * @returns {Object} - The JSON data object.
         */
        value: function getStatsMonth() {
            var url = this.API_LOCATION + _url_config2.default.STATS_MONTH;
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'listCollections',


        /**
         * Promise factory to get a single page from the list of all collections.
         * @function listCollections
         * @memberof UnsplashApi
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @returns {Object} - The JSON data object.
         */
        value: function listCollections(page, per_page) {
            var url = this.API_LOCATION + _url_config2.default.LIST_COLLECTIONS + '?page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'listFeaturedCollections',


        /**
         * Promise factory to get a single page from the list of featured collections.
         * @function listFeaturedCollections
         * @memberof UnsplashApi
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @returns {Object} - The JSON data object.
         */
        value: function listFeaturedCollections(page, per_page) {
            var url = this.API_LOCATION + _url_config2.default.LIST_FEATURED_COLLECTIONS + '?page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'listCuratedCollections',


        /**
         * Promise factory to get a single page from the list of curated collections.
         * @function listCuratedCollections
         * @memberof UnsplashApi
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @returns {Object} - The JSON data object.
         */
        value: function listCuratedCollections(page, per_page) {
            var url = this.API_LOCATION + _url_config2.default.LIST_CURATED_COLLECTIONS + '?page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getCollection',


        /**
         * Promise factory to retrieve a single collection. 
         * To view a user’s private collections, the read_collections scope is required.
         * @function getCollection
         * @memberof UnsplashApi
         * @param {String} id - The Collection ID (required).
         * @returns {Object} - The updated photo data object.
         */
        value: function getCollection(id) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.GET_COLLECTION.replace(/:id/gi, id);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getCuratedCollection',


        /**
         * Promise factory to retrieve a single curated collection. 
         * To view a user’s private collections, the read_collections scope is required.
         * @function getCuratedCollection
         * @memberof UnsplashApi
         * @param {String} id - The Collection ID (required).
         * @returns {Object} - The updated photo data object.
         */
        value: function getCuratedCollection(id) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.GET_CURATED_COLLECTION.replace(/:id/gi, id);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getCollectionPhotos',


        /**
         * Promise factory to retrieve a collection’s photos.
         * @function getCollectionPhotos
         * @memberof UnsplashApi
         * @param {String} id - The Collection ID (required).
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1). 
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @returns {Object} - The updated photo data object.
         */
        value: function getCollectionPhotos(id, page, per_page) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.GET_COLLECTION_PHOTOS.replace(/:id/gi, id) + '?page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'getCuratedCollectionPhotos',


        /**
         * Promise factory to retrieve a curated collection’s photos.
         * @function getCuratedCollectionPhotos
         * @memberof UnsplashApi
         * @param {String} id - The Collection ID (required).
         * @param {Number} page - The page number of results to fetch (Optional, defaults to 1). 
         * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
         * @returns {Object} - The updated photo data object.
         */
        value: function getCuratedCollectionPhotos(id, page, per_page) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.GET_CURATED_COLLECTION_PHOTOS.replace(/:id/gi, id) + '?page=' + (page && !isNaN(page) ? +page : 1) + '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'listRelatedCollections',


        /**
         * Promise factory to retrieve a list of collections related to a particular one.
         * @function listRelatedCollections
         * @memberof UnsplashApi
         * @param {String} id - The Collection ID (required).
         * @returns {Object} - The updated photo data object.
         */
        value: function listRelatedCollections(id) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.LIST_RELATED_COLLECTION.replace(/:id/gi, id);
            return this.fetchUrl(url, 'GET');
        }
    }, {
        key: 'createNewColection',


        /**
         * Promise factory to create a new collection. 
         * This requires the write_collections scope.
         * @function createNewColection
         * @memberof UnsplashApi
         * @param {String} title - The title of the collection (Required).
         * @param {String} description - The collection’s description (Optional).
         * @param {Boolean} private - Whether to make this collection private (Optional; default false).
         * @returns {Object} - The updated photo data object.
         */
        value: function createNewColection(title, description, private_collection) {
            if (!title || title === undefined || title.length === 0) {
                throw new Error('Parameter : title is required!');
            }
            private_collection = private_collection || false;
            var url = this.API_LOCATION + _url_config2.default.CREATE_NEW_COLLECTION + '?title=' + encodeURIComponent(title) + (description ? '&description=' + encodeURIComponent(description) : '') + '&private=' + private_collection;
            return this.fetchUrl(url, 'POST');
        }
    }, {
        key: 'updateExistingCollection',


        /**
         * Promise factory to update an existing collection belonging to the logged-in user. 
         * This requires the write_collections scope.
         * @function updateExistingCollection
         * @memberof UnsplashApi
         * @param {String} id - The Collection ID (Required).
         * @param {String} title - The title of the collection (Optional).
         * @param {String} description - The collection’s description (Optional).
         * @param {Boolean} private - Whether to make this collection private (Optional; default false).
         * @returns {Object} - The updated photo data object.
         */
        value: function updateExistingCollection(id, title, description, private_collection) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            if (!title || title === undefined || title.length === 0) {
                throw new Error('Parameter : title is required!');
            }
            private_collection = private_collection || false;
            var url = this.API_LOCATION + _url_config2.default.UPDATE_EXISTING_COLLECTION.replace(/:id/gi, id) + '?title=' + encodeURIComponent(title) + (description ? '&description=' + encodeURIComponent(description) : '') + '&private=' + private_collection;
            return this.fetchUrl(url, 'PUT');
        }
    }, {
        key: 'deleteCollection',


        /**
         * Promise factory to delete a collection belonging to the logged-in user. 
         * This requires the write_collections scope.
         * @function deleteCollection
         * @memberof UnsplashApi
         * @param {String} id - The Collection ID (Required).
         * @returns {Object} - The updated photo data object.
         */
        value: function deleteCollection(id) {
            if (!id || id === undefined || id.length === 0) {
                throw new Error('Parameter : id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.DELETE_COLLECTION.replace(/:id/gi, id);
            return this.fetchUrl(url, 'DELETE');
        }
    }, {
        key: 'addPhotoToCollection',


        /**
         * Promise factory to add a photo to one of the logged-in user’s collections. 
         * Requires the write_collections scope.
         * If the photo is already in the collection, this acion has no effect.
         * @function addPhotoToCollection
         * @memberof UnsplashApi
         * @param {String} collection_id - The collection’s ID (Required).
         * @param {String} photo_id - The photo’s ID (Required).
         * @returns {Object} - The updated photo data object.
         */
        value: function addPhotoToCollection(collection_id, photo_id) {
            if (!collection_id || collection_id === undefined || collection_id.length === 0) {
                throw new Error('Parameter : collection_id is required!');
            }
            if (!photo_id || photo_id === undefined || photo_id.length === 0) {
                throw new Error('Parameter : photo_id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.ADD_PHOTO_TO_COLLECTION.replace(/:collection_id/gi, collection_id) + '?photo_id=' + photo_id;
            return this.fetchUrl(url, 'POST');
        }
    }, {
        key: 'removePhotoFromCollection',


        /**
         * Promise factory to remove a photo from one of the logged-in user’s collections. 
         * Requires the write_collections scope.
         * @function removePhotoFromCollection
         * @memberof UnsplashApi
         * @param {String} collection_id - The collection’s ID (Required).
         * @param {String} photo_id - The photo’s ID (Required).
         * @returns {Object} - The updated photo data object.
         */
        value: function removePhotoFromCollection(collection_id, photo_id) {
            if (!collection_id || collection_id === undefined || collection_id.length === 0) {
                throw new Error('Parameter : collection_id is required!');
            }
            if (!photo_id || photo_id === undefined || photo_id.length === 0) {
                throw new Error('Parameter : photo_id is required!');
            }
            var url = this.API_LOCATION + _url_config2.default.REMOVE_PHOTO_FROM_COLLECTION.replace(/:collection_id/gi, collection_id) + '?photo_id=' + photo_id;
            return this.fetchUrl(url, 'DELETE');
        }
    }]);

    return WrapSplashApi;
}();

module.exports = WrapSplashApi;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FetchError", function() { return FetchError; });
// Based on https://github.com/tmpvar/jsdom/blob/aa85b2abf07766ff7bf5c1f6daafb3726f2f2db5/lib/jsdom/living/blob.js
// (MIT licensed)

const BUFFER = Symbol('buffer');
const TYPE = Symbol('type');

class Blob {
	constructor() {
		this[TYPE] = '';

		const blobParts = arguments[0];
		const options = arguments[1];

		const buffers = [];

		if (blobParts) {
			const a = blobParts;
			const length = Number(a.length);
			for (let i = 0; i < length; i++) {
				const element = a[i];
				let buffer;
				if (element instanceof Buffer) {
					buffer = element;
				} else if (ArrayBuffer.isView(element)) {
					buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
				} else if (element instanceof ArrayBuffer) {
					buffer = Buffer.from(element);
				} else if (element instanceof Blob) {
					buffer = element[BUFFER];
				} else {
					buffer = Buffer.from(typeof element === 'string' ? element : String(element));
				}
				buffers.push(buffer);
			}
		}

		this[BUFFER] = Buffer.concat(buffers);

		let type = options && options.type !== undefined && String(options.type).toLowerCase();
		if (type && !/[^\u0020-\u007E]/.test(type)) {
			this[TYPE] = type;
		}
	}
	get size() {
		return this[BUFFER].length;
	}
	get type() {
		return this[TYPE];
	}
	slice() {
		const size = this.size;

		const start = arguments[0];
		const end = arguments[1];
		let relativeStart, relativeEnd;
		if (start === undefined) {
			relativeStart = 0;
		} else if (start < 0) {
			relativeStart = Math.max(size + start, 0);
		} else {
			relativeStart = Math.min(start, size);
		}
		if (end === undefined) {
			relativeEnd = size;
		} else if (end < 0) {
			relativeEnd = Math.max(size + end, 0);
		} else {
			relativeEnd = Math.min(end, size);
		}
		const span = Math.max(relativeEnd - relativeStart, 0);

		const buffer = this[BUFFER];
		const slicedBuffer = buffer.slice(relativeStart, relativeStart + span);
		const blob = new Blob([], { type: arguments[2] });
		blob[BUFFER] = slicedBuffer;
		return blob;
	}
}

Object.defineProperties(Blob.prototype, {
	size: { enumerable: true },
	type: { enumerable: true },
	slice: { enumerable: true }
});

Object.defineProperty(Blob.prototype, Symbol.toStringTag, {
	value: 'Blob',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * fetch-error.js
 *
 * FetchError interface for operational errors
 */

/**
 * Create FetchError instance
 *
 * @param   String      message      Error message for human
 * @param   String      type         Error type for machine
 * @param   String      systemError  For Node.js system error
 * @return  FetchError
 */
function FetchError(message, type, systemError) {
  Error.call(this, message);

  this.message = message;
  this.type = type;

  // when err.type is `system`, err.code contains system error code
  if (systemError) {
    this.code = this.errno = systemError.code;
  }

  // hide custom error implementation details from end-users
  Error.captureStackTrace(this, this.constructor);
}

FetchError.prototype = Object.create(Error.prototype);
FetchError.prototype.constructor = FetchError;
FetchError.prototype.name = 'FetchError';

/**
 * body.js
 *
 * Body interface provides common methods for Request and Response
 */

const Stream = __webpack_require__(2);

var _require = __webpack_require__(2);

const PassThrough = _require.PassThrough;


let convert;
try {
	convert = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"encoding\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())).convert;
} catch (e) {}

const INTERNALS = Symbol('Body internals');

/**
 * Body mixin
 *
 * Ref: https://fetch.spec.whatwg.org/#body
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
function Body(body) {
	var _this = this;

	var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	    _ref$size = _ref.size;

	let size = _ref$size === undefined ? 0 : _ref$size;
	var _ref$timeout = _ref.timeout;
	let timeout = _ref$timeout === undefined ? 0 : _ref$timeout;

	if (body == null) {
		// body is undefined or null
		body = null;
	} else if (typeof body === 'string') {
		// body is string
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
	} else if (body instanceof Blob) {
		// body is blob
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is array buffer
	} else if (body instanceof Stream) {
		// body is stream
	} else {
		// none of the above
		// coerce to string
		body = String(body);
	}
	this[INTERNALS] = {
		body,
		disturbed: false,
		error: null
	};
	this.size = size;
	this.timeout = timeout;

	if (body instanceof Stream) {
		body.on('error', function (err) {
			_this[INTERNALS].error = new FetchError(`Invalid response body while trying to fetch ${_this.url}: ${err.message}`, 'system', err);
		});
	}
}

Body.prototype = {
	get body() {
		return this[INTERNALS].body;
	},

	get bodyUsed() {
		return this[INTERNALS].disturbed;
	},

	/**
  * Decode response as ArrayBuffer
  *
  * @return  Promise
  */
	arrayBuffer() {
		return consumeBody.call(this).then(function (buf) {
			return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
		});
	},

	/**
  * Return raw response as Blob
  *
  * @return Promise
  */
	blob() {
		let ct = this.headers && this.headers.get('content-type') || '';
		return consumeBody.call(this).then(function (buf) {
			return Object.assign(
			// Prevent copying
			new Blob([], {
				type: ct.toLowerCase()
			}), {
				[BUFFER]: buf
			});
		});
	},

	/**
  * Decode response as json
  *
  * @return  Promise
  */
	json() {
		var _this2 = this;

		return consumeBody.call(this).then(function (buffer) {
			try {
				return JSON.parse(buffer.toString());
			} catch (err) {
				return Body.Promise.reject(new FetchError(`invalid json response body at ${_this2.url} reason: ${err.message}`, 'invalid-json'));
			}
		});
	},

	/**
  * Decode response as text
  *
  * @return  Promise
  */
	text() {
		return consumeBody.call(this).then(function (buffer) {
			return buffer.toString();
		});
	},

	/**
  * Decode response as buffer (non-spec api)
  *
  * @return  Promise
  */
	buffer() {
		return consumeBody.call(this);
	},

	/**
  * Decode response as text, while automatically detecting the encoding and
  * trying to decode to UTF-8 (non-spec api)
  *
  * @return  Promise
  */
	textConverted() {
		var _this3 = this;

		return consumeBody.call(this).then(function (buffer) {
			return convertBody(buffer, _this3.headers);
		});
	}

};

// In browsers, all properties are enumerable.
Object.defineProperties(Body.prototype, {
	body: { enumerable: true },
	bodyUsed: { enumerable: true },
	arrayBuffer: { enumerable: true },
	blob: { enumerable: true },
	json: { enumerable: true },
	text: { enumerable: true }
});

Body.mixIn = function (proto) {
	for (const name of Object.getOwnPropertyNames(Body.prototype)) {
		// istanbul ignore else: future proof
		if (!(name in proto)) {
			const desc = Object.getOwnPropertyDescriptor(Body.prototype, name);
			Object.defineProperty(proto, name, desc);
		}
	}
};

/**
 * Consume and convert an entire Body to a Buffer.
 *
 * Ref: https://fetch.spec.whatwg.org/#concept-body-consume-body
 *
 * @return  Promise
 */
function consumeBody() {
	var _this4 = this;

	if (this[INTERNALS].disturbed) {
		return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`));
	}

	this[INTERNALS].disturbed = true;

	if (this[INTERNALS].error) {
		return Body.Promise.reject(this[INTERNALS].error);
	}

	// body is null
	if (this.body === null) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is string
	if (typeof this.body === 'string') {
		return Body.Promise.resolve(Buffer.from(this.body));
	}

	// body is blob
	if (this.body instanceof Blob) {
		return Body.Promise.resolve(this.body[BUFFER]);
	}

	// body is buffer
	if (Buffer.isBuffer(this.body)) {
		return Body.Promise.resolve(this.body);
	}

	// body is buffer
	if (Object.prototype.toString.call(this.body) === '[object ArrayBuffer]') {
		return Body.Promise.resolve(Buffer.from(this.body));
	}

	// istanbul ignore if: should never happen
	if (!(this.body instanceof Stream)) {
		return Body.Promise.resolve(Buffer.alloc(0));
	}

	// body is stream
	// get ready to actually consume the body
	let accum = [];
	let accumBytes = 0;
	let abort = false;

	return new Body.Promise(function (resolve, reject) {
		let resTimeout;

		// allow timeout on slow response body
		if (_this4.timeout) {
			resTimeout = setTimeout(function () {
				abort = true;
				reject(new FetchError(`Response timeout while trying to fetch ${_this4.url} (over ${_this4.timeout}ms)`, 'body-timeout'));
			}, _this4.timeout);
		}

		// handle stream error, such as incorrect content-encoding
		_this4.body.on('error', function (err) {
			reject(new FetchError(`Invalid response body while trying to fetch ${_this4.url}: ${err.message}`, 'system', err));
		});

		_this4.body.on('data', function (chunk) {
			if (abort || chunk === null) {
				return;
			}

			if (_this4.size && accumBytes + chunk.length > _this4.size) {
				abort = true;
				reject(new FetchError(`content size at ${_this4.url} over limit: ${_this4.size}`, 'max-size'));
				return;
			}

			accumBytes += chunk.length;
			accum.push(chunk);
		});

		_this4.body.on('end', function () {
			if (abort) {
				return;
			}

			clearTimeout(resTimeout);

			try {
				resolve(Buffer.concat(accum));
			} catch (err) {
				// handle streams that have accumulated too much data (issue #414)
				reject(new FetchError(`Could not create Buffer from response body for ${_this4.url}: ${err.message}`, 'system', err));
			}
		});
	});
}

/**
 * Detect buffer encoding and convert to target encoding
 * ref: http://www.w3.org/TR/2011/WD-html5-20110113/parsing.html#determining-the-character-encoding
 *
 * @param   Buffer  buffer    Incoming buffer
 * @param   String  encoding  Target encoding
 * @return  String
 */
function convertBody(buffer, headers) {
	if (typeof convert !== 'function') {
		throw new Error('The package `encoding` must be installed to use the textConverted() function');
	}

	const ct = headers.get('content-type');
	let charset = 'utf-8';
	let res, str;

	// header
	if (ct) {
		res = /charset=([^;]*)/i.exec(ct);
	}

	// no charset in content type, peek at response body for at most 1024 bytes
	str = buffer.slice(0, 1024).toString();

	// html5
	if (!res && str) {
		res = /<meta.+?charset=(['"])(.+?)\1/i.exec(str);
	}

	// html4
	if (!res && str) {
		res = /<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(str);

		if (res) {
			res = /charset=(.*)/i.exec(res.pop());
		}
	}

	// xml
	if (!res && str) {
		res = /<\?xml.+?encoding=(['"])(.+?)\1/i.exec(str);
	}

	// found charset
	if (res) {
		charset = res.pop();

		// prevent decode issues when sites use incorrect encoding
		// ref: https://hsivonen.fi/encoding-menu/
		if (charset === 'gb2312' || charset === 'gbk') {
			charset = 'gb18030';
		}
	}

	// turn raw buffers into a single utf-8 buffer
	return convert(buffer, 'UTF-8', charset).toString();
}

/**
 * Detect a URLSearchParams object
 * ref: https://github.com/bitinn/node-fetch/issues/296#issuecomment-307598143
 *
 * @param   Object  obj     Object to detect by type or brand
 * @return  String
 */
function isURLSearchParams(obj) {
	// Duck-typing as a necessary condition.
	if (typeof obj !== 'object' || typeof obj.append !== 'function' || typeof obj.delete !== 'function' || typeof obj.get !== 'function' || typeof obj.getAll !== 'function' || typeof obj.has !== 'function' || typeof obj.set !== 'function') {
		return false;
	}

	// Brand-checking and more duck-typing as optional condition.
	return obj.constructor.name === 'URLSearchParams' || Object.prototype.toString.call(obj) === '[object URLSearchParams]' || typeof obj.sort === 'function';
}

/**
 * Clone body given Res/Req instance
 *
 * @param   Mixed  instance  Response or Request instance
 * @return  Mixed
 */
function clone(instance) {
	let p1, p2;
	let body = instance.body;

	// don't allow cloning a used body
	if (instance.bodyUsed) {
		throw new Error('cannot clone body after it is used');
	}

	// check that body is a stream and not form-data object
	// note: we can't clone the form-data object without having it as a dependency
	if (body instanceof Stream && typeof body.getBoundary !== 'function') {
		// tee instance body
		p1 = new PassThrough();
		p2 = new PassThrough();
		body.pipe(p1);
		body.pipe(p2);
		// set instance body to teed body and return the other teed body
		instance[INTERNALS].body = p1;
		body = p2;
	}

	return body;
}

/**
 * Performs the operation "extract a `Content-Type` value from |object|" as
 * specified in the specification:
 * https://fetch.spec.whatwg.org/#concept-bodyinit-extract
 *
 * This function assumes that instance.body is present.
 *
 * @param   Mixed  instance  Response or Request instance
 */
function extractContentType(instance) {
	const body = instance.body;

	// istanbul ignore if: Currently, because of a guard in Request, body
	// can never be null. Included here for completeness.

	if (body === null) {
		// body is null
		return null;
	} else if (typeof body === 'string') {
		// body is string
		return 'text/plain;charset=UTF-8';
	} else if (isURLSearchParams(body)) {
		// body is a URLSearchParams
		return 'application/x-www-form-urlencoded;charset=UTF-8';
	} else if (body instanceof Blob) {
		// body is blob
		return body.type || null;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return null;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is array buffer
		return null;
	} else if (typeof body.getBoundary === 'function') {
		// detect form data input from form-data module
		return `multipart/form-data;boundary=${body.getBoundary()}`;
	} else {
		// body is stream
		// can't really do much about this
		return null;
	}
}

/**
 * The Fetch Standard treats this as if "total bytes" is a property on the body.
 * For us, we have to explicitly get it with a function.
 *
 * ref: https://fetch.spec.whatwg.org/#concept-body-total-bytes
 *
 * @param   Body    instance   Instance of Body
 * @return  Number?            Number of bytes, or null if not possible
 */
function getTotalBytes(instance) {
	const body = instance.body;

	// istanbul ignore if: included for completion

	if (body === null) {
		// body is null
		return 0;
	} else if (typeof body === 'string') {
		// body is string
		return Buffer.byteLength(body);
	} else if (isURLSearchParams(body)) {
		// body is URLSearchParams
		return Buffer.byteLength(String(body));
	} else if (body instanceof Blob) {
		// body is blob
		return body.size;
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		return body.length;
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is array buffer
		return body.byteLength;
	} else if (body && typeof body.getLengthSync === 'function') {
		// detect form data input from form-data module
		if (body._lengthRetrievers && body._lengthRetrievers.length == 0 || // 1.x
		body.hasKnownLength && body.hasKnownLength()) {
			// 2.x
			return body.getLengthSync();
		}
		return null;
	} else {
		// body is stream
		// can't really do much about this
		return null;
	}
}

/**
 * Write a Body to a Node.js WritableStream (e.g. http.Request) object.
 *
 * @param   Body    instance   Instance of Body
 * @return  Void
 */
function writeToStream(dest, instance) {
	const body = instance.body;


	if (body === null) {
		// body is null
		dest.end();
	} else if (typeof body === 'string') {
		// body is string
		dest.write(body);
		dest.end();
	} else if (isURLSearchParams(body)) {
		// body is URLSearchParams
		dest.write(Buffer.from(String(body)));
		dest.end();
	} else if (body instanceof Blob) {
		// body is blob
		dest.write(body[BUFFER]);
		dest.end();
	} else if (Buffer.isBuffer(body)) {
		// body is buffer
		dest.write(body);
		dest.end();
	} else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
		// body is array buffer
		dest.write(Buffer.from(body));
		dest.end();
	} else {
		// body is stream
		body.pipe(dest);
	}
}

// expose Promise
Body.Promise = global.Promise;

/**
 * headers.js
 *
 * Headers class offers convenient helpers
 */

const invalidTokenRegex = /[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;
const invalidHeaderCharRegex = /[^\t\x20-\x7e\x80-\xff]/;

function validateName(name) {
	name = `${name}`;
	if (invalidTokenRegex.test(name)) {
		throw new TypeError(`${name} is not a legal HTTP header name`);
	}
}

function validateValue(value) {
	value = `${value}`;
	if (invalidHeaderCharRegex.test(value)) {
		throw new TypeError(`${value} is not a legal HTTP header value`);
	}
}

/**
 * Find the key in the map object given a header name.
 *
 * Returns undefined if not found.
 *
 * @param   String  name  Header name
 * @return  String|Undefined
 */
function find(map, name) {
	name = name.toLowerCase();
	for (const key in map) {
		if (key.toLowerCase() === name) {
			return key;
		}
	}
	return undefined;
}

const MAP = Symbol('map');
class Headers {
	/**
  * Headers class
  *
  * @param   Object  headers  Response headers
  * @return  Void
  */
	constructor() {
		let init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this[MAP] = Object.create(null);

		if (init instanceof Headers) {
			const rawHeaders = init.raw();
			const headerNames = Object.keys(rawHeaders);

			for (const headerName of headerNames) {
				for (const value of rawHeaders[headerName]) {
					this.append(headerName, value);
				}
			}

			return;
		}

		// We don't worry about converting prop to ByteString here as append()
		// will handle it.
		if (init == null) {
			// no op
		} else if (typeof init === 'object') {
			const method = init[Symbol.iterator];
			if (method != null) {
				if (typeof method !== 'function') {
					throw new TypeError('Header pairs must be iterable');
				}

				// sequence<sequence<ByteString>>
				// Note: per spec we have to first exhaust the lists then process them
				const pairs = [];
				for (const pair of init) {
					if (typeof pair !== 'object' || typeof pair[Symbol.iterator] !== 'function') {
						throw new TypeError('Each header pair must be iterable');
					}
					pairs.push(Array.from(pair));
				}

				for (const pair of pairs) {
					if (pair.length !== 2) {
						throw new TypeError('Each header pair must be a name/value tuple');
					}
					this.append(pair[0], pair[1]);
				}
			} else {
				// record<ByteString, ByteString>
				for (const key of Object.keys(init)) {
					const value = init[key];
					this.append(key, value);
				}
			}
		} else {
			throw new TypeError('Provided initializer must be an object');
		}
	}

	/**
  * Return combined header value given name
  *
  * @param   String  name  Header name
  * @return  Mixed
  */
	get(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key === undefined) {
			return null;
		}

		return this[MAP][key].join(', ');
	}

	/**
  * Iterate over all headers
  *
  * @param   Function  callback  Executed for each item with parameters (value, name, thisArg)
  * @param   Boolean   thisArg   `this` context for callback function
  * @return  Void
  */
	forEach(callback) {
		let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

		let pairs = getHeaders(this);
		let i = 0;
		while (i < pairs.length) {
			var _pairs$i = pairs[i];
			const name = _pairs$i[0],
			      value = _pairs$i[1];

			callback.call(thisArg, value, name, this);
			pairs = getHeaders(this);
			i++;
		}
	}

	/**
  * Overwrite header values given name
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	set(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		this[MAP][key !== undefined ? key : name] = [value];
	}

	/**
  * Append a value onto existing header
  *
  * @param   String  name   Header name
  * @param   String  value  Header value
  * @return  Void
  */
	append(name, value) {
		name = `${name}`;
		value = `${value}`;
		validateName(name);
		validateValue(value);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			this[MAP][key].push(value);
		} else {
			this[MAP][name] = [value];
		}
	}

	/**
  * Check for header name existence
  *
  * @param   String   name  Header name
  * @return  Boolean
  */
	has(name) {
		name = `${name}`;
		validateName(name);
		return find(this[MAP], name) !== undefined;
	}

	/**
  * Delete all header values given name
  *
  * @param   String  name  Header name
  * @return  Void
  */
	delete(name) {
		name = `${name}`;
		validateName(name);
		const key = find(this[MAP], name);
		if (key !== undefined) {
			delete this[MAP][key];
		}
	}

	/**
  * Return raw headers (non-spec api)
  *
  * @return  Object
  */
	raw() {
		return this[MAP];
	}

	/**
  * Get an iterator on keys.
  *
  * @return  Iterator
  */
	keys() {
		return createHeadersIterator(this, 'key');
	}

	/**
  * Get an iterator on values.
  *
  * @return  Iterator
  */
	values() {
		return createHeadersIterator(this, 'value');
	}

	/**
  * Get an iterator on entries.
  *
  * This is the default iterator of the Headers object.
  *
  * @return  Iterator
  */
	[Symbol.iterator]() {
		return createHeadersIterator(this, 'key+value');
	}
}
Headers.prototype.entries = Headers.prototype[Symbol.iterator];

Object.defineProperty(Headers.prototype, Symbol.toStringTag, {
	value: 'Headers',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Headers.prototype, {
	get: { enumerable: true },
	forEach: { enumerable: true },
	set: { enumerable: true },
	append: { enumerable: true },
	has: { enumerable: true },
	delete: { enumerable: true },
	keys: { enumerable: true },
	values: { enumerable: true },
	entries: { enumerable: true }
});

function getHeaders(headers) {
	let kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'key+value';

	const keys = Object.keys(headers[MAP]).sort();
	return keys.map(kind === 'key' ? function (k) {
		return k.toLowerCase();
	} : kind === 'value' ? function (k) {
		return headers[MAP][k].join(', ');
	} : function (k) {
		return [k.toLowerCase(), headers[MAP][k].join(', ')];
	});
}

const INTERNAL = Symbol('internal');

function createHeadersIterator(target, kind) {
	const iterator = Object.create(HeadersIteratorPrototype);
	iterator[INTERNAL] = {
		target,
		kind,
		index: 0
	};
	return iterator;
}

const HeadersIteratorPrototype = Object.setPrototypeOf({
	next() {
		// istanbul ignore if
		if (!this || Object.getPrototypeOf(this) !== HeadersIteratorPrototype) {
			throw new TypeError('Value of `this` is not a HeadersIterator');
		}

		var _INTERNAL = this[INTERNAL];
		const target = _INTERNAL.target,
		      kind = _INTERNAL.kind,
		      index = _INTERNAL.index;

		const values = getHeaders(target, kind);
		const len = values.length;
		if (index >= len) {
			return {
				value: undefined,
				done: true
			};
		}

		this[INTERNAL].index = index + 1;

		return {
			value: values[index],
			done: false
		};
	}
}, Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));

Object.defineProperty(HeadersIteratorPrototype, Symbol.toStringTag, {
	value: 'HeadersIterator',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * Export the Headers object in a form that Node.js can consume.
 *
 * @param   Headers  headers
 * @return  Object
 */
function exportNodeCompatibleHeaders(headers) {
	const obj = Object.assign({ __proto__: null }, headers[MAP]);

	// http.request() only supports string as Host header. This hack makes
	// specifying custom Host header possible.
	const hostHeaderKey = find(headers[MAP], 'Host');
	if (hostHeaderKey !== undefined) {
		obj[hostHeaderKey] = obj[hostHeaderKey][0];
	}

	return obj;
}

/**
 * Create a Headers object from an object of headers, ignoring those that do
 * not conform to HTTP grammar productions.
 *
 * @param   Object  obj  Object of headers
 * @return  Headers
 */
function createHeadersLenient(obj) {
	const headers = new Headers();
	for (const name of Object.keys(obj)) {
		if (invalidTokenRegex.test(name)) {
			continue;
		}
		if (Array.isArray(obj[name])) {
			for (const val of obj[name]) {
				if (invalidHeaderCharRegex.test(val)) {
					continue;
				}
				if (headers[MAP][name] === undefined) {
					headers[MAP][name] = [val];
				} else {
					headers[MAP][name].push(val);
				}
			}
		} else if (!invalidHeaderCharRegex.test(obj[name])) {
			headers[MAP][name] = [obj[name]];
		}
	}
	return headers;
}

/**
 * response.js
 *
 * Response class provides content decoding
 */

var _require$1 = __webpack_require__(3);

const STATUS_CODES = _require$1.STATUS_CODES;


const INTERNALS$1 = Symbol('Response internals');

/**
 * Response class
 *
 * @param   Stream  body  Readable stream
 * @param   Object  opts  Response options
 * @return  Void
 */
class Response {
	constructor() {
		let body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
		let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		Body.call(this, body, opts);

		const status = opts.status || 200;

		this[INTERNALS$1] = {
			url: opts.url,
			status,
			statusText: opts.statusText || STATUS_CODES[status],
			headers: new Headers(opts.headers)
		};
	}

	get url() {
		return this[INTERNALS$1].url;
	}

	get status() {
		return this[INTERNALS$1].status;
	}

	/**
  * Convenience property representing if the request ended normally
  */
	get ok() {
		return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
	}

	get statusText() {
		return this[INTERNALS$1].statusText;
	}

	get headers() {
		return this[INTERNALS$1].headers;
	}

	/**
  * Clone this response
  *
  * @return  Response
  */
	clone() {
		return new Response(clone(this), {
			url: this.url,
			status: this.status,
			statusText: this.statusText,
			headers: this.headers,
			ok: this.ok
		});
	}
}

Body.mixIn(Response.prototype);

Object.defineProperties(Response.prototype, {
	url: { enumerable: true },
	status: { enumerable: true },
	ok: { enumerable: true },
	statusText: { enumerable: true },
	headers: { enumerable: true },
	clone: { enumerable: true }
});

Object.defineProperty(Response.prototype, Symbol.toStringTag, {
	value: 'Response',
	writable: false,
	enumerable: false,
	configurable: true
});

/**
 * request.js
 *
 * Request class contains server only options
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */

var _require$2 = __webpack_require__(4);

const format_url = _require$2.format;
const parse_url = _require$2.parse;


const INTERNALS$2 = Symbol('Request internals');

/**
 * Check if a value is an instance of Request.
 *
 * @param   Mixed   input
 * @return  Boolean
 */
function isRequest(input) {
	return typeof input === 'object' && typeof input[INTERNALS$2] === 'object';
}

/**
 * Request class
 *
 * @param   Mixed   input  Url or Request instance
 * @param   Object  init   Custom options
 * @return  Void
 */
class Request {
	constructor(input) {
		let init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		let parsedURL;

		// normalize input
		if (!isRequest(input)) {
			if (input && input.href) {
				// in order to support Node.js' Url objects; though WHATWG's URL objects
				// will fall into this branch also (since their `toString()` will return
				// `href` property anyway)
				parsedURL = parse_url(input.href);
			} else {
				// coerce input to a string before attempting to parse
				parsedURL = parse_url(`${input}`);
			}
			input = {};
		} else {
			parsedURL = parse_url(input.url);
		}

		let method = init.method || input.method || 'GET';
		method = method.toUpperCase();

		if ((init.body != null || isRequest(input) && input.body !== null) && (method === 'GET' || method === 'HEAD')) {
			throw new TypeError('Request with GET/HEAD method cannot have body');
		}

		let inputBody = init.body != null ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;

		Body.call(this, inputBody, {
			timeout: init.timeout || input.timeout || 0,
			size: init.size || input.size || 0
		});

		const headers = new Headers(init.headers || input.headers || {});

		if (init.body != null) {
			const contentType = extractContentType(this);
			if (contentType !== null && !headers.has('Content-Type')) {
				headers.append('Content-Type', contentType);
			}
		}

		this[INTERNALS$2] = {
			method,
			redirect: init.redirect || input.redirect || 'follow',
			headers,
			parsedURL
		};

		// node-fetch-only options
		this.follow = init.follow !== undefined ? init.follow : input.follow !== undefined ? input.follow : 20;
		this.compress = init.compress !== undefined ? init.compress : input.compress !== undefined ? input.compress : true;
		this.counter = init.counter || input.counter || 0;
		this.agent = init.agent || input.agent;
	}

	get method() {
		return this[INTERNALS$2].method;
	}

	get url() {
		return format_url(this[INTERNALS$2].parsedURL);
	}

	get headers() {
		return this[INTERNALS$2].headers;
	}

	get redirect() {
		return this[INTERNALS$2].redirect;
	}

	/**
  * Clone this request
  *
  * @return  Request
  */
	clone() {
		return new Request(this);
	}
}

Body.mixIn(Request.prototype);

Object.defineProperty(Request.prototype, Symbol.toStringTag, {
	value: 'Request',
	writable: false,
	enumerable: false,
	configurable: true
});

Object.defineProperties(Request.prototype, {
	method: { enumerable: true },
	url: { enumerable: true },
	headers: { enumerable: true },
	redirect: { enumerable: true },
	clone: { enumerable: true }
});

/**
 * Convert a Request to Node.js http request options.
 *
 * @param   Request  A Request instance
 * @return  Object   The options object to be passed to http.request
 */
function getNodeRequestOptions(request) {
	const parsedURL = request[INTERNALS$2].parsedURL;
	const headers = new Headers(request[INTERNALS$2].headers);

	// fetch step 1.3
	if (!headers.has('Accept')) {
		headers.set('Accept', '*/*');
	}

	// Basic fetch
	if (!parsedURL.protocol || !parsedURL.hostname) {
		throw new TypeError('Only absolute URLs are supported');
	}

	if (!/^https?:$/.test(parsedURL.protocol)) {
		throw new TypeError('Only HTTP(S) protocols are supported');
	}

	// HTTP-network-or-cache fetch steps 2.4-2.7
	let contentLengthValue = null;
	if (request.body == null && /^(POST|PUT)$/i.test(request.method)) {
		contentLengthValue = '0';
	}
	if (request.body != null) {
		const totalBytes = getTotalBytes(request);
		if (typeof totalBytes === 'number') {
			contentLengthValue = String(totalBytes);
		}
	}
	if (contentLengthValue) {
		headers.set('Content-Length', contentLengthValue);
	}

	// HTTP-network-or-cache fetch step 2.11
	if (!headers.has('User-Agent')) {
		headers.set('User-Agent', 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)');
	}

	// HTTP-network-or-cache fetch step 2.15
	if (request.compress) {
		headers.set('Accept-Encoding', 'gzip,deflate');
	}
	if (!headers.has('Connection') && !request.agent) {
		headers.set('Connection', 'close');
	}

	// HTTP-network fetch step 4.2
	// chunked encoding is handled by Node.js

	return Object.assign({}, parsedURL, {
		method: request.method,
		headers: exportNodeCompatibleHeaders(headers),
		agent: request.agent
	});
}

/**
 * index.js
 *
 * a request API compatible with window.fetch
 *
 * All spec algorithm step numbers are based on https://fetch.spec.whatwg.org/commit-snapshots/ae716822cb3a61843226cd090eefc6589446c1d2/.
 */

const http = __webpack_require__(3);
const https = __webpack_require__(5);

var _require$3 = __webpack_require__(2);

const PassThrough$1 = _require$3.PassThrough;

var _require2 = __webpack_require__(4);

const resolve_url = _require2.resolve;

const zlib = __webpack_require__(6);

/**
 * Fetch function
 *
 * @param   Mixed    url   Absolute url or Request instance
 * @param   Object   opts  Fetch options
 * @return  Promise
 */
function fetch(url, opts) {

	// allow custom promise
	if (!fetch.Promise) {
		throw new Error('native promise missing, set fetch.Promise to your favorite alternative');
	}

	Body.Promise = fetch.Promise;

	// wrap http.request into fetch
	return new fetch.Promise(function (resolve, reject) {
		// build request object
		const request = new Request(url, opts);
		const options = getNodeRequestOptions(request);

		const send = (options.protocol === 'https:' ? https : http).request;

		// send request
		const req = send(options);
		let reqTimeout;

		function finalize() {
			req.abort();
			clearTimeout(reqTimeout);
		}

		if (request.timeout) {
			req.once('socket', function (socket) {
				reqTimeout = setTimeout(function () {
					reject(new FetchError(`network timeout at: ${request.url}`, 'request-timeout'));
					finalize();
				}, request.timeout);
			});
		}

		req.on('error', function (err) {
			reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, 'system', err));
			finalize();
		});

		req.on('response', function (res) {
			clearTimeout(reqTimeout);

			const headers = createHeadersLenient(res.headers);

			// HTTP fetch step 5
			if (fetch.isRedirect(res.statusCode)) {
				// HTTP fetch step 5.2
				const location = headers.get('Location');

				// HTTP fetch step 5.3
				const locationURL = location === null ? null : resolve_url(request.url, location);

				// HTTP fetch step 5.5
				switch (request.redirect) {
					case 'error':
						reject(new FetchError(`redirect mode is set to error: ${request.url}`, 'no-redirect'));
						finalize();
						return;
					case 'manual':
						// node-fetch-specific step: make manual redirect a bit easier to use by setting the Location header value to the resolved URL.
						if (locationURL !== null) {
							headers.set('Location', locationURL);
						}
						break;
					case 'follow':
						// HTTP-redirect fetch step 2
						if (locationURL === null) {
							break;
						}

						// HTTP-redirect fetch step 5
						if (request.counter >= request.follow) {
							reject(new FetchError(`maximum redirect reached at: ${request.url}`, 'max-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 6 (counter increment)
						// Create a new Request object.
						const requestOpts = {
							headers: new Headers(request.headers),
							follow: request.follow,
							counter: request.counter + 1,
							agent: request.agent,
							compress: request.compress,
							method: request.method,
							body: request.body
						};

						// HTTP-redirect fetch step 9
						if (res.statusCode !== 303 && request.body && getTotalBytes(request) === null) {
							reject(new FetchError('Cannot follow redirect with body being a readable stream', 'unsupported-redirect'));
							finalize();
							return;
						}

						// HTTP-redirect fetch step 11
						if (res.statusCode === 303 || (res.statusCode === 301 || res.statusCode === 302) && request.method === 'POST') {
							requestOpts.method = 'GET';
							requestOpts.body = undefined;
							requestOpts.headers.delete('content-length');
						}

						// HTTP-redirect fetch step 15
						resolve(fetch(new Request(locationURL, requestOpts)));
						finalize();
						return;
				}
			}

			// prepare response
			let body = res.pipe(new PassThrough$1());
			const response_options = {
				url: request.url,
				status: res.statusCode,
				statusText: res.statusMessage,
				headers: headers,
				size: request.size,
				timeout: request.timeout
			};

			// HTTP-network fetch step 12.1.1.3
			const codings = headers.get('Content-Encoding');

			// HTTP-network fetch step 12.1.1.4: handle content codings

			// in following scenarios we ignore compression support
			// 1. compression support is disabled
			// 2. HEAD request
			// 3. no Content-Encoding header
			// 4. no content response (204)
			// 5. content not modified response (304)
			if (!request.compress || request.method === 'HEAD' || codings === null || res.statusCode === 204 || res.statusCode === 304) {
				resolve(new Response(body, response_options));
				return;
			}

			// For Node v6+
			// Be less strict when decoding compressed responses, since sometimes
			// servers send slightly invalid responses that are still accepted
			// by common browsers.
			// Always using Z_SYNC_FLUSH is what cURL does.
			const zlibOptions = {
				flush: zlib.Z_SYNC_FLUSH,
				finishFlush: zlib.Z_SYNC_FLUSH
			};

			// for gzip
			if (codings == 'gzip' || codings == 'x-gzip') {
				body = body.pipe(zlib.createGunzip(zlibOptions));
				resolve(new Response(body, response_options));
				return;
			}

			// for deflate
			if (codings == 'deflate' || codings == 'x-deflate') {
				// handle the infamous raw deflate response from old servers
				// a hack for old IIS and Apache servers
				const raw = res.pipe(new PassThrough$1());
				raw.once('data', function (chunk) {
					// see http://stackoverflow.com/questions/37519828
					if ((chunk[0] & 0x0F) === 0x08) {
						body = body.pipe(zlib.createInflate());
					} else {
						body = body.pipe(zlib.createInflateRaw());
					}
					resolve(new Response(body, response_options));
				});
				return;
			}

			// otherwise, use response as-is
			resolve(new Response(body, response_options));
		});

		writeToStream(req, request);
	});
}

/**
 * Redirect code matching
 *
 * @param   Number   code  Status code
 * @return  Boolean
 */
fetch.isRedirect = function (code) {
	return code === 301 || code === 302 || code === 303 || code === 307 || code === 308;
};

// Needed for TypeScript.
fetch.default = fetch;

// expose Promise
fetch.Promise = global.Promise;

/* harmony default export */ __webpack_exports__["default"] = (fetch);



/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 8 */
/***/ (function(module) {

module.exports = {"USERS_PUBLIC_PROFILE":"users/","USERS_PORTFOLIO":"users/:username/portfolio","USERS_PHOTOS":"users/:username/photos","USERS_LIKED_PHOTOS":"users/:username/likes","USERS_COLLECTIONS":"users/:username/collections","USERS_STATISTICS":"users/:username/statistics","LIST_PHOTOS":"photos","LIST_CURATED_PHOTOS":"photos/curated","GET_A_PHOTO":"photos/:id","GET_A_RANDOM_PHOTO":"photos/random","GET_A_PHOTO_STATISTICS":"photos/:id/statistics","GET_A_PHOTO_DOWNLOAD_LINK":"photos/:id/download","UPDATE_A_PHOTO":"photos/:id","LIKE_A_PHOTO":"photos/:id/like","UNLIKE_A_PHOTO":"photos/:id/like","SEARCH_PHOTOS":"search/photos","SEARCH_COLLECTIONS":"search/collections","SEARCH_USERS":"search/users","CURRENT_USER_PROFILE":"me","UPDATE_CURRENT_USER_PROFILE":"me","STATS_TOTALS":"stats/total","STATS_MONTH":"stats/month","LIST_COLLECTIONS":"collections","LIST_FEATURED_COLLECTIONS":"collections/featured","LIST_CURATED_COLLECTIONS":"collections/curated","GET_COLLECTION":"collections/:id","GET_CURATED_COLLECTION":"collections/curated/:id","GET_COLLECTION_PHOTOS":"collections/:id/photos","GET_CURATED_COLLECTION_PHOTOS":"collections/curated/:id/photos","LIST_RELATED_COLLECTION":"collections/:id/related","CREATE_NEW_COLLECTION":"collections","UPDATE_EXISTING_COLLECTION":"collections/:id","DELETE_COLLECTION":"collections/:id","ADD_PHOTO_TO_COLLECTION":"collections/:collection_id/add","REMOVE_PHOTO_FROM_COLLECTION":"collections/:collection_id/remove"};

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map