/**
 * Axios Ajax Library - Wrapper
 */

/**
 * Import Axios library
 */
import axios from 'axios';

/**
 * Import axios configuration object
 */
import axiosConfig from '../config/axiosConfig';

/**
 * @class AxiosAjax
 * Axios Ajax class
 */
class AxiosAjax {

    /**
     * initialize the data and attributes
     */
    constructor() {

        /**
         * Url to fetch
         */
        this.url = url || '';

        /**
         * HTTP method to use
         */
        this.method = method || 'get';

        /**
         * Options for axios
         */
        this.options = axiosConfig || {};

        /**
         * Optional query parameters if any
         */
        this.queryParameters = queryParameters || {};

        /**
         * Optional body to use in request (for post, patch)
         */
        this.body = body || {};

        /**
         * Initialize the axios instance
         */
        this.http = axios.create(this.options);
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
    makeRequest(url, method, queryParameters, body) {
        url = url ? url : (() => {
            throw new Error('URL required')
        })();
        queryParameters = queryParameters || {};
        body = body || {};
        method = method || 'get';

        /**
         * Make the request
         */
        let request = this.http({
            method: method,
            url: url,
            params: queryParameters,
            data: body
        });

        return request;
    }
}

module.exports = AxiosAjax;