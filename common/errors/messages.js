const ERROR_MESSAGES = {
    INTERNAL_ERROR: {
        statusCode: 500,
        message: 'Some error was ocurred'
    },
    DESCRIPTION_REQUIRED: {
        statusCode: 400,
        message: 'Description required'
    },
    BAD_DESCRIPTION: {
        statusCode: 400,
        message: 'Description must be string'
    },
    TITLE_REQUIRED: {
        statusCode: 400,
        message: 'Title required'
    },
    BAD_TITLE: {
        statusCode: 400,
        message: 'Title must be string'
    },
    BAD_COMPLETED: {
        statusCode: 400,
        message: 'Completed must be boolean'
    },
    INVALID_ID: {
        statusCode: 400,
        message: 'Invalid id'
    },
    TODO_NOT_FOUND: {
        statusCode: 404,
        message: 'Todo not found'
    }
}

module.exports = ERROR_MESSAGES
