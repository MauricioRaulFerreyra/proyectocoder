let productosDao
let carritosDao
let ordenesDao
let usersDao
let chatsDao

let contenedor = 'mongodb'
switch (contenedor) {
  case 'txt':
    const ProductosDaoArchivo = require('./productos/ProductosDaoMongoDb')
    const CarritosDaoArchivo = require('./carritos/CarritoDaoMongoDb')

    productosDao = new ProductosDaoArchivo()
    carritosDao = new CarritosDaoArchivo()
    break
  case 'firebase':
    const ProductosDaoFirebase = require('./productos/ProductosDaoFirebase')
    const CarritosDaoFirebase = require('./carritos/CarritosDaoFirebase')

    productosDao = new ProductosDaoFirebase()
    carritosDao = new CarritosDaoFirebase()
    break
  case 'mongodb':
    const ProductosDaoMongoDb = require('./productos/ProductosDaoMongoDb')
    const CarritosDaoMongoDb = require('./carritos/CarritoDaoMongoDb')
    const OrdenesDaoMongoDb = require('./ordenes/OrdenesDaoMongoDb')
    const UsersDaoMongoDb = require('./users/UsersDaoMongoDb')
    const ChatsDaoMongoDb = require('./chats/ChatsDaoMongoDb')

    productosDao = new ProductosDaoMongoDb()
    carritosDao = new CarritosDaoMongoDb()
    ordenesDao = new OrdenesDaoMongoDb()
    usersDao = new UsersDaoMongoDb()
    chatsDao = new ChatsDaoMongoDb()
    break
}

exports.carritos = carritosDao
exports.productos = productosDao
exports.ordenes = ordenesDao
exports.users = usersDao
exports.chats = chatsDao
