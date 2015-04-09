'use strict'

var express = require('express'),
  passport = require('passport'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  cookieSession = require('cookie-session'),
  favicon = require('serve-favicon'),
  morgan = require('morgan'),
  app = express(),
  server = require('http').createServer(app),
  lib = require('netiam'),
  storage = lib.cache.file,
  netiam = lib(app),
  User = require('./models/user'),
  session

require('./modules/db')

session = cookieSession({
  maxage: 1000 * 60 * 60 * 24,
  key: 'secret.key',
  secret: 'secret',
  signed: true,
  secureProxy: true
})

app.enable('trust proxy')

app.disable('x-powered-by')

app.use(morgan('dev'))
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

// Error handling
app.use(function(err, req, res, next) {
  res
    .status(500)
    .json({
      code: 500,
      status: 'INTERNAL SERVER ERROR',
      message: err.message,
      data: err.stack
    })
})

netiam
  .post('/login')
  .authenticate({model: User})
  .acl({model: User})
  .login()
  .json()

netiam
  .get('/users')
  .authenticate({model: User})
  .cache({storage: storage({path: '.tmp/cache'})})
  .acl({model: User})
  .rest({model: User})
  .profile({query: 'profile'})
  .json()

app.get(
  '/users-mw',
  netiam
    .middleware()
    .authenticate({model: User})
    .acl({model: User})
    .rest({model: User})
    .profile({query: 'profile'})
    .json()
)

netiam
  .post('/users')
  .authenticate({model: User})
  .acl({model: User})
  .rest({model: User})
  .profile({query: 'profile'})
  .json()

app.post(
  '/users-mw',
  netiam
    .middleware()
    .authenticate({model: User})
    .acl({model: User})
    .rest({model: User})
    .profile({query: 'profile'})
    .json()
)

netiam
  .get('/users/:id')
  .authenticate({model: User})
  .acl({model: User})
  .rest({model: User})
  .profile({query: 'profile'})
  .transform(function() {
    var body = this.body()
    body.password = undefined
    this.body(body)
  })
  .json()

app.get(
  '/users-mw/:id',
  netiam
    .middleware()
    .authenticate({model: User})
    .acl({model: User})
    .rest({model: User})
    .profile({query: 'profile'})
    .transform(function() {
      var body = this.body()
      body.password = undefined
      this.body(body)
    })
    .json()
)

netiam
  .put('/users/:id')
  .authenticate({model: User})
  .acl({model: User})
  .rest({model: User})
  .profile({query: 'profile'})
  .json()

app.put(
  '/users-mw/:id',
  netiam
    .middleware()
    .authenticate({model: User})
    .acl({model: User})
    .rest({model: User})
    .profile({query: 'profile'})
    .json()
)

netiam
  .delete('/users/:id')
  .authenticate({model: User})
  .rest({model: User})
  .json()

app.delete(
  '/users-mw/:id',
  netiam
    .middleware()
    .authenticate({model: User})
    .rest({model: User})
    .json()
)

// Catch all
app.use(function(req, res) {
  res
    .json({
      code: 404,
      status: 'DOCUMENT NOT FOUND'
    })
})

server.listen(3000)