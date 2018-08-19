//WrapSplashJS (c) 2018, Sandeep Vattapparambil
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("wrapsplash", [], factory);
	else if(typeof exports === 'object')
		exports["wrapsplash"] = factory();
	else
		root["wrapsplash"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config/axiosConfig.js":
/*!*******************************!*\
  !*** ./config/axiosConfig.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Axios Configuration Object
 */

var axiosConfig = {
    // `url` is the server URL that will be used for the request
    url: '',

    // `method` is the request method to be used when making the request
    method: '', // default

    // `baseURL` will be prepended to `url` unless `url` is absolute.
    // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
    // to methods of that instance.
    baseURL: '',

    // `transformRequest` allows changes to the request data before it is sent to the server
    // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
    // FormData or Stream
    // You may modify the headers object.
    // transformRequest: [function (data, headers) {
    //     // Do whatever you want to transform the data

    //     return data;
    // }],

    // `transformResponse` allows changes to the response data to be made before
    // it is passed to then/catch
    // transformResponse: [function (data) {
    //     // Do whatever you want to transform the data

    //     return data;
    // }],

    // `headers` are custom headers to be sent
    headers: {},

    // `params` are the URL parameters to be sent with the request
    // Must be a plain object or a URLSearchParams object
    // params: {
    //     ID: ''
    // },

    // `paramsSerializer` is an optional function in charge of serializing `params`
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    // paramsSerializer: function (params) {
    //     return Qs.stringify(params, {
    //         arrayFormat: 'brackets'
    //     })
    // },

    // `data` is the data to be sent as the request body
    // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
    // When no `transformRequest` is set, must be of one of the following types:
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - Browser only: FormData, File, Blob
    // - Node only: Stream, Buffer
    data: {},

    // `timeout` specifies the number of milliseconds before the request times out.
    // If the request takes longer than `timeout`, the request will be aborted.
    timeout: 1000,

    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: false, // default

    // `adapter` allows custom handling of requests which makes testing easier.
    // Return a promise and supply a valid response (see lib/adapters/README.md).
    // adapter: function (config) {
    //     /* ... */
    // },

    // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
    // This will set an `Authorization` header, overwriting any existing
    // `Authorization` custom headers you have set using `headers`.
    //auth: {},

    // `responseType` indicates the type of data that the server will respond with
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
    responseType: 'json', // default

    // `responseEncoding` indicates encoding to use for decoding responses
    // Note: Ignored for `responseType` of 'stream' or client-side requests
    responseEncoding: 'utf8', // default

    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    xsrfCookieName: 'XSRF-TOKEN', // default

    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-XSRF-TOKEN', // default

    // // `onUploadProgress` allows handling of progress events for uploads
    // onUploadProgress: function (progressEvent) {
    //     // Do whatever you want with the native progress event
    // },

    // // `onDownloadProgress` allows handling of progress events for downloads
    // onDownloadProgress: function (progressEvent) {
    //     // Do whatever you want with the native progress event
    // },

    // `maxContentLength` defines the max size of the http response content in bytes allowed
    //maxContentLength: 2000,

    // `validateStatus` defines whether to resolve or reject the promise for a given
    // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
    // or `undefined`), the promise will be resolved; otherwise, the promise will be
    // rejected.
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300; // default
    },

    // `maxRedirects` defines the maximum number of redirects to follow in node.js.
    // If set to 0, no redirects will be followed.
    maxRedirects: 5, // default

    // `socketPath` defines a UNIX Socket to be used in node.js.
    // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
    // Only either `socketPath` or `proxy` can be specified.
    // If both are specified, `socketPath` is used.
    socketPath: null // default

    // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
    // and https requests, respectively, in node.js. This allows options to be added like
    // `keepAlive` that are not enabled by default.
    // httpAgent: new http.Agent({
    //     keepAlive: true
    // }),
    // httpsAgent: new https.Agent({
    //     keepAlive: true
    // }),

    // 'proxy' defines the hostname and port of the proxy server.
    // You can also define your proxy using the conventional `http_proxy` and
    // `https_proxy` environment variables. If you are using environment variables
    // for your proxy configuration, you can also define a `no_proxy` environment
    // variable as a comma-separated list of domains that should not be proxied.
    // Use `false` to disable proxies, ignoring environment variables.
    // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
    // supplies credentials.
    // This will set an `Proxy-Authorization` header, overwriting any existing
    // `Proxy-Authorization` custom headers you have set using `headers`.
    // proxy: {
    //     host: '127.0.0.1',
    //     port: 9000,
    //     auth: {}
    // },

    // `cancelToken` specifies a cancel token that can be used to cancel the request
    // (see Cancellation section below for details)
    //cancelToken: new CancelToken(function (cancel) {})
};

