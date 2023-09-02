const allReviews = require('../controllers/reviews/allReviews.js')
const reviewPerProduct = require('../controllers/reviews/reviewPerProduct.js')
const newReview = require('../controllers/reviews/newReview.js')
const deleteReview = require('../controllers/reviews/deleteReview.js')
const { protect } = require('../middlewares/auth.js')
const { restrictTo } = require('../middlewares/auth.js')

const { Router } = require('express')
const router = Router()

router.get('/', allReviews)

router.get('/product/:id', reviewPerProduct)

router.post('/', protect, restrictTo('administrator', 'guest'), newReview)

router.delete('/:id', protect, restrictTo('administrator', 'guest'), deleteReview)

module.exports = router
