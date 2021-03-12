const errorHandlerMiddleware = require('../../middlewares/errorHandler')
const { INTERNAL_ERROR } = require('../../common/errors')

describe('Evidence', () => {
    describe('Successful Behavior', () => {
        it('Normal exception', async () => {
            const err = new Error('Foo')
            const req = {}
            const res = {
                status: jest.fn(),
                json: jest.fn()
            }
            const next = jest.fn()
            res.status.mockReturnValue(res)

            errorHandlerMiddleware(err, req, res, next)
            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalled()
        })

        it('ErrorResponse exception', async () => {
            const err = INTERNAL_ERROR
            const req = {}
            const res = {
                status: jest.fn(),
                json: jest.fn()
            }
            const next = jest.fn()
            res.status.mockReturnValue(res)

            errorHandlerMiddleware(err, req, res, next)
            expect(res.status).toHaveBeenCalledWith(err.statusCode)
            expect(res.json).toHaveBeenCalled()
        })
    })
})