module.exports = axiosConfig;

/***/ }),

/***/ "./config/url_config.json":
/*!********************************!*\
  !*** ./config/url_config.json ***!
  \********************************/
/*! exports provided: API_LOCATION, BEARER_TOKEN_URL, USERS_PUBLIC_PROFILE, USERS_PORTFOLIO, USERS_PHOTOS, USERS_LIKED_PHOTOS, USERS_COLLECTIONS, USERS_STATISTICS, LIST_PHOTOS, LIST_CURATED_PHOTOS, GET_A_PHOTO, GET_A_RANDOM_PHOTO, GET_A_PHOTO_STATISTICS, GET_A_PHOTO_DOWNLOAD_LINK, UPDATE_A_PHOTO, LIKE_A_PHOTO, UNLIKE_A_PHOTO, SEARCH_PHOTOS, SEARCH_COLLECTIONS, SEARCH_USERS, CURRENT_USER_PROFILE, UPDATE_CURRENT_USER_PROFILE, STATS_TOTALS, STATS_MONTH, LIST_COLLECTIONS, LIST_FEATURED_COLLECTIONS, LIST_CURATED_COLLECTIONS, GET_COLLECTION, GET_CURATED_COLLECTION, GET_COLLECTION_PHOTOS, GET_CURATED_COLLECTION_PHOTOS, LIST_RELATED_COLLECTION, CREATE_NEW_COLLECTION, UPDATE_EXISTING_COLLECTION, DELETE_COLLECTION, ADD_PHOTO_TO_COLLECTION, REMOVE_PHOTO_FROM_COLLECTION, default */
/***/ (function(module) {

module.exports = {"API_LOCATION":"https://api.unsplash.com/","BEARER_TOKEN_URL":"https://unsplash.com/oauth/token","USERS_PUBLIC_PROFILE":"users/","USERS_PORTFOLIO":"users/:username/portfolio","USERS_PHOTOS":"users/:username/photos","USERS_LIKED_PHOTOS":"users/:username/likes","USERS_COLLECTIONS":"users/:username/collections","USERS_STATISTICS":"users/:username/statistics","LIST_PHOTOS":"photos","LIST_CURATED_PHOTOS":"photos/curated","GET_A_PHOTO":"photos/:id","GET_A_RANDOM_PHOTO":"photos/random","GET_A_PHOTO_STATISTICS":"photos/:id/statistics","GET_A_PHOTO_DOWNLOAD_LINK":"photos/:id/download","UPDATE_A_PHOTO":"photos/:id","LIKE_A_PHOTO":"photos/:id/like","UNLIKE_A_PHOTO":"photos/:id/like","SEARCH_PHOTOS":"search/photos","SEARCH_COLLECTIONS":"search/collections","SEARCH_USERS":"search/users","CURRENT_USER_PROFILE":"me","UPDATE_CURRENT_USER_PROFILE":"me","STATS_TOTALS":"stats/total","STATS_MONTH":"stats/month","LIST_COLLECTIONS":"collections","LIST_FEATURED_COLLECTIONS":"collections/featured","LIST_CURATED_COLLECTIONS":"collections/curated","GET_COLLECTION":"collections/:id","GET_CURATED_COLLECTION":"collections/curated/:id","GET_COLLECTION_PHOTOS":"collections/:id/photos","GET_CURATED_COLLECTION_PHOTOS":"collections/curated/:id/photos","LIST_RELATED_COLLECTION":"collections/:id/related","CREATE_NEW_COLLECTION":"collections","UPDATE_EXISTING_COLLECTION":"collections/:id","DELETE_COLLECTION":"collections/:id","ADD_PHOTO_TO_COLLECTION":"collections/:collection_id/add","REMOVE_PHOTO_FROM_COLLECTION":"collections/:collection_id/remove"};

/***/ }),

