require('dotenv').config()
const express = require('express')
const http = require('http')

const PORT = process.env.PORT || 8000

const {
  TodosRoutes
} = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(express.json()).use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Methods'
  )
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE, PATCH'
  )
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE, PATCH')
  next()
})

app.use('/v1/todos', TodosRoutes)
  .use(errorHandler)

const httpServer = http.createServer(app)

httpServer.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`)
)

module.exports = app
