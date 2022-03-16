const express = require('express')
const middlewares = require('../middlewares/middlewares')
const {
  getOrdenes,
  createOrder,
  deleteOrdenes
} = require('../controllers/ordenesController')

const router = express.Router()

router.get('/', middlewares.isAdmin, getOrdenes) // middlewares.isAdmin

router.post('/:idCarrito', middlewares.isRegister, createOrder) // middlewares.isRegister

router.delete('/:idCarrito/:id', deleteOrdenes)

module.exports = router
