const allCategories = require('../controllers/categories/allCategories.js')

const { Router } = require('express')
const router = Router()

router.get('/', allCategories)

module.exports = router
