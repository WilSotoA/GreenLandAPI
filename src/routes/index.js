const { Router } = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const categoryRouter = require('./categories.js')
const productRouter = require('./products.js')
const userRouter = require('./users.js')
const filterRouter = require('./filters.js')
const reviewRouter = require('./reviews.js')
const orderRouter = require('./orders.js')
const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/categories', categoryRouter)

router.use('/products', productRouter)

router.use('/users', userRouter)

router.use('/filters', filterRouter)

router.use('/reviews', reviewRouter)

router.use('/orders', orderRouter)

module.exports = router
