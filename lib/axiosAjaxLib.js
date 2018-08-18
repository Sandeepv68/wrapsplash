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

class AxiosAjax {

    constructor() {
        this.url = url || '';
        this.method = method || 'get';
        this.options = axiosConfig || {};
        this.queryParameters = queryParameters || {};
        this.body = body || {};
        this.http = axios.create(this.options);
    }

    request(url, method, queryParameters, body) {
        url = url ? url : (error => {
            throw new Error('URL required')
        })();

        queryParameters = queryParameters || {};

        body = body || {};

        method = method || 'get';

        return this.http({
            method: method,
            url: url,
            params: queryParameters,
            data: body
        });
    }
}

module.exports = AxiosAjax;