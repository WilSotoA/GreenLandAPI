const { db, Product, Category } = require('../database/config.js')

const getAllProducts = async (param = {}) => {
  try {
    const product = await Product.findAll({
      where: param,
      include: [Category],
      order: ['id'],
      attributes: {
        exclude: ['categoryId'],
        include: [
          [
            db.literal(`(
                            SELECT CAST(AVG(review."rating") AS FLOAT)
                            FROM reviews AS review
                            WHERE
                                review."productId" = product.id
                          )`),
            'rating'
          ]
        ]
      }
    })
    return product
  } catch (error) {
    throw new Error(error)
  }
}

const getProduct = async (param = {}) => {
  try {
    const product = await Product.findOne({
      where: param,
      include: [Category],
      attributes: {
        exclude: ['categoryId'],
        include: [
          [
            db.literal(`(
                              SELECT CAST(AVG(review."rating") AS FLOAT)
                              FROM reviews AS review
                              WHERE
                                  review."productId" = product.id
                            )`),
            'rating'
          ]
        ]
      }
    })
    return product
  } catch (error) {
    throw new Error(error)
  }
}
module.exports = {
  getAllProducts,
  getProduct
}
