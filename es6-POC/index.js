'use strict';
const fetch = require('node-fetch');
const crypto = require('crypto');
const urlConfig = require('./url_config.json');
class Unsplash {
    constructor(options) {
        this.API_LOCATION = 'https://api.unsplash.com/';
        this.BEARER_TOKEN_URL = 'https://unsplash.com/oauth/token';

        if (options) {
            let self = this;
            options = {...{}, ...options};
            self.access_key = (options.access_key ? options.access_key : (function () {
                throw new Error('Access Key missing!');
            }()));
            // self.secret_key = (options.secret_key ? options.secret_key : (function () {
            //     throw new Error('Secret Key missing!');
            // }()));
            // self.redirect_uri = (options.redirect_uri ? options.redirect_uri : (function () {
            //     throw new Error('Redirect URI missing!');
            // }()));
            // self.code = (options.code ? options.code : (function () {
            //     throw new Error('Authorization Code missing!');
            // }()));
            self.grant_type = 'authorization_code';
            let hash = crypto.createHmac('sha256', self.access_key).digest('hex');
            if (options.bearer_token) {
                self.bearer_token = options.bearer_token;
            }
            self.headers = {
                'Content-type': 'application/json',
                'Authorization': (self.bearer_token ? 'Bearer ' + self.bearer_token : 'Client-ID ' + self.access_key),
                'X-WrapSplash-Header': hash
            };
            console.log(self.headers);
        } else {
            throw new Error('Initilisation parameters missing!');
        }
    }
    hello() {
        console.log(`this is my access key ${this.access_key}`);
    }
}

let unsplash = new Unsplash({
    access_key: 'dsfsdfsdfsdfsdf'
});
unsplash.hello();