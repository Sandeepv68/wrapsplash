let fetch = require('node-fetch');

let LOCATION = 'https://api.unsplash.com/';

let SCHEMA = {
    LIST_PHOTOS: 'photos',
    SEARCH_PHOTOS: 'search/photos'
};

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

Array.prototype.contains = function (item) {
    return this.indexOf(item) > -1;
};

UnsplashApi.prototype.listPhotos = function (page, per_page, order_by) {
    let self = this;
    let availableOrders = ['latest', 'oldest', 'popular']; 
    if(order_by !== undefined && !availableOrders.contains(order_by)){
        throw new Error("Parameter : order_by has an unsupported value!");
    }
    let url = LOCATION + SCHEMA.LIST_PHOTOS +
        "?page=" + (page ? +page : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? +per_page : 10) +
        "&order_by=" + order_by;
    return fetch(url, {
            headers: self.headers
        })
        .then(function (res) {
            return res.json();
        }).catch(function (err) {
            return Promise.reject(err);
        });
};

module.exports = UnsplashApi;