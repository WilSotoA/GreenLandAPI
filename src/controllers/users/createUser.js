const bcrypt = require('bcrypt')
const uploadFile = require('../../utils/uploadFile.js')
const { User } = require('../../database/config.js')
const generateJWT = require('../../utils/jwt.js')
const { newUserEmail } = require('../../utils/emails.js')

const createUser = async (req, res) => {
  const { name, email, password } = req.body
  const image = req.files?.image
  if (!name || !email || !password) return res.status(400).json({ error: 'Incomplete required data' })
  try {
    const user = await User.findOne({ where: { email } })

    if (user && user.origin !== 'greenland') return res.status(409).json({ error: `Email registered, Login with ${user.origin}` })
    else if (user) return res.status(409).json({ error: 'Already registered' })
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    let downloadURL = 'https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_640.png'
    if (image) {
      const { downloadURL: uploadedDownloadURL } = await uploadFile(image[0])
      downloadURL = uploadedDownloadURL
    }
    const userCreate = await User.create({
      name,
      email,
      image: downloadURL,
      password: passwordHash,
      roleId: 2
    })

    await generateJWT(userCreate.id)

    await newUserEmail(userCreate.name, userCreate.email)

    res.json({ message: 'User created sucessfully' })
  } catch (error) {
    return res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = createUser
