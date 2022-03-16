const express = require('express')
const app = express()
app.use(express.json())

module.exports = {
  isAdmin: function (req, res, next) {
    if (req.user === undefined) {
      console.log('este es el middlewares', req.user.isAdmin)
      res.redirect('/login')
    } else {
      if (req.user.isAdmin) {
        console.log('este es el middeleware', req.user.isAdmin)
        next()
      } else {
        res.status(403)
        res.send({
          error: -1,
          descripcion: `ruta ${req.originalUrl} metodo ${req.method} no autorizada`
        })
      }
    }
  },
  isRegister: function (req, res, next) {
    if (req.user === undefined) {
      res.redirect('/login')
    } else {
      next()
    }
  }
}
