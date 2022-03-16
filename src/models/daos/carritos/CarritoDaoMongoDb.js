const MongoDB = require('../../contenedores/MongoDb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

class CarritoDao extends MongoDB {
  constructor () {
    super(
      'carritos',
      new Schema({
        timestamp: { type: String, required: true },
        productos: { type: Array, required: true }
      })
    )
  }
}

module.exports = CarritoDao
