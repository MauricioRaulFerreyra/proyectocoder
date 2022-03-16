const {
  getPtosServ,
  getPtoIdServ,
  createPtoServ,
  updatePtoServ,
  deletePtoServ
} = require('../services/productosServ')

const logs = require('../logs')
const loggerError = logs.getLogger('error')

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

const getPtos = async (req, res) => {
  try {
    const response = await getPtosServ()
    res.send(response)
  } catch (error) {
    throw Error('Error en getPtos productosController')
  }
}

const getPtoId = async (req, res) => {
  try {
    const { id } = req.params
    const response = await getPtoIdServ(id)
    if (response.estado === 'ok') {
      res.send(response.producto)
    } else if (response.estado === 'ptoFalse') {
      res.status(400)
      res.send({ error: `Producto con ID ${id} no existe` })
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en getPtoId productosController')
  }
}

const createPto = async (req, res) => {
  try {
    const { nombre, descripcion, codigo, thumbail, precio, stock } = req.body
    const newObj = {
      timestamp: darFecha(),
      nombre,
      descripcion,
      codigo,
      thumbail,
      precio,
      stock
    }
    const response = await createPtoServ(newObj)
    res.send(response)
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en createPto productosController')
  }
}

const updatePto = async (req, res) => {
  try {
    const { nombre, descripcion, codigo, thumbail, precio, stock } = req.body
    const { id } = req.params
    const ptoMod = {
      id,
      timestamp: darFecha(),
      nombre,
      descripcion,
      codigo,
      thumbail,
      precio,
      stock
    }
    const response = await updatePtoServ(ptoMod, id)
    if (response.estado === 'ok') {
      res.send(response.producto)
    } else if (response.estado === 'ptoFalse') {
      res.status(400)
      res.send({ error: `Producto con ID ${id} no existe` })
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en updatePto productosController')
  }
}

const deletePto = async (req, res) => {
  try {
    const { id } = req.params
    const response = await deletePtoServ(id)
    if (response.estado === 'ok') {
      res.send(response.productos)
    } else if (response.estado === 'ptoFalse') {
      res.status(400)
      res.send({ error: `Producto con ID ${id} no existe` })
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en deletePto productosController')
  }
}

module.exports = {
  getPtos,
  getPtoId,
  createPto,
  updatePto,
  deletePto
}
