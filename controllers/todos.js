const { todos: Todos } = require('../models')
const ERRORS = require('../common/errors')

class TodoController {
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
