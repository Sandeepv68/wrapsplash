/**
 * Wrapsplash API wrapper v1.0.5 for Unspalsh API
 * written by: Sandeep Vattapparambil
 * email: sandeepv68@gmail.com
 * website: www.sandeepv.in
 * github: github.com/SandeepVattapparambil
 * license: MIT
 */

//dependency
let fetch = require('node-fetch');

//set API url
let LOCATION = 'https://api.unsplash.com/';

//define api signatures
let SCHEMA = {
    USER_PUBLIC_PROFILE: 'users/',
    USER_PORTFOLIO: 'users/:username/portfolio',

    LIST_PHOTOS: 'photos',

    SEARCH_PHOTOS: 'search/photos'
};

/**
 * Unsplash api wrapper bootstrap - exposing the promise factories to access the Unsplash API endpoints.
 * @param {String} apiKey - The API key generated from Unsplash developer account. (required)
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

/**
 * Helper function to check whether an item belongs to an Array.
 * @param {*} item - The item to be checked
 */
Array.prototype.contains = function (item) {
    return this.indexOf(item) > -1;
};

/**
 * Promise factory to retrieve public details on a given user.
 * @param {*} username - The username of the particular user (required). 
 * @param {Number} width - The width of the profile image to be fetched (Optional).
 * @param {Number} height - The height of the profile image to be fetched (Optional).
 *                          Will be included in the "profile_image" object as "custom". 
 */
UnsplashApi.prototype.getPublicProfile = function (username, width, height) {
    let self = this;
    let url = LOCATION + SCHEMA.USER_PUBLIC_PROFILE + username +
        '?w=' + (width && !isNaN(width) ? +width : '') +
        '&h=' + (height && !isNaN(height) ? +height : '');
    return fetch(url, {
        headers: self.headers
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

/**
 * Promise factory to retrieve a single user’s portfolio link.
 * @param {*} username - The username of the user to fetch the portfolio (required).
 */
UnsplashApi.prototype.getUserPortfolio = function (username) {
    let self = this;
    if(!username || username === '' || username == undefined){
        throw new Error("Parameter : username is required and cannot be empty!");
    }
    let url = LOCATION + SCHEMA.USER_PORTFOLIO.replace(/:username/gi, username);
    return fetch(url, {
        headers: self.headers
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return Promise.reject(err);
    });
}

/**
 * Promise factory to access the list Photos endpoint of the Unsplash API
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest)
 */
UnsplashApi.prototype.listPhotos = function (page, per_page, order_by) {
    let self = this;
    let availableOrders = ['latest', 'oldest', 'popular'];
    if (order_by !== undefined && !availableOrders.contains(order_by)) {
        throw new Error("Parameter : order_by has an unsupported value!");
    }
    let url = LOCATION + SCHEMA.LIST_PHOTOS +
        "?page=" + (page && !isNaN(page) ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10) +
        "&order_by=" + order_by;
    return fetch(url, {
        headers: self.headers
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return Promise.reject(err);
    });
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
    let availableOrientations = ['landscape', 'portrait', 'squarish'];
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
    return fetch(url, {
        headers: self.headers
    }).then(function (res) {
        return res.json();
    }).catch(function (err) {
        return Promise.reject(err);
    });
};
module.exports = UnsplashApi;