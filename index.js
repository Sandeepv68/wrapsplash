/**
 * Wrapsplash API wrapper v1.0.8 for Unspalsh API
 * written by: Sandeep Vattapparambil
 * email: sandeepv68@gmail.com
 * website: www.sandeepv.in
 * github: github.com/SandeepVattapparambil
 * license: MIT
 */

//Dependency
let fetch = require('node-fetch');

//Set API url
let LOCATION = 'https://api.unsplash.com/';

//Define api signatures [WIP]
let SCHEMA = {
    USERS_PUBLIC_PROFILE: 'users/',
    USERS_PORTFOLIO: 'users/:username/portfolio',
    USERS_PHOTOS: 'users/:username/photos',
    USERS_LIKED_PHOTOS: 'users/:username/likes',
    USERS_COLLECTIONS: 'users/:username/collections',
    USERS_STATISTICS: 'users/:username/statistics',

    LIST_PHOTOS: 'photos',

    SEARCH_PHOTOS: 'search/photos'
};

/**
 * Unsplash api wrapper bootstrap - exposing the promise factories to access the Unsplash API endpoints.
 * @param {String} apiKey - The API key generated from Unsplash developer account (required).
 */
let UnsplashApi = function (apiKey) {
    if (apiKey) {
        let self = this;
        self.apiKey = apiKey;
        self.headers = {
            'Content-type': 'application/json',
            'Authorization': 'Client-ID ' + self.apiKey
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
 * @param {*} item - The item to be checked (required).
 */
Array.prototype.contains = function (item) {
    return this.indexOf(item) > -1;
};

/**
 * Heler function to fetch a given url
 * @param {Object} self - The 'this' object holding the context of the 'UnsplashApi' object (required).
 * @param {Sting} url - The url to be fetched (required).
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
 * @param {*} username - The username of the particular user (required). 
 * @param {Number} width - The width of the profile image to be fetched (Optional).
 * @param {Number} height - The height of the profile image to be fetched (Optional).
 *                          Will be included in the "profile_image" object as "custom". 
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
 * @param {*} username - The username of the user to fetch the portfolio (required).
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
 * @param {*} username - The username of the user to fetch the portfolio (required).
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @param {Booelan} stats - Show the stats for each user’s photo (Optional; default: false).
 * @param {String} resolution - The frequency of the stats (Optional; default: 'days').
 * @param {Number} quantity - The amount of for each stat (Optional; default: 30).
 * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest)
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
 * @param {*} username - The username of the user to fetch the portfolio (required).
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest)
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
 * @param {*} username - The username of the user to fetch the portfolio (required).
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
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
 * @param {*} username - The username of the user to fetch the portfolio (required).
 * @param {String} resolution - The frequency of the stats (Optional; default: 'days').
 * @param {Number} quantity - The amount of for each stat (Optional; default: 30).
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
 * Promise factory to access the list Photos endpoint of the Unsplash API
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest)
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
 * Promise factory to access the Search Photos endpoint of the Unsplash API
 * @param {String} query - The search query (required).
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @param {Number} collections - The collection ID(‘s) to narrow the search. If multiple, comma-separated (Optional).
 * @param {String} orientation - Filter search results by photo orientation (Optional, Valid values are landscape, portrait, and squarish, defaults to: landscape)
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
module.exports = UnsplashApi;