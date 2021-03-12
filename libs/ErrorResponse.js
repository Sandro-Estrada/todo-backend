class ErrorResponse extends Error {
    /**
     * @param {string|object} message - String Error | Object
     * @param {number} statusCode - HTTP Status Code
     * Return ErrorReponse
     */
    constructor (response, statusCode) {
        super(typeof response === 'object'
            ? response.message
            : response)
        if (typeof response === 'object') {
            this.statusCode = statusCode || response.statusCode
            this.response = { ...response }
            delete this.response.statusCode
        } else {
            this.statusCode = statusCode || 500
            this.response = {
                message: response
            }
        }
    }
}

module.exports = ErrorResponse
