let fetch = require('node-fetch');

let LOCATION = 'https://api.unsplash.com/';

let SCHEMA = {
    LIST_PHOTOS: LOCATION + 'photos',
    SEARCH_PHOTOS: LOCATION + 'search/photos'
};

const UnsplashApi = (apiKey) => {
    if (apiKey) {
        let self = this;
        self.apiKey = apiKey;
        self.headers = {
            'Authorization': apiKey
        }
    } else {
        throw new Error("API Key missing");
    }
};

Array.prototype.contains = (item) => {
    return this.indexOf(item) > -1;
};

UnsplashApi.prototype.listPhotos = (page, per_page, order_by) => {
    let self = this;
    let availableOrders = ['latest', 'oldest', 'popular'];
    let url = LOCATION + SCHEMA.LIST_PHOTOS +
        "?page=" + (page ? encodeURIComponent(page) : 1) +
        "&per_page=" + (per_page && !isNaN(per_page) ? encodeURIComponent(per_page) : 10) +
        "&order_by=" + (order_by && typeof order_by === 'string' && availableOrders.contains(order_by) ? +order_by : 'latest');
    return fetch(url, {
            headers: self.headers
        })
        .then(function (res) {
            return res.json();
        }).catch(function (err) {
            return Promise.reject(err);
        });
};