const express = require('express')
const path = require('path')
require('dotenv').config()
const cluster = require('cluster')
const session = require('express-session')
const passport = require('passport')

const MODO = process.env.MODO || 'FORK'
console.log(process.env.MODO)
if (MODO == 'CLUSTER' && cluster.isMaster) {
  const numCPUs = require('os').cpus().length

  console.log(`Número de procesadores: ${numCPUs}`)
  console.log(`PID MASTER ${process.pid}`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log(
      'Worker',
      worker.process.pid,
      'died',
      new Date().toLocaleString()
    )
    cluster.fork()
  })
} else {
  const app = express()
  const PORT = process.env.PORT || 8080

  app.use(express.static(__dirname + '/public'))
  app.use(express.static(__dirname + '/public/views'))
  app.use(express.json({ extended: true }))
  app.use(express.urlencoded({ extended: true }))

  app.use(
    session({
      cookie: { maxAge: 600000 },
      secret: `${process.env.SESSION_SECRET}`,
      resave: false,
      saveUninitialized: false,
      rolling: true
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  const ptosRoute = require('./src/routes/productos')
  app.use('/api/productos', ptosRoute)
  const carritoRoute = require('./src/routes/carrito')
  app.use('/api/carrito', carritoRoute)
  const register = require('./src/routes/register')
  app.use('/register', register)
  const login = require('./src/routes/login')
  app.use('/login', login)
  const logout = require('./src/routes/logout')
  app.use('/logout', logout)
  const ordenes = require('./src/routes/ordenes')
  app.use('/api/ordenes', ordenes)

  app.get('/artillery', (req, res) => {
    function isPrime (num) {
      if ([2, 3].includes(num)) return true
      else if ([2, 3].some(n => num % n == 0)) return false
      else {
        let i = 5,
          w = 2
        while (i ** 2 <= num) {
          if (num % i == 0) return false
          i += w
          w = 6 - w
        }
      }
      return true
    }
    const primes = []
    const max = Number(req.query.max) || 100000
    for (let i = 1; i <= max; i++) {
      if (isPrime(i)) primes.push(i)
    }
    res.json(primes)
  })

  app.use((req, res, next) => {
    res.status(404)
    res.send({
      error: -2,
      descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`
    })
  })

  const http = require('http')
  const server = http.createServer(app)

  const { Server } = require('socket.io')
  const io = new Server(server)

  io.on('connection', socket => {
    socket.emit('render', '')
    socket.on('actualizacion', () => {
      io.sockets.emit('render', '')
    })
  })

  server.listen(PORT, () => {
    console.log(
      `Servidor express escuchando en el puerto ${server.address().port}`
    )
    console.log(`PID WORKER ${process.pid}`)
  })
  server.on('error', error => console.log(`Error en servidor ${error}`))
}
