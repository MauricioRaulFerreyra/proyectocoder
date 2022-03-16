const {
  getOrdenesServ,
  createOrderServ,
  deleteOrdenesServ
} = require('../services/ordenesServ')

const logs = require('../logs')
const loggerError = logs.getLogger('error')

const getOrdenes = async (req, res) => {
  try {
    const response = await getOrdenesServ()
    res.send(response)
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en getOrdenes ordenesController')
  }
}

const deleteOrdenes = async (req, res) => {
  try {
    const response = await deleteOrdenesServ()
    res.send(response)
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en getOrdenes ordenesController')
  }
}

const createOrder = async (req, res) => {
  try {
    const { idCarrito } = req.params
    const idUser = req.user.id
    const response = await createOrderServ(idCarrito, idUser)
    if (response.estado === 'ok') {
      res.send(response.orden)
    } else if (response.estado === 'carritoFalse') {
      res.status(400)
      res.send({ error: `Carrito con ID ${idCarrito} no existe` })
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en createOrder ordenesController')
  }
}

module.exports = {
  getOrdenes,
  createOrder,
  deleteOrdenes
}
