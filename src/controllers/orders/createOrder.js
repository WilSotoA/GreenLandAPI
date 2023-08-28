const mercadopago = require('mercadopago')
require('dotenv').config()
const { SERVER_URL, CLIENT_URL, PAY_TOKEN } = process.env
const createOrder = async (req, res) => {
  const { userId, products } = req.body
  mercadopago.configure({
    access_token: PAY_TOKEN
  })
  try {
    const result = await mercadopago.preferences.create({
      items: products,
      back_urls: {
        success: `${CLIENT_URL}/shop`,
        failure: `${CLIENT_URL}/shop`,
        pending: `${CLIENT_URL}/shop`
      },
      auto_return: 'approved',
      notification_url: `${SERVER_URL}/orders/webhook`,
      external_reference: userId.toString(),
      binary_mode: true
    })
    res.send(result.body.init_point)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = createOrder
