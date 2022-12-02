const axios = require('axios');
const { ServerError } = require('../app/helpers/exceptions');

const API_DEFAULT_ERROR = 'Internal Server Error!';

module.exports = {
    API_DEFAULT_ERROR,
    async call (method, url, query = {}, data = {}, headers) {
        const options = {
            method,
            url,
            headers,
            params: query,
            data,
        };

        try {
            const response = await axios(options);

            return response.data;
        } catch (error) {
            if (error.response) {
                let nextError = error;

                if (error.response.data) {
                    nextError = error.response.data;
                }
                if (error.response.data && error.response.data.error && typeof error.response.data.error === 'string') {
                    // We keep only string to prevent Circular object
                    nextError = error.response.data.error;
                }
                if (error.response.data && error.response.data.message) {
                    nextError = error.response.data.message;
                }

                const message = typeof nextError === 'string' ? nextError : API_DEFAULT_ERROR;

                throw new ServerError(
                    message,
                    error.response.status,
                    nextError
                );
            } else {
                throw error;
            }
        }
    },
};
