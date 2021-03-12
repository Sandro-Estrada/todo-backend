'use strict'

const express = require('express')
const TodosController = require('../controllers/todos')
const { validateParams, validateId } = require('../middlewares/validators')
const api = express.Router()

api.get('/', TodosController.get)
api.post('/', [validateParams], TodosController.create)
api.param('id', validateId)
api.get('/:id', TodosController.getById)
api.put('/:id', [validateParams], TodosController.update)
api.patch('/:id', TodosController.changeStatus)
api.delete('/:id', TodosController.delete)

module.exports = api