/***/ "./lib/axiosAjaxLib.js":
/*!*****************************!*\
  !*** ./lib/axiosAjaxLib.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Axios Ajax Library - Wrapper
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

/**
 * Import Axios library
 */


/**
 * Import axios configuration object
 */


var _axios = __webpack_require__(/*! axios */ "axios");

var _axios2 = _interopRequireDefault(_axios);

var _axiosConfig = __webpack_require__(/*! ../config/axiosConfig */ "./config/axiosConfig.js");

var _axiosConfig2 = _interopRequireDefault(_axiosConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class AxiosAjax
 * Axios Ajax class
 */
var AxiosAjax = function () {

  /**
   * initialize the data and attributes
   */
  function AxiosAjax(options) {
    _classCallCheck(this, AxiosAjax);

    /**
     * Url to fetch
     */
    this.url = '';

    /**
     * HTTP method to use
     */
    this.method = '';

    /**
     * Options for axios
     */
    this.options = options || _axiosConfig2.default || {};

    /**
     * Optional query parameters if any
     */
    this.queryParameters = {};

    /**
     * Optional body to use in request (for post, patch)
     */
    this.body = {};

    /**
     * Initialize the axios instance
     */
    this.http = _axios2.default.create(this.options);
  }

  /**
   * @name makeRequest
   * @inner
   * Make a request with the options and parameters provided.
   * @param {String} url - The url string
   * @param {String} method - The HTTP method 
   * @param {Object} queryParameters - The query parameters
   * @param {Object} body - The request body
   */


  _createClass(AxiosAjax, [{
    key: 'makeRequest',
    value: function makeRequest(url, method, queryParameters, body) {
      this.url = url ? url : function () {
        throw new Error('URL required');
      }();
      this.queryParameters = queryParameters || {};
      this.body = body || {};
      this.method = method || 'get';

      /**
       * Make the request
       */
      var request = this.http({
        method: this.method,
        url: this.url,
        params: this.queryParameters,
        data: this.body
      });

      return request;
    }
  }]);

  return AxiosAjax;
}();

module.exports = AxiosAjax;

/***/ }),

/***/ "./node_modules/crypto-browserify/index.js":
/*!*************************************************!*\
  !*** ./node_modules/crypto-browserify/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.randomBytes = exports.rng = exports.pseudoRandomBytes = exports.prng = __webpack_require__(/*! randombytes */ "randombytes")
exports.createHash = exports.Hash = __webpack_require__(/*! create-hash */ "create-hash")
exports.createHmac = exports.Hmac = __webpack_require__(/*! create-hmac */ "create-hmac")

var algos = __webpack_require__(/*! browserify-sign/algos */ "browserify-sign/algos")
var algoKeys = Object.keys(algos)
var hashes = ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'rmd160'].concat(algoKeys)
exports.getHashes = function () {
  return hashes
}

var p = __webpack_require__(/*! pbkdf2 */ "pbkdf2")
exports.pbkdf2 = p.pbkdf2
exports.pbkdf2Sync = p.pbkdf2Sync

var aes = __webpack_require__(/*! browserify-cipher */ "browserify-cipher")

exports.Cipher = aes.Cipher
exports.createCipher = aes.createCipher
exports.Cipheriv = aes.Cipheriv
exports.createCipheriv = aes.createCipheriv
exports.Decipher = aes.Decipher
exports.createDecipher = aes.createDecipher
exports.Decipheriv = aes.Decipheriv
exports.createDecipheriv = aes.createDecipheriv
exports.getCiphers = aes.getCiphers
exports.listCiphers = aes.listCiphers

var dh = __webpack_require__(/*! diffie-hellman */ "diffie-hellman")

exports.DiffieHellmanGroup = dh.DiffieHellmanGroup
exports.createDiffieHellmanGroup = dh.createDiffieHellmanGroup
exports.getDiffieHellman = dh.getDiffieHellman
exports.createDiffieHellman = dh.createDiffieHellman
exports.DiffieHellman = dh.DiffieHellman

