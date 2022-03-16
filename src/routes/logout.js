const express = require('express')

const { Router } = express
const router = new Router()

router.get('/', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
