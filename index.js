/**
 * Wrapsplash API wrapper v2.0.0 for Unspalsh API
 * written by: Sandeep Vattapparambil
 * email: sandeepv68@gmail.com
 * website: www.sandeepv.in
 * github: github.com/SandeepVattapparambil
 * license: MIT
 */

//Dependency
const fetch = require('node-fetch');
const crypto = require('crypto');

//Set API url
const LOCATION = 'https://api.unsplash.com/';
//Bearer Token url
const BEARER_TOKEN_URL = 'https://unsplash.com/oauth/token';

//Define api signatures
let SCHEMA = {
    USERS_PUBLIC_PROFILE: 'users/',
    USERS_PORTFOLIO: 'users/:username/portfolio',
    USERS_PHOTOS: 'users/:username/photos',
    USERS_LIKED_PHOTOS: 'users/:username/likes',
    USERS_COLLECTIONS: 'users/:username/collections',
    USERS_STATISTICS: 'users/:username/statistics',

    LIST_PHOTOS: 'photos',
    LIST_CURATED_PHOTOS: 'photos/curated',
    GET_A_PHOTO: 'photos/:id',
    GET_A_RANDOM_PHOTO: 'photos/random',
    GET_A_PHOTO_STATISTICS: 'photos/:id/statistics',
    GET_A_PHOTO_DOWNLOAD_LINK: 'photos/:id/download',
    UPDATE_A_PHOTO: 'photos/:id',
    LIKE_A_PHOTO: 'photos/:id/like',
    UNLIKE_A_PHOTO: 'photos/:id/like',

    SEARCH_PHOTOS: 'search/photos',
    SEARCH_COLLECTIONS: 'search/collections',
    SEARCH_USERS: 'search/users',

    CURRENT_USER_PROFILE: 'me',
    UPDATE_CURRENT_USER_PROFILE: 'me',

    STATS_TOTALS: 'stats/total',
    STATS_MONTH: 'stats/month',

    LIST_COLLECTIONS: 'collections',
    LIST_FEATURED_COLLECTIONS: 'collections/featured',
    LIST_CURATED_COLLECTIONS: 'collections/curated',
    GET_COLLECTION: 'collections/:id',
    GET_CURATED_COLLECTION: 'collections/curated/:id',
    GET_COLLECTION_PHOTOS: 'collections/:id/photos',
    GET_CURATED_COLLECTION_PHOTOS: 'collections/curated/:id/photos',
    LIST_RELATED_COLLECTION: 'collections/:id/related',
    CREATE_NEW_COLLECTION: 'collections',
    UPDATE_EXISTING_COLLECTION: 'collections/:id',
    DELETE_COLLECTION: 'collections/:id',
    ADD_PHOTO_TO_COLLECTION: 'collections/:collection_id/add',
    REMOVE_PHOTO_FROM_COLLECTION: 'collections/:collection_id/remove'
};

/**
 * Unsplash api wrapper bootstrap - exposing the promise factories to access the Unsplash API endpoints.
 * @namespace UnsplashApi
 * @param {Object} options - The options object containing Unsplash developer account details (required).
 */
let UnsplashApi = function (options) {
    if (options) {
        let self = this;
        options = Object.assign({}, options);
        self.access_key = (options.access_key ? options.access_key : (function () {
            throw new Error('Access Key missing!')
        }()));
        self.secret_key = (options.secret_key ? options.secret_key : (function () {
            throw new Error('Secret Key missing!')
        }()));
        self.redirect_uri = (options.redirect_uri ? options.redirect_uri : (function () {
            throw new Error('Redirect URI missing!')
        }()));
        self.code = (options.code ? options.code : (function () {
            throw new Error('Authorization Code missing!')
        }()));
        self.grant_type = "authorization_code";
        let hash = crypto.createHmac('sha256', self.access_key).digest('hex');
        if (options.bearer_token) {
            self.bearer_token = options.bearer_token;
        }
        self.headers = {
            'Content-type': 'application/json',
            'Authorization': (self.bearer_token ? 'Bearer ' + self.bearer_token : 'Client-ID ' + self.access_key),
            'X-WrapSplash-Header': hash
        }
        console.log(self.headers);
    } else {
        throw new Error("Initilisation parameters missing!");
    }
};