var sign = __webpack_require__(/*! browserify-sign */ "browserify-sign")

exports.createSign = sign.createSign
exports.Sign = sign.Sign
exports.createVerify = sign.createVerify
exports.Verify = sign.Verify

exports.createECDH = __webpack_require__(/*! create-ecdh */ "create-ecdh")

var publicEncrypt = __webpack_require__(/*! public-encrypt */ "public-encrypt")

exports.publicEncrypt = publicEncrypt.publicEncrypt
exports.privateEncrypt = publicEncrypt.privateEncrypt
exports.publicDecrypt = publicEncrypt.publicDecrypt
exports.privateDecrypt = publicEncrypt.privateDecrypt

// the least I can do is make error messages for the rest of the node.js/crypto api.
// ;[
//   'createCredentials'
// ].forEach(function (name) {
//   exports[name] = function () {
//     throw new Error([
//       'sorry, ' + name + ' is not implemented yet',
//       'we accept pull requests',
//       'https://github.com/crypto-browserify/crypto-browserify'
//     ].join('\n'))
//   }
// })

var rf = __webpack_require__(/*! randomfill */ "randomfill")

exports.randomFill = rf.randomFill
exports.randomFillSync = rf.randomFillSync

exports.createCredentials = function () {
  throw new Error([
    'sorry, createCredentials is not implemented yet',
    'we accept pull requests',
    'https://github.com/crypto-browserify/crypto-browserify'
  ].join('\n'))
}

