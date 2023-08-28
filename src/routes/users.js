const { Router } = require('express')
const upload = require('../config/multer.js')
const createUser = require('../controllers/users/createUser.js')
const { loginThirdUser, loginUser } = require('../controllers/users/loginUser.js')
// const { protect } = require('../middlewares/auth.js') // se tiene que pasar un token por authorizacion para pasar el protect
// const { restrictTo } = require('../middlewares/auth.js') // el rol nos indica que tipo de usuario puede acceder
const router = Router()

router.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), createUser)
router.post('/login', loginUser)
router.post('/loginThird', loginThirdUser)

// ejemplo
// protect, restrictTo("administrator")

module.exports = router
