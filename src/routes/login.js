const express = require('express')
const passportConfig = require('../passport/passportConfig')
const { getUser } = require('../controllers/loginController')
const { NetworkContext } = require('twilio/lib/rest/supersim/v1/network')

const app = express()
const { Router } = express
const router = new Router()

router.get('/', getUser)

router.post(
  '/',
  passportConfig.authenticate('local-login', {
    successRedirect: '/index.html',
    failureRedirect: '/loginError.html'
  })
)

module.exports = router
