const express = require('express')
const {
  getPublicChat,
  postPublicMsg,
  getChatByEmail,
  getPriveteChatByUser,
  postPrivateMessage
} = require('../controllers/chatController')

const router = express.Router()

router.get('/', getPublicChat)

router.post('/', postPublicMsg)

router.get('/private', getPriveteChatByUser)

router.get('/:email', getChatByEmail)

router.post('/private', postPrivateMessage)

module.exports = router
