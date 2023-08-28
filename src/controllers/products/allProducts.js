const { getAllProducts } = require('../../utils/getProduct.js')

const allProducts = async (req, res) => {
  try {
    const products = await getAllProducts()
    res.json(products)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = allProducts
