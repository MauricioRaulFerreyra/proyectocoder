const Daos = require('../models/daos/configDb')

const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

let carros = Daos.carritos
let productos = Daos.productos

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

const createCarServ = async () => {
  try {
    let carrito = {
      timestamp: darFecha(),
      productos: []
    }
    let aux = await carros.save(carrito)
    return { id: aux.id }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en createCarServ')
  }
}

const addPtoToCarServ = async (idPto, idCarrito) => {
  try {
    let ptoId = await productos.getById(idPto)

    if (Object.keys(ptoId).length != 0) {
      let carrito = await carros.getById(idCarrito)

      if (carrito) {
        carrito.productos.push(ptoId)
        carros.update(carrito)
        return { estado: 'ok', carrito: carrito }
      } else {
        return { estado: 'carritoFalse' }
      }
    } else {
      return { estado: 'ptoFalse' }
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en addPtoToCarSev')
  }
}

const deleteCarServ = async id => {
  try {
    let flag = await carros.getById(id)
    if (Object.keys(flag).length != 0) {
      await carros.deleteById(id)
      return { estado: 'ok' }
    } else {
      return { estado: 'carritoFalse' }
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en deleteCarSev')
  }
}

const deletePtoFromCarServ = async (idPto, idCarrito) => {
  try {
    let carritoId = await carros.getById(idCarrito)

    if (Object.keys(carritoId).length != 0) {
      let ptosCarro = carritoId.productos

      let indexPto = ptosCarro.findIndex(aux => aux.id == idPto)
      if (indexPto >= 0) {
        carritoId.productos.splice(indexPto, 1)
        carros.update(carritoId)
        return { estado: 'ok', carrito: carritoId }
      } else {
        return { estado: 'ptoFalse' }
      }
    } else {
      return { estado: 'carritoFalse' }
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en deletePtoFromCarSev')
  }
}

const getPtosFromCarServ = async id => {
  try {
    let carrito = await carros.getById(id)
    if (carrito) {
      const ptos = carrito.productos
      return { estado: 'ok', products: ptos }
    } else {
      return { estado: 'carritoFalse' }
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error obteniendo en getPtosFromCarSev')
  }
}

const getCarServ = async () => {
  try {
    let aux = await carros.getAll()
    return aux
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en getCarSev')
  }
}

module.exports = {
  createCarServ,
  addPtoToCarServ,
  deleteCarServ,
  deletePtoFromCarServ,
  getPtosFromCarServ,
  getCarServ
}
