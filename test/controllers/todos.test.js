const request = require('supertest')
const app = require('../../index')
const { todos: Todos } = require('../../models')
const ERRORS = require('../../common/errors/messages')

describe('get', () => {
  const todos = [
    {
      id: 1,
      description: 'test description',
      title: 'test title',
      completed: true,
      createdAt: '2021-03-10T20:50:25.091Z',
      updatedAt: '2021-03-10T21:00:04.884Z'
    }
  ]

  it('Success', async () => {
    Todos.findAll = jest.fn().mockResolvedValueOnce(todos)
    const res = await request(app).get(`/v1/todos`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ todos })
  })
  it('Exception', async () => {
    Todos.findAll = jest.fn().mockRejectedValueOnce(new Error('Foo'))
    const res = await request(app).get(`/v1/todos`)
    const { statusCode, message } = ERRORS.INTERNAL_ERROR
    expect(res.statusCode).toEqual(statusCode)
    expect(res.body.message).toEqual(message)
  })
})

describe('getById', () => {
  const todo = {
    id: 1,
    description: 'test description',
    title: 'test title',
    completed: true,
    createdAt: '2021-03-10T20:50:25.091Z',
    updatedAt: '2021-03-10T21:00:04.884Z',
  }
  const id = 1
  it('Success', async () => {
    Todos.findOne = jest.fn().mockResolvedValueOnce(todo)
    const res = await request(app).get(`/v1/todos/${id}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ todo })
  })

  it('Todo not found', async () => {
    Todos.findOne = jest.fn().mockResolvedValueOnce(null)
    const res = await request(app).get(`/v1/todos/${id}`)
    const { statusCode, message } = ERRORS.TODO_NOT_FOUND
    expect(res.statusCode).toEqual(statusCode)
    expect(res.body.message).toEqual(message)
  })

  it('Exception', async () => {
    Todos.findOne = jest.fn().mockRejectedValueOnce(new Error('Foo'))
    const res = await request(app).get(`/v1/todos/${id}`)
    const { statusCode, message } = ERRORS.INTERNAL_ERROR
    expect(res.statusCode).toEqual(statusCode)
    expect(res.body.message).toEqual(message)
  })
})

describe('create', () => {
  const todo = {
    id: 2,
    description: 'test description',
    title: 'test title',
    completed: false,
    createdAt: '2021-03-10T20:50:25.091Z',
    updatedAt: '2021-03-10T20:50:25.091Z'
  }
  it('Success', async () => {
    Todos.create = jest.fn().mockResolvedValueOnce(todo)
    const res = await request(app).post(`/v1/todos`).send({
      title: 'test title',
      description: 'test description',
    })
    expect(res.statusCode).toEqual(201)
  })
  it('Exception', async () => {
    Todos.create = jest.fn().mockRejectedValueOnce(new Error('Foo'))
    const res = await request(app).post(`/v1/todos/`).send({
      title: 'test title',
      description: 'test description',
    })
    const { statusCode, message } = ERRORS.INTERNAL_ERROR
    expect(res.statusCode).toEqual(statusCode)
    expect(res.body.message).toEqual(message)
  })
})

describe('update', () => {
  const todo = {
    id: 2,
    description: 'test description',
    title: 'test title',
    completed: false,
    createdAt: '2021-03-10T20:50:25.091Z',
    updatedAt: '2021-03-10T21:00:04.884Z',
    save: jest.fn(),
    changed: jest.fn()
  }
  const id = 2
  it('Success', async () => {
    Todos.findOne = jest.fn().mockResolvedValueOnce(todo)
    const res = await request(app).put(`/v1/todos/${id}`).send({
      title: 'test title',
      description: 'test description',
    })
    expect(res.statusCode).toEqual(204)
  })

  it('Todo not found', async () => {
    Todos.findOne = jest.fn().mockResolvedValueOnce(null)
    const res = await request(app).put(`/v1/todos/${id}`).send({
      title: 'test title',
      description: 'test description',
    })
    const { statusCode, message } = ERRORS.TODO_NOT_FOUND
    expect(res.statusCode).toEqual(statusCode)
    expect(res.body.message).toEqual(message)
  })

  it('Update all params', async () => {
    Todos.findOne = jest.fn().mockResolvedValueOnce(todo)
    const res = await request(app).put(`/v1/todos/${id}`).send({
      title: 'test title',
      description: 'test description',
      completed: true
    })
    expect(res.statusCode).toEqual(204)
  })

  it('Exception', async () => {
    Todos.findOne = jest.fn().mockRejectedValueOnce(new Error('Foo'))
    const res = await request(app).put(`/v1/todos/${id}`).send({
      title: 'test title',
      description: 'test description',
      completed: true
    })
    const { statusCode, message } = ERRORS.INTERNAL_ERROR
    expect(res.statusCode).toEqual(statusCode)
    expect(res.body.message).toEqual(message)
  })
})

describe('changeStatus', () => {
  const todo = {
    id: 1,
    completed: true,
    save: jest.fn(),
    changed: jest.fn()
  }
  const id = 1
  it('Success', async () => {
    Todos.findOne = jest.fn().mockResolvedValueOnce(todo)
    const res = await request(app).patch(`/v1/todos/${id}`).send({
      completed: true
    })
    expect(res.statusCode).toEqual(204)
  })

  it('Completed must be boolean', async () => {
    const res = await request(app).patch(`/v1/todos/${id}`).send({
      completed: 'true'
    })
    const { statusCode, message } = ERRORS.BAD_COMPLETED
    expect(res.statusCode).toEqual(statusCode)
    expect(res.body.message).toEqual(message)
  })

  it('Todo not found', async () => {
    Todos.findOne = jest.fn().mockResolvedValueOnce(null)
    const res = await request(app).patch(`/v1/todos/${id}`).send({
      completed: true
    })
    const { statusCode, message } = ERRORS.TODO_NOT_FOUND
    expect(res.statusCode).toEqual(statusCode)
    expect(res.body.message).toEqual(message)
  })

  it('Exception', async () => {
    Todos.findOne = jest.fn().mockRejectedValueOnce(new Error('Foo'))
    const res = await request(app).patch(`/v1/todos/${id}`).send({
      completed: true
    })
    const { statusCode, message } = ERRORS.INTERNAL_ERROR
    expect(res.statusCode).toEqual(statusCode)
    expect(res.body.message).toEqual(message)
  })
})

describe('delete', () => {
  const id = 1

  it('Success', async () => {
    Todos.destroy = jest.fn().mockResolvedValueOnce(true)
    const res = await request(app).delete(`/v1/todos/${id}`)
    expect(res.statusCode).toEqual(204)
  })

  it('Exception', async () => {
    Todos.destroy = jest.fn().mockRejectedValueOnce(new Error('Foo'))
    const res = await request(app).delete(`/v1/todos/${id}`)
    const { statusCode, message } = ERRORS.INTERNAL_ERROR
    expect(res.statusCode).toEqual(statusCode)
    expect(res.body.message).toEqual(message)
  })
})
