const ContMongoDB = require('../../contenedores/MongoDb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

class ChatsDao extends ContMongoDB {
  constructor () {
    super(
      'chats',
      new Schema({
        timestamp: { type: String, required: true },
        messages: { type: Array, required: true, default: [] }
      })
    )
  }
}

module.exports = ChatsDao
