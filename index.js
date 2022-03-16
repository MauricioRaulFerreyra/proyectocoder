const express = require('express')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
require('dotenv').config()
const middlewares = require('./src/middlewares/middlewares')

const app = express()
const PORT = process.env.PORT || 3001

const logs = require('./src/logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

app.use(express.static('./public'))
app.use(express.static('./public/views'))
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    cookie: { maxAge: 400000 },
    secret: `${process.env.SECRET}`,
    resave: false,
    saveUninitialized: false,
    rolling: true
  })
)
app.use(passport.initialize())
app.use(passport.session())

const verificar = (req, res, next) => {
  console.log(req.user)
  next()
}

const productoRoute = require('./src/routes/productos')
app.use('/productos', productoRoute)
const carritoRoute = require('./src/routes/carrito')
app.use('/carrito', carritoRoute)
const register = require('./src/routes/register')
app.use('/register', register)
const login = require('./src/routes/login')
app.use('/login', login)
const logout = require('./src/routes/logout')
app.use('/logout', logout)
const ordenes = require('./src/routes/ordenes')
app.use('/ordenes', ordenes)
const chats = require('./src/routes/chat')
app.use('/chat', chats)

app.use((req, res, next) => {
  res.status(404)
  res.send({
    error: -2,
    descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`
  })
})

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  //console.log('conectado socket.io Ok')
  socket.emit('render', '')
  socket.on('actualizacion', () => {
    io.sockets.emit('render', '')
  })
})

server.listen(PORT, () => {
  loggerConsola.info(
    `Server is run on port ${server.address().port}`,
    app.settings.env
  )
})
server.on('error', error => loggerError.error(`Error en servidor ${error}`))
