const { todos: Todos } = require('../models')
const ERRORS = require('../common/errors')

/**
 * Todo class controller
 * @class TodoController
 * @global
 */
class TodoController {
  /**
   * Get todos
   * @static
   * @async
   * @function get
   * @memberof TodoController
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {Object} 200 - success response
   * @return {Object} 500 - Internal server error response
   */
  static async get(req, res, next) {
    try {
      const todos = await Todos.findAll({
        order: [['id', 'desc']],
        raw: true,
      })
      res.json({ todos })
    } catch (err) {
      console.error(err)
      next(ERRORS.INTERNAL_ERROR)
    }
  }
  /**
   * Get todo by id
   * @static
   * @async
   * @function getById
   * @memberof TodoController
   * @param {Object} req - Express request object
   * @param {Object} req.params - Express request object params
   * @param {Number} req.params.id - Todo id
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {Object} 200 - success response
   * @return {Object} 500 - Internal server error response
   * @return {Object} 404 - Not found response
   */
  static async getById(req, res, next) {
    try {
      const {
        params: {
          id
        }
      } = req
      const todo = await Todos.findOne({
        where: { id },
      })
      if (!todo) {
        return next(ERRORS.TODO_NOT_FOUND)
      }
      res.json({ todo })
    } catch (err) {
      console.error(err)
      next(ERRORS.INTERNAL_ERROR)
    }
  }
  /**
   * Create todo
   * @static
   * @async
   * @function create
   * @memberof TodoController
   * @param {Object} req - Express request object
   * @param {Object} req.body - Express request object body
   * @param {String} req.body.description - Todo description
   * @param {String} req.body.title - Todo title
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {Object} 201 - success response
   * @return {Object} 500 - Internal server error response
   */
  static async create(req, res, next) {
    try {
      const {
        body: {
          description, title
        }
      } = req
      const completed = false
      await Todos.create({
        description,
        title,
        completed,
      })
      res.status(201).end()
    } catch (err) {
      console.error(err)
      next(ERRORS.INTERNAL_ERROR)
    }
  }
  /**
   * Update todo
   * @static
   * @async
   * @function update
   * @memberof TodoController
   * @param {Object} req - Express request object
   * @param {Object} req.params - Express request object params
   * @param {Number} req.params.id - Todo id
   * @param {Object} req.body - Express request object body
   * @param {String} req.body.description - Todo description
   * @param {String} req.body.title - Todo title
   * @param {Boolean} req.body.completed - Todo completed status
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {Object} 204 - success response
   * @return {Object} 500 - Internal server error response
   * @return {Object} 404 - Not found response
   */
  static async update(req, res, next) {
    try {
      const {
        params: { id },
        body: { description, title, completed }
      } = req
      const todo = await Todos.findOne({
        where: { id }
      })
      if (!todo) {
        return next(ERRORS.TODO_NOT_FOUND)
      }
      todo.description = description
      todo.title = title
      if (typeof completed === 'boolean') {
        todo.completed = completed
      }
      todo.changed('updatedAt', true)
      await todo.save()
      res.status(204).end()
    } catch (err) {
      console.error(err)
      next(ERRORS.INTERNAL_ERROR)
    }
  }
  /**
   * Update completed status
   * @static
   * @async
   * @function changeStatus
   * @memberof TodoController
   * @param {Object} req - Express request object
   * @param {Object} req.params - Express request object params
   * @param {Number} req.params.id - Todo id
   * @param {Object} req.body - Express request object body
   * @param {Boolean} req.body.completed - Todo completed status
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {Object} 204 - success response
   * @return {Object} 500 - Internal server error response
   * @return {Object} 400 - Bad request response
   * @return {Object} 404 - Not found response
   */
  static async changeStatus(req, res, next) {
    try {
      const {
        params: { id },
        body: { completed }
      } = req
      if (typeof completed !== 'boolean') {
        return next(ERRORS.BAD_COMPLETED)
      }
      const todo = await Todos.findOne({
        where: { id }
      })
      if (!todo) {
        return next(ERRORS.TODO_NOT_FOUND)
      }
      todo.completed = completed
      todo.changed('updatedAt', true)
      await todo.save()
      return res.status(204).end()
    } catch (err) {
      console.error(err)
      next(ERRORS.INTERNAL_ERROR)
    }
  }
  /**
   * Delete todo
   * @static
   * @async
   * @function delete
   * @memberof TodoController
   * @param {Object} req - Express request object
   * @param {Object} req.params - Express request object params
   * @param {Number} req.params.id - Todo id
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   * @return {Object} 204 - success response
   * @return {Object} 500 - Internal server error response
   */
  static async delete(req, res, next) {
    try {
      const {
        params: {
          id
        }
      } = req
      await Todos.destroy({
        where: {
          id
        }
      })
      res.status(204).end()
    } catch (err) {
      console.error(err)
      next(ERRORS.INTERNAL_ERROR)
    }
  }
}

module.exports = TodoController
