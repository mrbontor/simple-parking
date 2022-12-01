const SUCCESS_CREATED = 201;
const SUCCESS_NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const ACCESS_FORBIDDEN = 403;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const SERVER_ERROR = 500;

const { ValidationError } = require('../exceptions');

module.exports = {
    success: (res, data, message = 'Success') => {
        res.send({
            status: true,
            message: message,
            data,
        });
    },
    created: (res, data) => {
        res.status(SUCCESS_CREATED).send({
            status: true,
            data,
        });
    },
    noContent: (res) => {
        res.sendStatus(SUCCESS_NO_CONTENT);
    },

    customStatus: (res, statusCode) => {
        res.sendStatus(statusCode);
    },

    customStatusWithMessage: (res, statusCode, message) => {
        res.status(statusCode).send({
            status: false,
            message: message,
        });
    },

    error: (res, error) => {
        let response = {};
        response.status = error.status;
        response.message = error.message;

        if (error instanceof ValidationError && Array.isArray(error.errors)) {
            response.errors = error.errors;
        }
        res.status(error.statusCode).send(response);
    },
};
