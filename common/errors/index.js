const ErrorResponse = require('../../libs/ErrorResponse')
const ERROR_MESSAGES = require('./messages')

const ERRORS = {
    INTERNAL_ERROR: new ErrorResponse(ERROR_MESSAGES.INTERNAL_ERROR),
    DESCRIPTION_REQUIRED: new ErrorResponse(ERROR_MESSAGES.DESCRIPTION_REQUIRED),
    BAD_DESCRIPTION: new ErrorResponse(ERROR_MESSAGES.BAD_DESCRIPTION),
    TITLE_REQUIRED: new ErrorResponse(ERROR_MESSAGES.TITLE_REQUIRED),
    BAD_TITLE: new ErrorResponse(ERROR_MESSAGES.BAD_TITLE),
    BAD_COMPLETED: new ErrorResponse(ERROR_MESSAGES.BAD_COMPLETED),
    INVALID_ID: new ErrorResponse(ERROR_MESSAGES.INVALID_ID),
    TODO_NOT_FOUND: new ErrorResponse(ERROR_MESSAGES.TODO_NOT_FOUND),
    
}

module.exports = Object.freeze(ERRORS)