/**
 * Wrapsplash API wrapper v1.0.10 for Unspalsh API
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

//Define api signatures [WIP]
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
    SEARCH_USERS: 'search/users'
};

/**
 * Unsplash api wrapper bootstrap - exposing the promise factories to access the Unsplash API endpoints.
 * @namespace UnsplashApi
 * @param {String} apiKey - The API key generated from Unsplash developer account (required).
 */
let UnsplashApi = function (apiKey) {
    if (apiKey) {
        let self = this;
        self.apiKey = apiKey;
        let hash = crypto.createHmac('sha256', apiKey).digest('hex');;
        self.headers = {
            'Content-type': 'application/json',
            'Authorization': 'Client-ID ' + self.apiKey,
            'X-WrapSplash-Header': hash
        };
    } else {
        throw new Error("API Key missing");
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
 * @param {Sting} url - The url to be fetched (required).
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
 * Note: You can’t use the collections and query parameters in the same request
 *       When supplying a count parameter - and only then - the response will be an array of photos, even if the value of count is 1
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
module.exports = UnsplashApi;