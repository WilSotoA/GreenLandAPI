const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/index.js')
const cors = require('./middlewares/cors.js')

const app = express()

app.name = 'GreenLand API'

app.use(express.json())

app.use(morgan('dev'))

app.disable('x-powered-by')

app.use(cors)

// rutas para la app
app.use('/', routes)

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500
  const message = err.message || err
  console.error(err)
  res.status(status).send(message)
})

module.exports = app
