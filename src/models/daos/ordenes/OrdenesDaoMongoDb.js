const MongoDB = require('../../contenedores/MongoDb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

class OrdenesDao extends MongoDB {
  constructor () {
    super(
      'ordenes',
      new Schema({
        timestamp: { type: String, required: true },
        productos: { type: Array, required: true },
        estado: { type: String, default: 'generada', required: true },
        user: { type: Schema.ObjectId, ref: 'users' }
      })
    )
  }
}

module.exports = OrdenesDao
