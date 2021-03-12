const { INTERNAL_ERROR } = require('../common/errors')
const ErrorResponse = require('./../libs/ErrorResponse')

const isDev = process.env.NODE_ENV !== 'production'

const errorHandler = (err, req, res, next) => {
    let error = err
    if (!(err instanceof ErrorResponse)) {
        error = new ErrorResponse(INTERNAL_ERROR)
    }

    const { statusCode, response } = error

    if (statusCode === 500) {
        console.log('********** +ERROR+ *********')
        console.log(req.originalUrl)
        console.log(err.stack)
        console.log('********** -ERROR- *********')
        if (isDev) {
            response.stackTrace = err.stack
        }
    }

    return res.status(statusCode).json(response)
}

module.exports = errorHandler