exports.constants = {
  'DH_CHECK_P_NOT_SAFE_PRIME': 2,
  'DH_CHECK_P_NOT_PRIME': 1,
  'DH_UNABLE_TO_CHECK_GENERATOR': 4,
  'DH_NOT_SUITABLE_GENERATOR': 8,
  'NPN_ENABLED': 1,
  'ALPN_ENABLED': 1,
  'RSA_PKCS1_PADDING': 1,
  'RSA_SSLV23_PADDING': 2,
  'RSA_NO_PADDING': 3,
  'RSA_PKCS1_OAEP_PADDING': 4,
  'RSA_X931_PADDING': 5,
  'RSA_PKCS1_PSS_PADDING': 6,
  'POINT_CONVERSION_COMPRESSED': 2,
  'POINT_CONVERSION_UNCOMPRESSED': 4,
  'POINT_CONVERSION_HYBRID': 6
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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


//constants. 

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//Import library

//API Schema definitions


var _crypto = __webpack_require__(/*! crypto */ "./node_modules/crypto-browserify/index.js");

var _crypto2 = _interopRequireDefault(_crypto);

var _axiosAjaxLib = __webpack_require__(/*! ../lib/axiosAjaxLib */ "./lib/axiosAjaxLib.js");

var _axiosAjaxLib2 = _interopRequireDefault(_axiosAjaxLib);

var _url_config = __webpack_require__(/*! ../config/url_config.json */ "./config/url_config.json");

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
    function WrapSplashApi() {
        _classCallCheck(this, WrapSplashApi);

        //The location of the Unsplash API
        this.API_LOCATION = _url_config2.default.API_LOCATION;
        //The API to generate Unsplash API Bearer Token.
        this.BEARER_TOKEN_URL = _url_config2.default.BEARER_TOKEN_URL;
        //Defaults
        this.options = {};
        this.access_key = '';
        this.secret_key = '';
        this.redirect_uri = '';
        this.code = '';
        this.grant_type = 'authorization_code';
        this.bearer_token = '';
        this.headers = {
            'Content-type': 'application/json',
            'X-Requested-With': 'WrapSplash'
        };
        //Set available order_by options
        this.availableOrders = ['latest', 'oldest', 'popular'];
        //Sset available orientation options
        this.availableOrientations = ['landscape', 'portrait', 'squarish'];
    }

    _createClass(WrapSplashApi, [{
        key: 'init',


        /**
         * @memberof WrapSplashApi
         * @function init
         * A helper function to initialize WrapSplashApi and validate the options
         * @param {Object} options - The options object
         * @returns {*} - The class initialized with the passed in parameters
         */
        value: function init() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && options !== null) {
                //Object.assign
                this.options = _extends({}, options);
                this.access_key = this.options.access_key ? this.options.access_key : function () {
                    throw new Error('Access Key missing!');
                }();
                this.secret_key = this.options.secret_key ? this.options.secret_key : function () {
                    throw new Error('Secret Key missing!');
                }();
                this.redirect_uri = this.options.redirect_uri ? this.options.redirect_uri : function () {
                    throw new Error('Redirect URI missing!');
                }();
                this.code = this.options.code ? this.options.code : function () {
                    throw new Error('Authorization Code missing!');
                }();
                var hash = _crypto2.default.createHmac('sha256', this.access_key).digest('hex');
                if (this.options.bearer_token) {
                    this.bearer_token = this.options.bearer_token;
                }
                this.headers = _extends({}, this.headers, {
                    'Authorization': this.bearer_token ? 'Bearer ' + this.bearer_token : 'Client-ID ' + this.access_key,
                    'X-WrapSplash-Header': hash
                });
            } else {
                throw new Error('Initilisation parameters required!');
            }
        }

        /**
         * Heler function to fetch a given url
         * @function fetchUrl
         * @param {String} url - The url to be fetched (required).
         * @param {String} method - The HTTP method to be used (required).
         * @returns {Object} - The JSON data object.
         */

    }, {
        key: 'fetchUrl',
        value: function fetchUrl(url, method) {
            var ajax = new _axiosAjaxLib2.default({
                headers: this.headers ? this.headers : ''
            });
            return ajax.makeRequest(url, method.toLowerCase()).then(function (res) {
                if (res.status === 204) {
                    var response = {
                        status: res.status,
                        statusText: res.statusText,
                        message: 'Content Deleted'
                    };
                    return response;
                } else if (res.status === 403) {
                    var _response = {
                        status: res.status,
                        statusText: res.statusText,
                        message: 'Rate Limit Exceeded'
                    };
                    return _response;
                } else {
                    return res.data;
                };
            }).catch(function (err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: 'generateBearerToken',


        /**
         * Promise factory to generate a Bearer Token for write_access to private data.
         * The Unsplash API uses OAuth2 to authenticate and authorize Unsplash users. 
         * Unsplash’s OAuth2 paths live at https://unsplash.com/oauth/.
         * @function generateBearerToken
         * @memberof UnsplashApi
         * @returns {Object} - The user's Access Token JSON data object.
         */
        value: function generateBearerToken() {
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

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "browserify-cipher":
/*!************************************!*\
  !*** external "browserify-cipher" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("browserify-cipher");

/***/ }),

/***/ "browserify-sign":
/*!**********************************!*\
  !*** external "browserify-sign" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("browserify-sign");

/***/ }),

/***/ "browserify-sign/algos":
/*!****************************************!*\
  !*** external "browserify-sign/algos" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("browserify-sign/algos");

/***/ }),

/***/ "create-ecdh":
/*!******************************!*\
  !*** external "create-ecdh" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("create-ecdh");

/***/ }),

/***/ "create-hash":
/*!******************************!*\
  !*** external "create-hash" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("create-hash");

/***/ }),

/***/ "create-hmac":
/*!******************************!*\
  !*** external "create-hmac" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("create-hmac");

/***/ }),

/***/ "diffie-hellman":
/*!*********************************!*\
  !*** external "diffie-hellman" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("diffie-hellman");

/***/ }),

/***/ "pbkdf2":
/*!*************************!*\
  !*** external "pbkdf2" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pbkdf2");

/***/ }),

/***/ "public-encrypt":
/*!*********************************!*\
  !*** external "public-encrypt" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("public-encrypt");

/***/ }),

/***/ "randombytes":
/*!******************************!*\
  !*** external "randombytes" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("randombytes");

/***/ }),

/***/ "randomfill":
/*!*****************************!*\
  !*** external "randomfill" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("randomfill");

/***/ })

/******/ });
});
//# sourceMappingURL=wrapsplash.js.map