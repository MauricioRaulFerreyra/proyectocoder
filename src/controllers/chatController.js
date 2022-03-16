const Daos = require('../models/daos/configDb')

let chats = Daos.chats
let users = Daos.users

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

const idChatGral = '854fd8e0dd70c9a63c74ea41'

const getPublicChat = async (req, res) => {
  const chatGral = await chats.getById(idChatGral)
  res.send(chatGral.messages)
}

const postPublicMsg = async (req, res) => {
  let tipo
  const msg = req.body.msg
  const chatGral = await chats.getById(idChatGral)
  if (req.user.isAdmin) {
    tipo = 'sistema'
  } else {
    tipo = 'usuario'
  }

  const newMessage = {
    timestamp: darFecha(),
    author: `${req.user.email}`,
    body: msg,
    tipo
  }
  chatGral.messages.push(newMessage)
  await chats.update(chatGral)
  res.send(chatGral.messages)
}

const getChatByEmail = async (req, res) => {
  const email = req.params.email
  const chatGral = await chats.getById(idChatGral)
  const msgArray = chatGral.messages
  const msgGral = msgArray.filter(element => {
    if (element.author === email) {
      return element
    }
  })
  res.send(msgGral)
}

const getPriveteChatByUser = async (req, res) => {
  let chat
  if (req.user.isAdmin) {
    const user = await users.getByUser(req.body.email)
    chat = user.chat
  } else {
    chat = req.user.chat
  }
  const chatUser = await chats.getById(chat)
  res.send(chatUser)
}

const postPrivateMessage = async (req, res) => {
  let chat
  let tipo
  if (req.user.isAdmin) {
    const user = await users.getByUser(req.body.email)
    chat = user.chat
    tipo = 'sistema'
  } else {
    chat = req.user.chat
    tipo = 'usuario'
  }

  const msg = req.body.msg
  const chatUser = await chats.getById(chat)

  const newMessage = {
    timestamp: darFecha(),
    author: `${req.user.email}`,
    body: msg,
    tipo
  }
  chatUser.messages.push(newMessage)
  await chats.update(chatUser)
  res.send(chatUser)
}

const borrarChat = async () => {
  const chatUser = await chats.getById('574f812475488aee648f2f58')
  chatUser.messages = []
  await chats.update(chatUser)
}

//id chat general = '854fd8e0dd70c9a63c74ea41'
module.exports = {
  getPublicChat,
  postPublicMsg,
  getChatByEmail,
  getPriveteChatByUser,
  postPrivateMessage
}
