/**
 * Wrapsplash API wrapper v3.0.8 for Unspalsh API
 * written by: Sandeep Vattapparambil
 * email: sandeepv68@gmail.com
 * website: www.sandeepv.in
 * github: github.com/SandeepVattapparambil
 * license: MIT
 */

/**
 * WrapSplashApi Module
 * @module WrapSplashApi
 */

'use strict';
//constants. 
import crypto from 'crypto';
//Import library
import AxiosAjax from '../lib/axiosAjaxLib';
//API Schema definitions
import urlConfig from '../config/url_config.json';

/**
 * The main WrapSplash Class.
 * @class WrapSplash
 */
class WrapSplashApi {
    /**
     * The Options object constructor
     * @param  {Object} options - The Options object to initialize the class.
     */
    constructor(options) {
        //The location of the Unsplash API
        this.API_LOCATION = urlConfig.API_LOCATION;
        //The API to generate Unsplash API Bearer Token.
        this.BEARER_TOKEN_URL = urlConfig.BEARER_TOKEN_URL;

        if (options) {
            //Object.assign
            options = { ...{},
                ...options
            };
            this.access_key = (options.access_key ? options.access_key : (function () {
                throw new Error('Access Key missing!');
            }()));
            this.secret_key = (options.secret_key ? options.secret_key : (function () {
                throw new Error('Secret Key missing!');
            }()));
            this.redirect_uri = (options.redirect_uri ? options.redirect_uri : (function () {
                throw new Error('Redirect URI missing!');
            }()));
            this.code = (options.code ? options.code : (function () {
                throw new Error('Authorization Code missing!');
            }()));
            this.grant_type = 'authorization_code';
            let hash = crypto.createHmac('sha256', this.access_key).digest('hex');
            if (options.bearer_token) {
                this.bearer_token = options.bearer_token;
            }
            this.headers = {
                'Content-type': 'application/json',
                'Authorization': (this.bearer_token ? 'Bearer ' + this.bearer_token : 'Client-ID ' + this.access_key),
                'X-Requested-With': 'WrapSplash',
                'X-WrapSplash-Header': hash
            };
        } else {
            throw new Error('Initilisation parameters missing!');
        }
        //Set available order_by options
        this.availableOrders = ['latest', 'oldest', 'popular'];
        //Sset available orientation options
        this.availableOrientations = ['landscape', 'portrait', 'squarish'];
    };

    /**
     * Heler function to fetch a given url
     * @function fetchUrl
     * @param {String} url - The url to be fetched (required).
     * @param {String} method - The HTTP method to be used (required).
     * @returns {Object} - The JSON data object.
     */
    fetchUrl(url, method) {
        let ajax = new AxiosAjax({
            headers: (this.headers ? this.headers : '')
        });
        return ajax.makeRequest(url, method.toLowerCase())
            .then(function (res) {
                if (res.status === 204) {
                    let response = {
                        status: res.status,
                        statusText: res.statusText,
                        message: 'Content Deleted'
                    };
                    return response;
                } else if (res.status === 403) {
                    let response = {
                        status: res.status,
                        statusText: res.statusText,
                        message: 'Rate Limit Exceeded'
                    };
                    return response;
                } else {
                    return res.data
                };
            }).catch(function (err) {
                return Promise.reject(err);
            });
    };