//Set available order_by options
let availableOrders = ['latest', 'oldest', 'popular'];
//Sset available orientation options
let availableOrientations = ['landscape', 'portrait', 'squarish'];

/**
 * Helper function to check whether an item belongs to an Array.
 * @function contains
 * @param {*} item - The item to be checked (required).
 * @returns {Number} - An integer representing the presence or absence of an item.
 */
Array.prototype.contains = function (item) {
    return this.indexOf(item) > -1;
};

/**
 * Heler function to fetch a given url
 * @function fetchUrl
 * @param {Object} self - The 'this' object holding the context of the 'UnsplashApi' object (required).
 * @param {String} url - The url to be fetched (required).
 * @returns {Object} - The JSON data object.
 */
let fetchUrl = function (self, url) {
    let iSelf = self;
    return fetch(url, {
        headers: iSelf.headers
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

/**
 * Helper function to POST data to a given url and return the response.
 * @function postUrl
 * @param {String} url - The url to which the data has to be POSTed (required).
 * @returns {Object} - The JSON data object.
 */
let postUrl = function (self, url) {
    let iSelf = self || '';
    return fetch(url, {
        method: 'POST',
        headers: (iSelf.headers ? iSelf.headers : '')
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

/**
 * Helper function to PUT data to a given url and return the response.
 * @function putUrl
 * @param {String} url - The url to which the data has to be PUT (required).
 * @returns {Object} - The JSON data object.
 */
let putUrl = function (self, url) {
    let iSelf = self || '';
    return fetch(url, {
        method: 'PUT',
        headers: (iSelf.headers ? iSelf.headers : '')
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

/**
 * Helper function to DELETE data from a given url and return the response.
 * @function deleteUrl
 * @param {String} url - The url to which the data has to be DELETE (required).
 * @returns {Object} - The JSON data object.
 */
let deleteUrl = function (self, url) {
    let iSelf = self || '';
    return fetch(url, {
        method: 'DELETE',
        headers: (iSelf.headers ? iSelf.headers : '')
    }).then(function (res) {
        if (res.status == 204) {
            let response = {
                status: res.status,
                statusText: res.statusText
            }
            return response;
        }
        return res.json();
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

/**
 * Promise factory to generate a Bearer Token for write_access to private data.
 * The Unsplash API uses OAuth2 to authenticate and authorize Unsplash users. 
 * Unsplash’s OAuth2 paths live at https://unsplash.com/oauth/.
 * @function generateBearerToken
 * @memberof UnsplashApi
 * @returns {Object} - The user's Access Token JSON data object.
 */
UnsplashApi.prototype.generateBearerToken = function () {
    let self = this;
    let url = BEARER_TOKEN_URL +
        "?client_id=" + (self.access_key) +
        "&client_secret=" + (self.secret_key) +
        "&redirect_uri=" + (self.redirect_uri) +
        "&code=" + (self.code) +
        "&grant_type=" + (self.grant_type);
    return postUrl(self, url);
}

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
UnsplashApi.prototype.getCurrentUserProfile = function () {
    let self = this;
    let url = LOCATION + SCHEMA.CURRENT_USER_PROFILE;
    return fetchUrl(self, url);
}

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
UnsplashApi.prototype.updateCurrentUserProfile = function (username, first_name, last_name, email, url, location, bio, instagram_username) {
    let self = this;
    let _url = LOCATION + SCHEMA.UPDATE_CURRENT_USER_PROFILE + '?' +
        (username ? '?username=' + username : '') +
        (first_name ? '&first_name=' + first_name : '') +
        (last_name ? '&last_name=' + last_name : '') +
        (email ? '&email=' + email : '') +
        (url ? '&url=' + url : '') +
        (location ? '&location=' + location : '') +
        (bio ? '&bio=' + bio : '') +
        (instagram_username ? '&instagram_username=' + instagram_username : '');
    return putUrl(self, _url);
}

/**
 * Promise factory to retrieve public details on a given user.
 * @function getPublicProfile
 * @memberof UnsplashApi
 * @param {*} username - The username of the particular user (required). 
 * @param {Number} width - The width of the profile image to be fetched (Optional).
 * @param {Number} height - The height of the profile image to be fetched (Optional).
 *                          Will be included in the "profile_image" object as "custom". 
 * @returns {Object} - The JSON data object. 
 */
UnsplashApi.prototype.getPublicProfile = function (username, width, height) {
    let self = this;
    let url = LOCATION + SCHEMA.USERS_PUBLIC_PROFILE + username +
        '?w=' + (width && !isNaN(width) ? +width : '') +
        '&h=' + (height && !isNaN(height) ? +height : '');
    return fetchUrl(self, url);
}

/**
 * Promise factory to retrieve a single user’s portfolio link.
 * @function getUserPortfolio
 * @memberof UnsplashApi
 * @param {*} username - The username of the user to fetch the portfolio (required).
 * @returns {Object} - The JSON data object. 
 */
UnsplashApi.prototype.getUserPortfolio = function (username) {
    let self = this;
    if (!username || username === '' || username == undefined) {
        throw new Error("Parameter : username is required and cannot be empty!");
    }
    let url = LOCATION + SCHEMA.USERS_PORTFOLIO.replace(/:username/gi, username);
    return fetchUrl(self, url);
}

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
UnsplashApi.prototype.getUserPhotos = function (username, page, per_page, stats, resolution, quantity, order_by) {
    let self = this;
    if (!username || username === '' || username == undefined) {
        throw new Error("Parameter : username is required and cannot be empty!");
    }
    if (order_by !== undefined && !availableOrders.contains(order_by)) {
        throw new Error("Parameter : order_by has an unsupported value!");
    }
    if (stats !== undefined && typeof (stats) !== 'boolean') {
        throw new Error("Parameter : stats is a boolean or optional!");
    }
    let url = LOCATION + SCHEMA.USERS_PHOTOS.replace(/:username/gi, username) +
        "?page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10) +
        "&order_by=" + (order_by ? order_by : 'latest') +
        "&stats=" + (stats ? stats : 'false') +
        "&resolution=" + (resolution ? encodeURIComponent(resolution) : 'days') +
        "&quantity=" + (quantity ? quantity : 30);
    return fetchUrl(self, url);
}

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
UnsplashApi.prototype.getUserLikedPhotos = function (username, page, per_page, order_by) {
    let self = this;
    if (!username || username === '' || username == undefined) {
        throw new Error("Parameter : username is required and cannot be empty!");
    }
    if (order_by !== undefined && !availableOrders.contains(order_by)) {
        throw new Error("Parameter : order_by has an unsupported value!");
    }
    let url = LOCATION + SCHEMA.USERS_LIKED_PHOTOS.replace(/:username/gi, username) +
        "?page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10) +
        "&order_by=" + (order_by ? order_by : 'latest');
    return fetchUrl(self, url);
}

/**
 * Promise factory to get a list of collections created by the user.
 * @function getUserCollections
 * @memberof UnsplashApi
 * @param {*} username - The username of the user to fetch the portfolio (required).
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @returns {Object} - The JSON data object. 
 */
UnsplashApi.prototype.getUserCollections = function (username, page, per_page) {
    let self = this;
    if (!username || username === '' || username == undefined) {
        throw new Error("Parameter : username is required and cannot be empty!");
    }
    let url = LOCATION + SCHEMA.USERS_COLLECTIONS.replace(/:username/gi, username) +
        "?page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10);
    return fetchUrl(self, url);
}

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
UnsplashApi.prototype.getUserStatistics = function (username, resolution, quantity) {
    let self = this;
    if (!username || username === '' || username == undefined) {
        throw new Error("Parameter : username is required and cannot be empty!");
    }
    let url = LOCATION + SCHEMA.USERS_STATISTICS.replace(/:username/gi, username) +
        "?resolution=" + (resolution ? encodeURIComponent(resolution) : 'days') +
        "&quantity=" + (quantity ? quantity : 30);
    return fetchUrl(self, url);
}

/**
 * Promise factory to access the list Photos endpoint of the Unsplash API.
 * @function listPhotos
 * @memberof UnsplashApi
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest).
 * @returns {Object} - The JSON data object. 
 */
UnsplashApi.prototype.listPhotos = function (page, per_page, order_by) {
    let self = this;
    if (order_by !== undefined && !availableOrders.contains(order_by)) {
        throw new Error("Parameter : order_by has an unsupported value!");
    }
    let url = LOCATION + SCHEMA.LIST_PHOTOS +
        "?page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10) +
        "&order_by=" + (order_by ? order_by : 'latest');
    return fetchUrl(self, url);
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
UnsplashApi.prototype.listCuratedPhotos = function (page, per_page, order_by) {
    let self = this;
    if (order_by !== undefined && !availableOrders.contains(order_by)) {
        throw new Error("Parameter : order_by has an unsupported value!");
    }
    let url = LOCATION + SCHEMA.LIST_CURATED_PHOTOS +
        "?page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10) +
        "&order_by=" + (order_by ? order_by : 'latest');
    return fetchUrl(self, url);
}

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
UnsplashApi.prototype.getAPhoto = function (id, width, height, rect) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    let url = LOCATION + SCHEMA.GET_A_PHOTO.replace(/:id/gi, id) +
        '?w=' + (width && !isNaN(width) ? +width : '') +
        '&h=' + (height && !isNaN(height) ? +height : '') +
        '&rect=' + (rect && rect.typeof === 'string' ? +encodeURIComponent(rect) : '');
    return fetchUrl(self, url);
}

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
UnsplashApi.prototype.getARandomPhoto = function (collections, featured, username, query, width, height, orientation, count) {
    let self = this;
    if (!availableOrientations.contains(orientation) && orientation !== undefined) {
        throw new Error("Parameter : orientation has an unsupported value!")
    }
    let url = LOCATION + SCHEMA.GET_A_RANDOM_PHOTO +
        '?collections=' + (collections && !isNaN(collections) ? +encodeURIComponent(collections) : '') +
        '&featured=' + (featured ? featured : false) +
        '&username=' + (username ? username : '') +
        '&query=' + (query ? encodeURIComponent(query) : '') +
        '&width=' + (width ? width : '') +
        '&height=' + (height ? height : '') +
        '&orientation=' + (orientation ? orientation : 'landscape') +
        '&count=' + (count ? count : 1);
    return fetchUrl(self, url);
}

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
UnsplashApi.prototype.getPhotoStatistics = function (id, resolution, quantity) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    let url = LOCATION + SCHEMA.GET_A_PHOTO_STATISTICS.replace(/:id/gi, id) +
        "?resolution=" + (resolution ? encodeURIComponent(resolution) : 'days') +
        "&quantity=" + (quantity ? quantity : 30);
    return fetchUrl(self, url);
}

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
UnsplashApi.prototype.getPhotoLink = function (id) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    let url = LOCATION + SCHEMA.GET_A_PHOTO_DOWNLOAD_LINK.replace(/:id/gi, id);
    return fetchUrl(self, url);
}

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
UnsplashApi.prototype.updatePhoto = function (id, location, exif) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    location = Object.assign({}, location) || {};
    exif = Object.assign({}, exif) || {};
    let url = LOCATION + SCHEMA.UPDATE_A_PHOTO.replace(/:id/, id) + '?' +
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
    return putUrl(self, url);
}

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
UnsplashApi.prototype.likePhoto = function (id) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    let url = LOCATION + SCHEMA.LIKE_A_PHOTO.replace(/:id/gi, id);
    return postUrl(self, url);
}

/**
 * Promise factory to remove a user’s like of a photo.
 * This action is idempotent; sending the DELETE request 
 * to a single photo multiple times has no additional effect.
 * @function unlikePhoto
 * @memberof UnsplashApi
 * @param {String} id - The photo’s ID (required).
 * @returns {Object} - The updated photo data object.
 */
UnsplashApi.prototype.unlikePhoto = function (id) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    let url = LOCATION + SCHEMA.UNLIKE_A_PHOTO.replace(/:id/gi, id);
    return deleteUrl(self, url);
}

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
UnsplashApi.prototype.search = function (query, page, per_page, collections, orientation) {
    let self = this;
    if (!availableOrientations.contains(orientation) && orientation !== undefined) {
        throw new Error("Parameter : orientation has an unsupported value!")
    }
    if (query === undefined) {
        throw new Error("Parameter : query is missing!");
    }
    let url = LOCATION + SCHEMA.SEARCH_PHOTOS +
        "?query=" + (query ? encodeURIComponent(query) : '') +
        "&page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10) +
        "&collections=" + (collections && !isNaN(collections) ? +collections : '') +
        "&orientation=" + (orientation ? encodeURIComponent(orientation) : '');
    return fetchUrl(self, url);
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
UnsplashApi.prototype.searchCollections = function (query, page, per_page) {
    let self = this;
    if (query === undefined) {
        throw new Error("Parameter : query is missing!");
    }
    let url = LOCATION + SCHEMA.SEARCH_COLLECTIONS +
        "?query=" + (query ? encodeURIComponent(query) : '') +
        "&page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10);
    return fetchUrl(self, url);
}

/**
 * Promise factory to get a single page of user results for a query.
 * @function searchUsers
 * @memberof UnsplashApi
 * @param {String} query - The search query (required).
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @returns {Object} - The JSON data object.
 */
UnsplashApi.prototype.searchUsers = function (query, page, per_page) {
    let self = this;
    if (query === undefined) {
        throw new Error("Parameter : query is missing!");
    }
    let url = LOCATION + SCHEMA.SEARCH_USERS +
        "?query=" + (query ? encodeURIComponent(query) : '') +
        "&page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10);
    return fetchUrl(self, url);
}

/**
 * Promise factory to get a list of counts for all of Unsplash.
 * @function getStatsTotals
 * @memberof UnsplashApi
 * @returns {Object} - The JSON data object.
 */
UnsplashApi.prototype.getStatsTotals = function () {
    let self = this;
    let url = LOCATION + SCHEMA.STATS_TOTALS;
    return fetchUrl(self, url);
}

/**
 * Promise factory to get the overall Unsplash stats for the past 30 days.
 * @function getStatsMonth
 * @memberof UnsplashApi
 * @returns {Object} - The JSON data object.
 */
UnsplashApi.prototype.getStatsMonth = function () {
    let self = this;
    let url = LOCATION + SCHEMA.STATS_MONTH;
    return fetchUrl(self, url);
}

/**
 * Promise factory to get a single page from the list of all collections.
 * @function listCollections
 * @memberof UnsplashApi
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @returns {Object} - The JSON data object.
 */
UnsplashApi.prototype.listCollections = function (page, per_page) {
    let self = this;
    let url = LOCATION + SCHEMA.LIST_COLLECTIONS +
        "?page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10);
    return fetchUrl(self, url);
}

/**
 * Promise factory to get a single page from the list of featured collections.
 * @function listFeaturedCollections
 * @memberof UnsplashApi
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @returns {Object} - The JSON data object.
 */
UnsplashApi.prototype.listFeaturedCollections = function (page, per_page) {
    let self = this;
    let url = LOCATION + SCHEMA.LIST_FEATURED_COLLECTIONS +
        "?page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10);
    return fetchUrl(self, url);
}

/**
 * Promise factory to get a single page from the list of curated collections.
 * @function listCuratedCollections
 * @memberof UnsplashApi
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @returns {Object} - The JSON data object.
 */
UnsplashApi.prototype.listCuratedCollections = function (page, per_page) {
    let self = this;
    let url = LOCATION + SCHEMA.LIST_CURATED_COLLECTIONS +
        "?page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10);
    return fetchUrl(self, url);
}

/**
 * Promise factory to retrieve a single collection. 
 * To view a user’s private collections, the read_collections scope is required.
 * @function getCollection
 * @memberof UnsplashApi
 * @param {String} id - The Collection ID (required).
 * @returns {Object} - The updated photo data object.
 */
UnsplashApi.prototype.getCollection = function (id) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    let url = LOCATION + SCHEMA.GET_COLLECTION.replace(/:id/gi, id);
    return fetchUrl(self, url);
}

/**
 * Promise factory to retrieve a single curated collection. 
 * To view a user’s private collections, the read_collections scope is required.
 * @function getCuratedCollection
 * @memberof UnsplashApi
 * @param {String} id - The Collection ID (required).
 * @returns {Object} - The updated photo data object.
 */
UnsplashApi.prototype.getCuratedCollection = function (id) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    let url = LOCATION + SCHEMA.GET_CURATED_COLLECTION.replace(/:id/gi, id);
    return fetchUrl(self, url);
}

/**
 * Promise factory to retrieve a collection’s photos.
 * @function getCollectionPhotos
 * @memberof UnsplashApi
 * @param {String} id - The Collection ID (required).
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1). 
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @returns {Object} - The updated photo data object.
 */
UnsplashApi.prototype.getCollectionPhotos = function (id, page, per_page) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    let url = LOCATION + SCHEMA.GET_COLLECTION_PHOTOS.replace(/:id/gi, id) +
        "?page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10);
    return fetchUrl(self, url);
}

/**
 * Promise factory to retrieve a curated collection’s photos.
 * @function getCuratedCollectionPhotos
 * @memberof UnsplashApi
 * @param {String} id - The Collection ID (required).
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1). 
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @returns {Object} - The updated photo data object.
 */
UnsplashApi.prototype.getCuratedCollectionPhotos = function (id, page, per_page) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    let url = LOCATION + SCHEMA.GET_CURATED_COLLECTION_PHOTOS.replace(/:id/gi, id) +
        "?page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10);
    return fetchUrl(self, url);
}

/**
 * Promise factory to retrieve a list of collections related to a particular one.
 * @function listRelatedCollections
 * @memberof UnsplashApi
 * @param {String} id - The Collection ID (required).
 * @returns {Object} - The updated photo data object.
 */
UnsplashApi.prototype.listRelatedCollections = function (id) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    let url = LOCATION + SCHEMA.LIST_RELATED_COLLECTION.replace(/:id/gi, id);
    return fetchUrl(self, url);
}

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
UnsplashApi.prototype.createNewColection = function (title, description, private) {
    let self = this;
    if (!title || title === undefined || title.length === 0) {
        throw new Error("Parameter : title is required!");
    }
    private = private || false;
    let url = LOCATION + SCHEMA.CREATE_NEW_COLLECTION +
        '?title=' + encodeURIComponent(title) +
        (description ? '&description=' + encodeURIComponent(description) : '') +
        '&private=' + private;
    return postUrl(self, url);
}

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
UnsplashApi.prototype.updateExistingCollection = function (id, title, description, private) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    if (!title || title === undefined || title.length === 0) {
        throw new Error("Parameter : title is required!");
    }
    private = private || false;
    let url = LOCATION + SCHEMA.UPDATE_EXISTING_COLLECTION.replace(/:id/gi, id) +
        '?title=' + encodeURIComponent(title) +
        (description ? '&description=' + encodeURIComponent(description) : '') +
        '&private=' + private;
    return putUrl(self, url);
}

/**
 * Promise factory to delete a collection belonging to the logged-in user. 
 * This requires the write_collections scope.
 * @function deleteCollection
 * @memberof UnsplashApi
 * @param {String} id - The Collection ID (Required).
 * @returns {Object} - The updated photo data object.
 */
UnsplashApi.prototype.deleteCollection = function (id) {
    let self = this;
    if (!id || id === undefined || id.length === 0) {
        throw new Error("Parameter : id is required!");
    }
    let url = LOCATION + SCHEMA.DELETE_COLLECTION.replace(/:id/gi, id);
    return deleteUrl(self, url);
}

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
UnsplashApi.prototype.addPhotoToCollection = function (collection_id, photo_id) {
    let self = this;
    if (!collection_id || collection_id === undefined || collection_id.length === 0) {
        throw new Error("Parameter : collection_id is required!");
    }
    if (!photo_id || photo_id === undefined || photo_id.length === 0) {
        throw new Error("Parameter : photo_id is required!");
    }
    let url = LOCATION + SCHEMA.ADD_PHOTO_TO_COLLECTION.replace(/:collection_id/gi, collection_id) +
        '?photo_id=' + photo_id;
    return postUrl(self, url);
}

/**
 * Promise factory to remove a photo from one of the logged-in user’s collections. 
 * Requires the write_collections scope.
 * @function removePhotoFromCollection
 * @memberof UnsplashApi
 * @param {String} collection_id - The collection’s ID (Required).
 * @param {String} photo_id - The photo’s ID (Required).
 * @returns {Object} - The updated photo data object.
 */
UnsplashApi.prototype.removePhotoFromCollection = function (collection_id, photo_id) {
    let self = this;
    if (!collection_id || collection_id === undefined || collection_id.length === 0) {
        throw new Error("Parameter : collection_id is required!");
    }
    if (!photo_id || photo_id === undefined || photo_id.length === 0) {
        throw new Error("Parameter : photo_id is required!");
    }
    let url = LOCATION + SCHEMA.REMOVE_PHOTO_FROM_COLLECTION.replace(/:collection_id/gi, collection_id) +
        '?photo_id=' + photo_id;
    return deleteUrl(self, url);
}

module.exports = UnsplashApi;