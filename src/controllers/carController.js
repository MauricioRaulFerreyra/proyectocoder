const {
  createCarServ,
  addPtoToCarServ,
  deleteCarServ,
  deletePtoFromCarServ,
  getPtosFromCarServ,
  getCarServ
} = require('../services/carritoServ')

const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

const createCar = async (req, res) => {
  try {
    let idCarrito = await createCarServ()
    res.send(idCarrito)
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en createCar carController')
  }
}

const addPtoToCar = async (req, res) => {
  try {
    const { idPto, idCarrito } = req.params
    const response = await addPtoToCarServ(idPto, idCarrito)
    if (response.estado === 'ok') {
      res.send(response.carrito)
    } else if (response.estado === 'carritoFalse') {
      res.status(400)
      res.send({ error: `Carrito con ID ${idCarrito} no existe` })
    } else if (response.estado === 'ptoFalse') {
      res.status(400)
      res.send({ error: `Producto con ID ${idPto} no existe` })
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en addPtoToCar carController')
  }
}

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params
    const response = await deleteCarServ(id)
    if (response.estado === 'ok') {
      res.send({ message: `Carrito con ID ${id} borrado` })
    } else if (response.estado === 'carritoFalse') {
      res.status(400)
      res.send({ error: `Carrito con ID ${id} no existe` })
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en deleteCar carController')
  }
}

const deletePtoFromCar = async (req, res) => {
  try {
    const { idPto, idCarrito } = req.params
    const response = await deletePtoFromCarServ(idPto, idCarrito)
    if (response.estado === 'ok') {
      res.send(response.carrito)
    } else if (response.estado === 'carritoFalse') {
      res.status(400)
      res.send({ error: `Carrito con ID ${idCarrito} no existe` })
    } else if (response.estado === 'ptoFalse') {
      res.status(400)
      res.send({ error: `Producto con ID ${idPto} no existe` })
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en deletePtoFromCar carController')
  }
}

const getPtosFromCar = async (req, res) => {
  try {
    const { id } = req.params
    const response = await getPtosFromCarServ(id)

    if (response.estado === 'ok') {
      res.send(response.products)
    } else if (response.estado === 'carritoFalse') {
      res.status(400)
      res.send({ error: `Carrito con ID ${id} no existe` })
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en getPtosFromCar carController')
  }
}

const getCar = async (req, res) => {
  try {
    const response = await getCarServ()
    res.send(response)
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en getCar carController')
  }
}

module.exports = {
  createCar,
  addPtoToCar,
  deleteCar,
  deletePtoFromCar,
  getPtosFromCar,
  getCar
}
