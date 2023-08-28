const { Router } = require('express')
const createOrder = require('../controllers/orders/createOrder.js')
const receiveWebHook = require('../controllers/orders/recieveWebHook.js')
const router = Router()

router.post('/', createOrder)

router.post('/webhook', receiveWebHook)

module.exports = router
