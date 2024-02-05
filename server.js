const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const authRouter = require('./router/authRouter')
const passport = require('passport')
const appRouter = require('./router/appRouter')
const { authorized } = require('./auth/auth')
const path = require('path')
require('dotenv').config()

// establishing the I/O port
const PORT = process.env.PORT || 8000
// initializing the express app
const app = express()

// configure middleware
app.use(logger('dev'))
app.use(cors())
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())
app.use(passport.initialize())
app.use('/auth', authRouter)
app.use('/app', authorized, appRouter) // to reactive security
// Static hosting for built files

app.get('/', async (request, response) => {
  try {
    response.json({message: 'Welcome to Express Auth App!'})
  } catch (e) {
    response.status(e.status).json({ message: e.status }) 
  }
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({ message: err.message})
})
app.use(express.static(path.join(__dirname, './client/build')));
// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
  app.use('*', (req, res) => res.sendFile(path.join(__dirname, './client/build', "index.html")));
}

app.listen(PORT, () => console.log(`App is up and running listening on port ${PORT}`))