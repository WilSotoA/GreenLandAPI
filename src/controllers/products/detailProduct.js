const { getProduct } = require('../../utils/getProduct')

const detailProduct = async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: 'El ID debe ser un número válido' })
  }
  try {
    const products = await getProduct({ id })
    if (!products) return res.status(404).json({ error: `El product con id: ${id}, no se encontro` })
    res.json(products)
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = detailProduct
