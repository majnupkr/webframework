export interface IResponseJSON {
    statusCode: number;
    headers: any;
    body: string;
}
export declare class RESTClient {
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
    static get(uri: string, options?: Object): IResponseJSON;
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
    static post(uri: string, headerAndPayload: Object): IResponseJSON;
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
    static put(uri: string, headerAndPayload?: Object): IResponseJSON;
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
    static delete(uri: string, headerAndPayload?: Object): IResponseJSON;
}
