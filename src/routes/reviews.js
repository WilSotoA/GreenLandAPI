const allReviews = require('../controllers/reviews/allReviews.js')

const { Router } = require('express')
const router = Router()

router.get('/', allReviews)

module.exports = router
