const ResponseHelper = require('../helpers/response');
const { ValidationError } = require('../helpers/exceptions');

module.exports = {
    /**
     *
     * @param {string} err
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    errorHandler: (err, req, res) => {
        console.error('[MIDDLEWAREERROR] ' + JSON.stringify(err));
        let response = {
            status: err.status,
            message: err.message,
        };

        if (err instanceof ValidationError) {
            response.errors = err.errors.errors;
        }

        ResponseHelper.error(res, err);
    },
};
