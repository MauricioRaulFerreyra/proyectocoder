const Daos = require('../models/daos/configDb')
const nodemailerConfig = require('../nodemailer-twilio/nodemailerConfig')
const twilioConfig = require('../nodemailer-twilio/twilioConfig')

const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

let carros = Daos.carritos
let ordenes = Daos.ordenes
let user = Daos.users

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

const getOrdenesServ = async () => {
  try {
    const orders = ordenes.getAll()
    return orders
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en getOrdenesServ')
  }
}

const deleteOrdenesServ = async () => {
  try {
    const orders = ordenes.deleteById()
    return orders
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en deleteOrdenesServ')
  }
}

const createOrderServ = async (idCarrito, idUser) => {
  try {
    let carrito = await carros.getById(idCarrito)
    let cliente = await user.getById(idUser)
    //console.log(cliente)
    if (carrito) {
      const productos = carrito.productos

      let newObj = {
        timestamp: darFecha(),
        user: idUser,
        productos
      }

      await ordenes.save(newObj)

      //console.log(newObj)

      const mailOptions = {
        from: 'Servidor node.js',
        to: cliente.email,
        subject: 'Nuevo pedido',
        html:
          'Productos solicitados <br>' +
          JSON.stringify(
            productos[0].nombre + '  ' + '$' + productos[0].precio,
            null,
            2
          )
      }
      const info = await nodemailerConfig.sendMail(mailOptions)
      /*
      const whasapoptions = {
        body:
          'Productos solicitados: ' +
          JSON.stringify(
            productos[0].nombre + ' ' + '$' + productos[0].precio,
            null,
            2
          ),
        from: '+19402907476', // +19402907476
        to: cliente.telefono // Argentina +54 + número de celular
      }
      const message = await twilioConfig.messages.create(whasapoptions)

      const sms = await twilioConfig.messages.create({
        body: 'Gracias por su compra, estamos procesando su pedido',
        from: '+19402907476',
        to: cliente.telefono // Argentina +54 + número de celular(3416663403)
      }) */
      // console.log(message)
      //console.log(sms)
      return { estado: 'ok', orden: newObj }
    } else {
      return { estado: 'carritoFalse' }
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en createOrderServ')
  }
}

module.exports = {
  getOrdenesServ,
  createOrderServ,
  deleteOrdenesServ
}
