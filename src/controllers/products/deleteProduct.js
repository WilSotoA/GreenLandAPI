const { Product } = require('../../database/config.js')

const deleteProduct = async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'El ID debe ser un número válido' })
  }
  try {
    const product = await Product.findByPk(id)
    if (!product) return res.status(404).json({ error: `El product con id: ${id}, no se encontro` })
    await product.update({ active: false })
    res.json({ message: 'Producto inactivado exitosamente' })
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = deleteProduct
