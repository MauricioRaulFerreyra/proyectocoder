const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MongoDB = require('../../contenedores/MongoDb')

const logs = require('../../../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

class UsersDao extends MongoDB {
  constructor () {
    super(
      'users',
      new Schema({
        email: { type: String, required: true },
        password: { type: String, required: true },
        nombre: { type: String, required: true },
        direccion: { type: String, required: true },
        edad: { type: Number, required: true },
        telefono: { type: String, required: true },
        avatar: {
          type: String,
          default: '720.jpg',
          required: false
        },
        isAdmin: { type: Boolean, default: false, required: true },
        carrito: { type: Schema.ObjectId, ref: 'carritos' },
        chat: { type: Schema.ObjectId, ref: 'mensajes' }
      })
    )
  }

  async getByUser (username) {
    try {
      let docs = false
      docs = await super.getAll()
      for (const user of docs) {
        if (user.email === username) {
          return user
        }
      }
      return false
    } catch (error) {
      loggerError.error(error)
      throw Error('Error en getByUser')
    }
  }
}

module.exports = UsersDao
