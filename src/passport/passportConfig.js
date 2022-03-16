const bcrypt = require('bcrypt')
const saltRounds = 10
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const fs = require('fs')
const nodemailerConfig = require('../nodemailer-twilio/nodemailerConfig')
const Daos = require('../models/daos/configDb')

let carros = Daos.carritos
let users = Daos.users
let chats = Daos.chats

const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

function darFecha () {
  const fecha = new Date()
  let fechaOK =
    fecha.getDate() +
    '/' +
    (fecha.getMonth() + 1) +
    ' - ' +
    fecha.getHours() +
    ':' +
    fecha.getMinutes() +
    ':' +
    fecha.getSeconds()
  return fechaOK
}

passport.use(
  'local-signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      let user = await users.getByUser(username)
      const hash = bcrypt.hashSync(password, saltRounds)
      let avatar = undefined

      if (user) {
        loggerConsola.warn('El usuario ya existe')
        return done(null, false)
      }

      if (req.file) {
        fs.renameSync(
          req.file.path,
          req.file.path + '.' + req.file.mimetype.split('/')[1]
        )
        avatar = req.file.filename + '.' + req.file.mimetype.split('/')[1]
      }

      let { nombre, direccion, edad, telefono } = req.body
      let carrito = { timestamp: darFecha(), productos: [] }
      let aux = await carros.save(carrito)
      carrito = aux.id
      let chat = { timestamp: darFecha() }
      let auxChats = await chats.save(chat)
      chat = auxChats.id

      let userNew = await users.save({
        email: username,
        password: hash,
        nombre,
        direccion,
        edad,
        telefono,
        avatar,
        carrito,
        chat
      })

      const mailOptions = {
        from: 'servidor node.js',
        to: userNew.email,
        subject: 'Registro exitoso',
        html:
          'Bienvenido a nuestra aplicación <br>' +
          JSON.stringify(
            `Gracias por registrarte ${userNew.nombre} a nuestra aplicación hecha con los conocimientos del curso backend`
          )
      }
      const info = await nodemailerConfig.sendMail(mailOptions)

      return done(null, userNew)
    }
  )
)

passport.use(
  'local-login',
  new LocalStrategy(async (username, password, done) => {
    let user = await users.getByUser(username)

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user)
      }
    }
    return done(null, false)
  })
)

passport.serializeUser((user, done) => {
  return done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  let user = await users.getById(id)
  return done(null, user)
})

module.exports = passport
