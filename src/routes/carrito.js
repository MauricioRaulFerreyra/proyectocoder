const express = require('express')
const middlewares = require('../middlewares/middlewares')
const {
  createCar,
  addPtoToCar,
  deleteCar,
  deletePtoFromCar,
  getPtosFromCar,
  getCar
} = require('../controllers/carController')

const router = express.Router()

router.post('/', middlewares.isRegister, createCar) //middlewares.isRegister

router.post('/:idCarrito/:idPto', middlewares.isRegister, addPtoToCar) // middlewares.isRegister

router.delete('/:id', middlewares.isRegister, deleteCar) // middlewares.isRegister

router.delete('/:idCarrito/:idPto', middlewares.isRegister, deletePtoFromCar) // middlewares.isRegister

router.get('/:id', middlewares.isRegister, getPtosFromCar) // middlewares.isRegister

router.get('/', middlewares.isAdmin, getCar) // middlewares.isAdmin

module.exports = router
