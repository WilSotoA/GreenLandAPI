const mercadopago = require('mercadopago')
const { db, Order, DetailOrder, Product, User } = require('../../database/config.js')
const { approvedPayment, declinedPayment } = require('../../utils/emails.js')

const receiveWebHook = async (req, res) => {
  const payment = req.query
  try {
    if (payment.type === 'payment') {
      const data = await mercadopago.payment.findById(payment['data.id'])
      const { external_reference: userId, status, date_approved: date } = data.response
      const user = await User.findByPk(parseInt(userId))

      if (status === 'approved') {
        const { items } = data.response.additional_info

        const totalPrice = items.reduce((accumulator, product) => accumulator + parseInt(product.unit_price), 0)
        const order = await Order.create({ date, totalPrice, status, userId: user.id })

        // Guardar detail en db
        const details = items.map(product => {
          return {
            quantity: parseInt(product.quantity),
            price: parseInt(product.unit_price),
            productId: parseInt(product.id),
            orderId: order.id
          }
        })

        const detailOrder = await DetailOrder.bulkCreate(details)

        // Actualizar Stock
        for (const detail of detailOrder) {
          const { productId, quantity } = detail
          await Product.update(
            { stock: db.literal(`stock - ${quantity}`) },
            { where: { id: productId } }
          )
        }
        // Obtener fecha orden
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const monthName = months[order.date.getMonth()]
        const day = order.date.getDate()
        const year = order.date.getFullYear()

        await approvedPayment(user.name, user.email, order.id, `${monthName} ${day}, ${year}`, order.totalPrice)
      }
      if (status === 'rejected') {
        await declinedPayment(user.name, user.email)
        return res.json({ message: 'rejected payment' })
      }
    }
    res.json({ message: 'processing payment...' })
  } catch (error) {
    console.log(error.message)
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = receiveWebHook
