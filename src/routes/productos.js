const express = require('express')
//const middlewares = require('../middlewares/middlewares')
const {
  getPtos,
  getPtoId,
  createPto,
  updatePto,
  deletePto
} = require('../controllers/productosController')

const app = express()
app.use(express.json())
const router = express.Router()

const verificar = (req, res, next) => {
  //console.log(req.user)
  next()
}

router.get('/', getPtos)

router.get('/:id', getPtoId)

router.post('/', createPto) // middlewares.isAdmin

router.put('/:id', updatePto) // middlewares.isAdmin

router.delete('/:id', deletePto) // middlewares.isAdmin

module.exports = router