    /**
     * Promise factory to generate a Bearer Token for write_access to private data.
     * The Unsplash API uses OAuth2 to authenticate and authorize Unsplash users. 
     * Unsplash’s OAuth2 paths live at https://unsplash.com/oauth/.
     * @function generateBearerToken
     * @memberof UnsplashApi
     * @returns {Object} - The user's Access Token JSON data object.
     */
    generateBearerToken() {
        let url = this.BEARER_TOKEN_URL +
            '?client_id=' + (this.access_key) +
            '&client_secret=' + (this.secret_key) +
            '&redirect_uri=' + (this.redirect_uri) +
            '&code=' + (this.code) +
            '&grant_type=' + (this.grant_type);
        return this.fetchUrl(url, 'POST');
    };

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
    getCurrentUserProfile() {
        let url = this.API_LOCATION + urlConfig.CURRENT_USER_PROFILE;
        return this.fetchUrl(url, 'GET');
    };

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
    updateCurrentUserProfile(username, first_name, last_name, email, url, location, bio, instagram_username) {
        let _url = this.API_LOCATION + urlConfig.UPDATE_CURRENT_USER_PROFILE + '?' +
            (username ? '?username=' + username : '') +
            (first_name ? '&first_name=' + first_name : '') +
            (last_name ? '&last_name=' + last_name : '') +
            (email ? '&email=' + email : '') +
            (url ? '&url=' + url : '') +
            (location ? '&location=' + location : '') +
            (bio ? '&bio=' + bio : '') +
            (instagram_username ? '&instagram_username=' + instagram_username : '');
        return this.fetchUrl(_url, 'PUT');
    };

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
    getPublicProfile(username, width, height) {
        let url = this.API_LOCATION + urlConfig.USERS_PUBLIC_PROFILE + username +
            '?w=' + (width && !isNaN(width) ? +width : '') +
            '&h=' + (height && !isNaN(height) ? +height : '');
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to retrieve a single user’s portfolio link.
     * @function getUserPortfolio
     * @memberof UnsplashApi
     * @param {*} username - The username of the user to fetch the portfolio (required).
     * @returns {Object} - The JSON data object. 
     */
    getUserPortfolio(username) {
        if (!username || username === '' || username === undefined) {
            throw new Error('Parameter : username is required and cannot be empty!');
        }
        let url = this.API_LOCATION + urlConfig.USERS_PORTFOLIO.replace(/:username/gi, username);
        return this.fetchUrl(url, 'GET');
    };

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
    getUserPhotos(username, page, per_page, stats, resolution, quantity, order_by) {
        if (!username || username === '' || username === undefined) {
            throw new Error('Parameter : username is required and cannot be empty!');
        }
        if (order_by !== undefined && !this.availableOrders.includes(order_by)) {
            throw new Error('Parameter : order_by has an unsupported value!');
        }
        if (stats !== undefined && typeof (stats) !== 'boolean') {
            throw new Error('Parameter : stats is a boolean or optional!');
        }
        let url = this.API_LOCATION + urlConfig.USERS_PHOTOS.replace(/:username/gi, username) +
            '?page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) +
            '&order_by=' + (order_by ? order_by : 'latest') +
            '&stats=' + (stats ? stats : 'false') +
            '&resolution=' + (resolution ? encodeURIComponent(resolution) : 'days') +
            '&quantity=' + (quantity ? quantity : 30);
        return this.fetchUrl(url, 'GET');
    };

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
    getUserLikedPhotos(username, page, per_page, order_by) {
        if (!username || username === '' || username === undefined) {
            throw new Error('Parameter : username is required and cannot be empty!');
        }
        if (order_by !== undefined && !this.availableOrders.includes(order_by)) {
            throw new Error('Parameter : order_by has an unsupported value!');
        }
        let url = this.API_LOCATION + urlConfig.USERS_LIKED_PHOTOS.replace(/:username/gi, username) +
            '?page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) +
            '&order_by=' + (order_by ? order_by : 'latest');
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to get a list of collections created by the user.
     * @function getUserCollections
     * @memberof UnsplashApi
     * @param {*} username - The username of the user to fetch the portfolio (required).
     * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
     * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
     * @returns {Object} - The JSON data object. 
     */
    getUserCollections(username, page, per_page) {
        if (!username || username === '' || username === undefined) {
            throw new Error('Parameter : username is required and cannot be empty!');
        }
        let url = this.API_LOCATION + urlConfig.USERS_COLLECTIONS.replace(/:username/gi, username) +
            '?page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
        return this.fetchUrl(url, 'GET');
    };

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
    getUserStatistics(username, resolution, quantity) {
        if (!username || username === '' || username === undefined) {
            throw new Error('Parameter : username is required and cannot be empty!');
        }
        let url = this.API_LOCATION + urlConfig.USERS_STATISTICS.replace(/:username/gi, username) +
            '?resolution=' + (resolution ? encodeURIComponent(resolution) : 'days') +
            '&quantity=' + (quantity ? quantity : 30);
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to access the list Photos endpoint of the Unsplash API.
     * @function listPhotos
     * @memberof UnsplashApi
     * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
     * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
     * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest).
     * @returns {Object} - The JSON data object. 
     */
    listPhotos(page, per_page, order_by) {
        if (order_by !== undefined && !this.availableOrders.includes(order_by)) {
            throw new Error('Parameter : order_by has an unsupported value!');
        }
        let url = this.API_LOCATION + urlConfig.LIST_PHOTOS +
            '?page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) +
            '&order_by=' + (order_by ? order_by : 'latest');
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to get a single page from the list of the curated photos.
     * @function listCuratedPhotos
     * @memberof UnsplashApi
     * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
     * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
     * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest).
     * @returns {Object} - The JSON data object. 
     */
    listCuratedPhotos(page, per_page, order_by) {
        if (order_by !== undefined && !this.availableOrders.includes(order_by)) {
            throw new Error('Parameter : order_by has an unsupported value!');
        }
        let url = this.API_LOCATION + urlConfig.LIST_CURATED_PHOTOS +
            '?page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) +
            '&order_by=' + (order_by ? order_by : 'latest');
        return this.fetchUrl(url, 'GET');
    };

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
    getAPhoto(id, width, height, rect) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        let url = this.API_LOCATION + urlConfig.GET_A_PHOTO.replace(/:id/gi, id) +
            '?w=' + (width && !isNaN(width) ? +width : '') +
            '&h=' + (height && !isNaN(height) ? +height : '') +
            '&rect=' + (rect && rect.typeof === 'string' ? +encodeURIComponent(rect) : '');
        return this.fetchUrl(url, 'GET');
    };

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
    getARandomPhoto(collections, featured, username, query, width, height, orientation, count) {
        if (!this.availableOrientations.includes(orientation) && orientation !== undefined) {
            throw new Error('Parameter : orientation has an unsupported value!');
        }
        let url = this.API_LOCATION + urlConfig.GET_A_RANDOM_PHOTO +
            '?collections=' + (collections && !isNaN(collections) ? +encodeURIComponent(collections) : '') +
            '&featured=' + (featured ? featured : false) +
            '&username=' + (username ? username : '') +
            '&query=' + (query ? encodeURIComponent(query) : '') +
            '&width=' + (width ? width : '') +
            '&height=' + (height ? height : '') +
            '&orientation=' + (orientation ? orientation : 'landscape') +
            '&count=' + (count ? count : 1);
        return this.fetchUrl(url, 'GET');
    };

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
    getPhotoStatistics(id, resolution, quantity) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        let url = this.API_LOCATION + urlConfig.GET_A_PHOTO_STATISTICS.replace(/:id/gi, id) +
            '?resolution=' + (resolution ? encodeURIComponent(resolution) : 'days') +
            '&quantity=' + (quantity ? quantity : 30);
        return this.fetchUrl(url, 'GET');
    };

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
    getPhotoLink(id) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        let url = this.API_LOCATION + urlConfig.GET_A_PHOTO_DOWNLOAD_LINK.replace(/:id/gi, id);
        return this.fetchUrl(url, 'GET');
    };

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
    updatePhoto(id, location, exif) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        location = Object.assign({}, location) || {};
        exif = Object.assign({}, exif) || {};
        let url = this.API_LOCATION + urlConfig.UPDATE_A_PHOTO.replace(/:id/, id) + '?' +
            (location.latitude ? '&location[latitude]=' + encodeURIComponent(location.latitude) : '') +
            (location.longitude ? '&location[longitude]=' + encodeURIComponent(location.longitude) : '') +
            (location.name ? '&location[name]=' + encodeURIComponent(location.name) : '') +
            (location.city ? '&location[city]=' + encodeURIComponent(location.city) : '') +
            (location.country ? '&location[country]=' + encodeURIComponent(location.country) : '') +
            (location.confidential ? '&location[confidential]=' + encodeURIComponent(location.confidential) : '') +
            (exif.make ? '&exif[make]=' + encodeURIComponent(exif.make) : '') +
            (exif.model ? '&exif[model]=' + encodeURIComponent(exif.model) : '') +
            (exif.exposure_time ? '&exif[exposure_time]=' + encodeURIComponent(exif.exposure_time) : '') +
            (exif.aperture_value ? '&exif[aperture_value]=' + encodeURIComponent(exif.aperture_value) : '') +
            (exif.focal_length ? '&exif[focal_length]=' + encodeURIComponent(exif.focal_length) : '') +
            (exif.iso_speed_ratings ? '&exif[iso_speed_ratings]=' + encodeURIComponent(exif.iso_speed_ratings) : '');
        return this.fetchUrl(url, 'PUT');
    };

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
    likePhoto(id) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        let url = this.API_LOCATION + urlConfig.LIKE_A_PHOTO.replace(/:id/gi, id);
        return this.fetchUrl(url, 'POST');
    };

    /**
     * Promise factory to remove a user’s like of a photo.
     * This action is idempotent; sending the DELETE request 
     * to a single photo multiple times has no additional effect.
     * @function unlikePhoto
     * @memberof UnsplashApi
     * @param {String} id - The photo’s ID (required).
     * @returns {Object} - The updated photo data object.
     */
    unlikePhoto(id) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        let url = this.API_LOCATION + urlConfig.UNLIKE_A_PHOTO.replace(/:id/gi, id);
        return this.fetchUrl(url, 'DELETE');
    };

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
    search(query, page, per_page, collections, orientation) {
        if (!this.availableOrientations.includes(orientation) && orientation !== undefined) {
            throw new Error('Parameter : orientation has an unsupported value!');
        }
        if (query === undefined) {
            throw new Error('Parameter : query is missing!');
        }
        let url = this.API_LOCATION + urlConfig.SEARCH_PHOTOS +
            '?query=' + (query ? encodeURIComponent(query) : '') +
            '&page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) +
            '&collections=' + (collections && !isNaN(collections) ? +collections : '') +
            '&orientation=' + (orientation ? encodeURIComponent(orientation) : '');
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to get a single page of collection results for a query.
     * @function searchCollections
     * @memberof UnsplashApi
     * @param {String} query - The search query (required).
     * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
     * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
     * @returns {Object} - The JSON data object.
     */
    searchCollections(query, page, per_page) {
        if (query === undefined) {
            throw new Error('Parameter : query is missing!');
        }
        let url = this.API_LOCATION + urlConfig.SEARCH_COLLECTIONS +
            '?query=' + (query ? encodeURIComponent(query) : '') +
            '&page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to get a single page of user results for a query.
     * @function searchUsers
     * @memberof UnsplashApi
     * @param {String} query - The search query (required).
     * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
     * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
     * @returns {Object} - The JSON data object.
     */
    searchUsers(query, page, per_page) {
        if (query === undefined) {
            throw new Error('Parameter : query is missing!');
        }
        let url = this.API_LOCATION + urlConfig.SEARCH_USERS +
            '?query=' + (query ? encodeURIComponent(query) : '') +
            '&page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to get a list of counts for all of Unsplash.
     * @function getStatsTotals
     * @memberof UnsplashApi
     * @returns {Object} - The JSON data object.
     */
    getStatsTotals() {
        let url = this.API_LOCATION + urlConfig.STATS_TOTALS;
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to get the overall Unsplash stats for the past 30 days.
     * @function getStatsMonth
     * @memberof UnsplashApi
     * @returns {Object} - The JSON data object.
     */
    getStatsMonth() {
        let url = this.API_LOCATION + urlConfig.STATS_MONTH;
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to get a single page from the list of all collections.
     * @function listCollections
     * @memberof UnsplashApi
     * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
     * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
     * @returns {Object} - The JSON data object.
     */
    listCollections(page, per_page) {
        let url = this.API_LOCATION + urlConfig.LIST_COLLECTIONS +
            '?page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to get a single page from the list of featured collections.
     * @function listFeaturedCollections
     * @memberof UnsplashApi
     * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
     * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
     * @returns {Object} - The JSON data object.
     */
    listFeaturedCollections(page, per_page) {
        let url = this.API_LOCATION + urlConfig.LIST_FEATURED_COLLECTIONS +
            '?page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to get a single page from the list of curated collections.
     * @function listCuratedCollections
     * @memberof UnsplashApi
     * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
     * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
     * @returns {Object} - The JSON data object.
     */
    listCuratedCollections(page, per_page) {
        let url = this.API_LOCATION + urlConfig.LIST_CURATED_COLLECTIONS +
            '?page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to retrieve a single collection. 
     * To view a user’s private collections, the read_collections scope is required.
     * @function getCollection
     * @memberof UnsplashApi
     * @param {String} id - The Collection ID (required).
     * @returns {Object} - The updated photo data object.
     */
    getCollection(id) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        let url = this.API_LOCATION + urlConfig.GET_COLLECTION.replace(/:id/gi, id);
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to retrieve a single curated collection. 
     * To view a user’s private collections, the read_collections scope is required.
     * @function getCuratedCollection
     * @memberof UnsplashApi
     * @param {String} id - The Collection ID (required).
     * @returns {Object} - The updated photo data object.
     */
    getCuratedCollection(id) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        let url = this.API_LOCATION + urlConfig.GET_CURATED_COLLECTION.replace(/:id/gi, id);
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to retrieve a collection’s photos.
     * @function getCollectionPhotos
     * @memberof UnsplashApi
     * @param {String} id - The Collection ID (required).
     * @param {Number} page - The page number of results to fetch (Optional, defaults to 1). 
     * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
     * @returns {Object} - The updated photo data object.
     */
    getCollectionPhotos(id, page, per_page) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        let url = this.API_LOCATION + urlConfig.GET_COLLECTION_PHOTOS.replace(/:id/gi, id) +
            '?page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to retrieve a curated collection’s photos.
     * @function getCuratedCollectionPhotos
     * @memberof UnsplashApi
     * @param {String} id - The Collection ID (required).
     * @param {Number} page - The page number of results to fetch (Optional, defaults to 1). 
     * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
     * @returns {Object} - The updated photo data object.
     */
    getCuratedCollectionPhotos(id, page, per_page) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        let url = this.API_LOCATION + urlConfig.GET_CURATED_COLLECTION_PHOTOS.replace(/:id/gi, id) +
            '?page=' + (page && !isNaN(page) ? +page : 1) +
            '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10);
        return this.fetchUrl(url, 'GET');
    };

    /**
     * Promise factory to retrieve a list of collections related to a particular one.
     * @function listRelatedCollections
     * @memberof UnsplashApi
     * @param {String} id - The Collection ID (required).
     * @returns {Object} - The updated photo data object.
     */
    listRelatedCollections(id) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        let url = this.API_LOCATION + urlConfig.LIST_RELATED_COLLECTION.replace(/:id/gi, id);
        return this.fetchUrl(url, 'GET');
    };

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
    createNewColection(title, description, private_collection) {
        if (!title || title === undefined || title.length === 0) {
            throw new Error('Parameter : title is required!');
        }
        private_collection = private_collection || false;
        let url = this.API_LOCATION + urlConfig.CREATE_NEW_COLLECTION +
            '?title=' + encodeURIComponent(title) +
            (description ? '&description=' + encodeURIComponent(description) : '') +
            '&private=' + private_collection;
        return this.fetchUrl(url, 'POST');
    };

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
    updateExistingCollection(id, title, description, private_collection) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        if (!title || title === undefined || title.length === 0) {
            throw new Error('Parameter : title is required!');
        }
        private_collection = private_collection || false;
        let url = this.API_LOCATION + urlConfig.UPDATE_EXISTING_COLLECTION.replace(/:id/gi, id) +
            '?title=' + encodeURIComponent(title) +
            (description ? '&description=' + encodeURIComponent(description) : '') +
            '&private=' + private_collection;
        return this.fetchUrl(url, 'PUT');
    };

    /**
     * Promise factory to delete a collection belonging to the logged-in user. 
     * This requires the write_collections scope.
     * @function deleteCollection
     * @memberof UnsplashApi
     * @param {String} id - The Collection ID (Required).
     * @returns {Object} - The updated photo data object.
     */
    deleteCollection(id) {
        if (!id || id === undefined || id.length === 0) {
            throw new Error('Parameter : id is required!');
        }
        let url = this.API_LOCATION + urlConfig.DELETE_COLLECTION.replace(/:id/gi, id);
        return this.fetchUrl(url, 'DELETE');
    };

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
    addPhotoToCollection(collection_id, photo_id) {
        if (!collection_id || collection_id === undefined || collection_id.length === 0) {
            throw new Error('Parameter : collection_id is required!');
        }
        if (!photo_id || photo_id === undefined || photo_id.length === 0) {
            throw new Error('Parameter : photo_id is required!');
        }
        let url = this.API_LOCATION + urlConfig.ADD_PHOTO_TO_COLLECTION.replace(/:collection_id/gi, collection_id) +
            '?photo_id=' + photo_id;
        return this.fetchUrl(url, 'POST');
    };

    /**
     * Promise factory to remove a photo from one of the logged-in user’s collections. 
     * Requires the write_collections scope.
     * @function removePhotoFromCollection
     * @memberof UnsplashApi
     * @param {String} collection_id - The collection’s ID (Required).
     * @param {String} photo_id - The photo’s ID (Required).
     * @returns {Object} - The updated photo data object.
     */
    removePhotoFromCollection(collection_id, photo_id) {
        if (!collection_id || collection_id === undefined || collection_id.length === 0) {
            throw new Error('Parameter : collection_id is required!');
        }
        if (!photo_id || photo_id === undefined || photo_id.length === 0) {
            throw new Error('Parameter : photo_id is required!');
        }
        let url = this.API_LOCATION + urlConfig.REMOVE_PHOTO_FROM_COLLECTION.replace(/:collection_id/gi, collection_id) +
            '?photo_id=' + photo_id;
        return this.fetchUrl(url, 'DELETE');
    };
}

module.exports = WrapSplashApi;