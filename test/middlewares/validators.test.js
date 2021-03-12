const validators = require('../../middlewares/validators')
const ERRORS = require('../../common/errors')

describe('validateParams', () => {
  const body = {
    description: 'description',
    title: 'title',
    completed: false
  }
  it('Success', async () => {
    const next = jest.fn()
    validators.validateParams({body}, {}, next)
    expect(next).toHaveBeenCalledWith()
  })

  it('Invalid description', async () => {
    const next = jest.fn()
    validators.validateParams({
      body: {
        ...body,
        description: null
      }
    }, {}, next)
    expect(next).toHaveBeenCalledWith(ERRORS.BAD_DESCRIPTION)
  })

  it('Empty description', async () => {
    const next = jest.fn()
    validators.validateParams({
      body: {
        ...body,
        description: ''
      }
    }, {}, next)
    expect(next).toHaveBeenCalledWith(ERRORS.DESCRIPTION_REQUIRED)
  })

  it('Invalid title', async () => {
    const next = jest.fn()
    validators.validateParams({
      body: {
        ...body,
        title: null
      }
    }, {}, next)
    expect(next).toHaveBeenCalledWith(ERRORS.BAD_TITLE)
  })

  it('Empty title', async () => {
    const next = jest.fn()
    validators.validateParams({
      body: {
        ...body,
        title: ''
      }
    }, {}, next)
    expect(next).toHaveBeenCalledWith(ERRORS.TITLE_REQUIRED)
  })

  it('Invalid completed', async () => {
    const next = jest.fn()
    validators.validateParams({
      body: {
        ...body,
        completed: null
      }
    }, {}, next)
    expect(next).toHaveBeenCalledWith(ERRORS.BAD_COMPLETED)
  })

})

describe('validateId', () => {
  const params = {
    id: 1
  }
  it('Success', async () => {
    const next = jest.fn()
    validators.validateId({params}, {}, next)
    expect(next).toHaveBeenCalledWith()
  })

  it('Invalid id', async () => {
    const next = jest.fn()
    validators.validateId({
      params: {
        id: '1a'
      }
    }, {}, next)
    expect(next).toHaveBeenCalledWith(ERRORS.INVALID_ID)
  })
})