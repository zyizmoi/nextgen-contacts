const express = require('express')
const bodyParser = require('body-parser')

const contactsRoutes = require('./routes/contacts-routes')
const usersRoutes = require('./routes/users-routes')
const baseRoute = require('./routes/base-route')
const httpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json())

app.use('/', baseRoute)

app.use('/contact', contactsRoutes)

app.use('/users', usersRoutes)

app.use((req, res, next) => {
  const error = new httpError('Could not find the route', 404)
  throw error
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occured!' })
})

app.listen(5000)
