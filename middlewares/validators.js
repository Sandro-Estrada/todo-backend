const ERRORS = require('../common/errors')

const validateParams = (req, res, next) => {
  const { 
    body: {
      description, title, completed = false
    }
  } = req

  if (typeof description !== 'string') {
    return next(ERRORS.BAD_DESCRIPTION)
  }

  if (!description || !description.trim()) {
    return next(ERRORS.DESCRIPTION_REQUIRED)
  }

  if (typeof title !== 'string') {
    return next(ERRORS.BAD_TITLE)
  }

  if (!title || !title.trim()) {
    return next(ERRORS.TITLE_REQUIRED)
  }

  if (typeof completed !== 'boolean') {
    return next(ERRORS.BAD_COMPLETED)
  }

  return next()
}

const validateId = (req, res, next) => {
  const {
    params: {
      id
    }
  } = req

  if (isNaN(id)) {
    return next(ERRORS.INVALID_ID)
  }
  return next()
}

module.exports = {
  validateParams,
  validateId
}
