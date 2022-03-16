const express = require('express')
const multer = require('multer')
const upload = multer({ dest: 'public/avatars/' })

const { Router } = express
const router = new Router()
const passportConfig = require('../passport/passportConfig')

router.post(
  '/',
  upload.single('avatar'),
  passportConfig.authenticate('local-signup', {
    successRedirect: '/login.html',
    failureRedirect: '/registerError.html'
  })
)

module.exports = router
