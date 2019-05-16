"use strict";
var request = require('sync-request');
class RESTClient {
    /**
     *Calling get method with Query String parameters
     *
     *      let formData:Object={
     *           "uid":"someUID",
     *           "userPassword":"somePwd"
     *      };
     *      let data:Object={
     *          qs:formData,
     *          headers: {
     *               'Content-Type': 'application/x-www-form-urlencoded',
     *               'Authorization': 'Basic ' + new Buffer('userName' + ':' + 'password').toString('base64')
     *          }
     *      }
     *
     * @param {string} uri The URI to send request to
     * @param {Object} options The combined object of header and payload
     */
    static get(uri, options) {
        let res;
        if (options != null) {
            res = request('GET', uri, options);
        }
        else {
            res = request('GET', uri);
        }
        return {
            statusCode: res.statusCode,
            headers: res.headers,
            body: res.body.toString('utf8')
        };
    }
    /**
     *  Calling post method with Body
     *
     *       let formData:Object={
     *           "uid":"someUID",
     *           "userPassword":"somePwd"
     *       };
     *
     *       let data:Object={
     *       headers: {
     *           'Content-Type': 'application/json',
     *           'Content-Length': Buffer.byteLength(JSON.stringify(formData)),
     *           'Authorization': 'Basic ' + new Buffer('userName' + ':' + 'password').toString('base64')
     *       },
     *       body:JSON.stringify(formData)
     *       };
     *
     * @param {string} uri The URI to send request to
     * @param {Object} headerAndPayload The combined object of header and payload
     */
    static post(uri, headerAndPayload) {
        let res;
        if (headerAndPayload != null) {
            res = request('POST', uri, headerAndPayload);
        }
        else {
            res = request('POST', uri);
        }
        return {
            statusCode: res.statusCode,
            headers: res.headers,
            body: res.body.toString('utf8')
        };
    }
    /**
     * Calling put method with Body
     *
     *       let formData:Object={
     *           "uid":"someUID",
     *           "userPassword":"somePwd"
     *       }
     *       let data:Object={
     *           headers: {
     *               'Content-Type': 'application/json',
     *               'Content-Length': Buffer.byteLength(JSON.stringify(formData)),
     *               'Authorization': 'Basic ' + new Buffer('userName' + ':' + 'password').toString('base64')
     *           },
     *       body:JSON.stringify(formData)
     *       }
     * @param {string} uri The URI to send request to
     * @param {Object} headerAndPayload The combined object of header and payload
     */
    static put(uri, headerAndPayload) {
        let res;
        if (headerAndPayload != null) {
            res = request('PUT', uri, headerAndPayload);
        }
        else {
            res = request('PUT', uri);
        }
        return {
            statusCode: res.statusCode,
            headers: res.headers,
            body: res.body.toString('utf8')
        };
    }
    /**
     * Calling delete method with Query String parameters
     *
     *      let formData:Object={
     *         "uid":"someUID",
     *         "userPassword":"somePwd"
     *      };
     *      let data:Object={
     *         qs:formData,
     *         headers: {
     *             'Content-Type': 'application/x-www-form-urlencoded',
     *             'Authorization': 'Basic ' + new Buffer('userName' + ':' + 'password').toString('base64')
     *         }
     *      };
     *
     * @param {string} uri The URI to send request to
     * @param {Object} headerAndPayload The combined object of header and payload
     */
    static delete(uri, headerAndPayload) {
        let res;
        if (headerAndPayload != null) {
            res = request('DELETE', uri, headerAndPayload);
        }
        else {
            res = request('DELETE', uri);
        }
        return {
            statusCode: res.statusCode,
            headers: res.headers,
            body: res.body.toString('utf8')
        };
    }
}
exports.RESTClient = RESTClient;
