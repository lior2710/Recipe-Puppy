import axios from "axios";

export default class ServiceController {
    constructor(options) {
        options = options || {};
        this._urlPrefix = options.urlPrefix || '';
    }

    triggerExceptionEvent(ex) {
        (this._exceptionEventhandler || (() => {}))(ex);
    }

    validateRequest(requestData) {
        if (!requestData.method) {
            throw 'requestData.method is required';
        }

        if (!requestData.url) {
            throw 'requestData.url is required';
        }
    }

    async sendRequest(requestData) {
        this.validateRequest(requestData);

        let method = requestData.method.toLowerCase();
        let request = axios[method];
        let url = this._urlPrefix + requestData.url;

        try {
            return await request(url, requestData.data, {headers: {'Content-Type': 'application/json'}});
        } catch(ex) {
            let exceptionMessage = requestData.exceptionMessage;
            let catchExceptionStatusCodes = requestData.catchExceptionStatusCodes || [];
            let statusCode = ex.response.status;

            if (exceptionMessage !== false && !catchExceptionStatusCodes.includes(statusCode)) {
                this.triggerExceptionEvent(ex);
            }

            throw ex;
        }
    }
}