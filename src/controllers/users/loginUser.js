const bcrypt = require('bcrypt')
const { User } = require('../../database/config')
const generateJWT = require('../../utils/jwt')
const { loginUserSuccess } = require('../../utils/emails')

const loginThirdUser = async (req, res) => {
  const { name, email, picture, origin } = req.body
  if (!name || !email || !picture || !origin) return res.status(400).json({ error: 'Incomplete required data' })
  try {
    const userExist = await User.findOne({ where: { email } })
    if (userExist && userExist.origin !== origin.toLowerCase()) return res.status(409).json({ error: `Email registered, Login with ${userExist.origin}` })

    if (!userExist) {
      await User.create({
        name,
        email,
        image: picture,
        roleId: 2,
        origin: origin.toLowerCase()
      })
    }
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['password', 'active', 'created'] }
    })

    if (user.active === false) return res.status(401).json({ error: 'User inactive' })

    const token = await generateJWT(user.id)

    await loginUserSuccess(user.name, user.email)

    res.json({ user, token })
  } catch (error) {
    return res.status(error.response?.status || 500).json({ error: error.message })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Incomplete required data' })
  try {
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ['active', 'created'] }
    })

    if (!user) return res.status(409).json({ error: 'User not found' })

    if (user.origin !== 'greenland') return res.status(409).json({ error: `Email registered, Login with ${user.origin}` })

    if (user.active === false) return res.status(401).json({ error: 'User inactive' })

    const validPassword = await bcrypt.compare(password, user.password)

    const userObject = user.get() // Convertir la instancia en un objeto plano
    delete userObject.password
    delete userObject.origin

    if (!validPassword) return res.status(401).json({ error: 'Invalid password' })

    const token = await generateJWT(user.id)

    await loginUserSuccess(user.name, user.email)

    res.json({ user: userObject, token })
  } catch (error) {
    return res.status(error.response?.status || 500).json({ error: error.message })
  }
}
module.exports = {
  loginUser,
  loginThirdUser
}
