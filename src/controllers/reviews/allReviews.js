const { Review, User, Product } = require('../../database/config.js')
const allReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'image']
        },
        {
          model: Product,
          attributes: ['name']
        }
      ],
      attributes: { exclude: ['userId', 'productId'] }
    })
    res.json(reviews)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = allReviews
