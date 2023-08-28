const uploadFile = require('../../utils/uploadFile.js')
const { Product } = require('../../database/config')

const newProduct = async (req, res) => {
  const { name, description, price, stock, category } = req.body
  const image = req.files.image
  if (!name || !description || !price || !stock || !category) return res.status(400).json({ error: 'Incomplete required data' })
  try {
    const { downloadURL } = await uploadFile(image[0])

    const productCreate = await Product.create({
      name,
      description,
      price,
      stock,
      image: downloadURL,
      categoryId: category
    })
    if (!productCreate) {
      throw new Error('Product creation failed')
    }
    return res.json({ message: 'Product created successfully' })
  } catch (error) {
    return res.status(error.response?.status || 500).json({ error: error.message })
  }
}

module.exports = newProduct
