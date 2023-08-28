const { Product, Category } = require('../../database/config.js')

const updateProduct = async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'El ID debe ser un número válido' })
  }
  const { name, description, price, stock, category, active } = req.body
  try {
    const product = await Product.update({
      name,
      description,
      price,
      stock,
      active,
      categoryId: category
    }, { where: { id } })
    if (!product) return res.status(404).json({ error: `El product con id: ${id}, no se encontro` })
    const updateProduct = await Product.findOne({ where: { id }, include: Category, attributes: { exclude: ['categoryId'] } })
    res.json(updateProduct)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = updateProduct
