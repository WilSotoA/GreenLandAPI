const jwt = require('jsonwebtoken')
require('dotenv').config()

const { JWT_SECRET, JWT_LIFETIME } = process.env

const generateJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id }
    jwt.sign(
      payload,
      JWT_SECRET,
      {
        expiresIn: JWT_LIFETIME
      },
      (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token)
        }
      }
    )
  })
}

module.exports = generateJWT
