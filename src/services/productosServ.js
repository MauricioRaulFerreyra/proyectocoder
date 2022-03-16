const Daos = require('../models/daos/configDb')

const productos = Daos.productos

const logs = require('../logs')
const loggerConsola = logs.getLogger('consola')
const loggerError = logs.getLogger('error')

const getPtosServ = async () => {
  try {
    const response = await productos.getAll()
    return response
  } catch (error) {
    throw Error('Error en getPtosServ')
  }
}

const getPtoIdServ = async id => {
  try {
    const ptoId = await productos.getById(id)

    if (Object.keys(ptoId).length != 0) {
      return { estado: 'ok', producto: ptoId }
    } else {
      return { estado: 'ptoFalse' }
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en getPtoIdServ')
  }
}

const createPtoServ = async newPto => {
  try {
    const addPto = await productos.save(newPto)
    return addPto
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en createPtoServ')
  }
}

const updatePtoServ = async (ptoMod, id) => {
  try {
    let flag = await productos.getById(id)
    if (Object.keys(flag).length != 0) {
      const pto = await productos.update(ptoMod)
      return { estado: 'ok', producto: pto }
    } else {
      return { estado: 'ptoFalse' }
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en updatePtoServ')
  }
}

const deletePtoServ = async id => {
  try {
    let flag = await productos.getById(id)

    if (Object.keys(flag).length != 0) {
      await productos.deleteById(id)
      const ptosAll = await productos.getAll()
      return { estado: 'ok', productos: ptosAll }
    } else {
      return { estado: 'ptoFalse' }
    }
  } catch (error) {
    loggerError.error(error)
    throw Error('Error en deletePtoServ')
  }
}

module.exports = {
  getPtosServ,
  getPtoIdServ,
  createPtoServ,
  updatePtoServ,
  deletePtoServ
}
