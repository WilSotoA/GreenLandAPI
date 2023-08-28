const { Router } = require('express')
const filterController = require('../controllers/filters/filterProduct')
const router = Router()

router.post('/', filterController.filterDynamic)

module.exports = router
