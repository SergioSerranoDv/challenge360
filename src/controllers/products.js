import productsModel from "../models/products.js"
import usersModel from "../models/users.js"
export const getProducts = async (req, res) => {
  try {
    const products = await productsModel.find({
      existencia: { $gt: 0 },
    })
    return res.status(200).send(products)
  } catch (error) {
    console.log(error.message)
    return res.status(500).send("Error retrieving products")
  }
}
export const getProductsWithSpecialPrices = async (req, res) => {
  try {
    const { user_id, nombre_producto } = req.params
    const users = await usersModel.find()
    const products = await productsModel.find({
      existencia: { $gt: 0 },
    })

    const product = products.find(
      (product) => product.nombre === nombre_producto
    )

    if (!product) {
      return res.status(404).send("Product not found")
    }
    const user = users.find((user) => user.id === Number(user_id))

    if (user && user.metadata) {
      const specilProduct = user.metadata.precios_especiales.find(
        (product) => product.nombre_producto === nombre_producto
      )
      if (specilProduct) {
        return res
          .status(200)
          .send({ specialPrice: specilProduct.precio_especial_personal })
      }
    }
    return res.status(200).send({ precio_base: product.precio_base })
  } catch (error) {
    console.log(error.message)
    return res.status(500).send("Error retrieving products")
  }
}
