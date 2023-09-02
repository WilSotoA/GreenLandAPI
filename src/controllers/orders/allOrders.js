const { Order, User } = require('../../database/config.js')

const allOrders = async (req, res) => {
  try {
    const order = await Order.findAll({
      include: [{
        model: User,
        attributes: ['id', 'name', 'email']
      }],
      attributes: {
        exclude: ['userId']
      }
    })
    if (!order || !order.length) return res.status(404).json({ error: 'Orders not found' })
    res.json(order)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = allOrders
