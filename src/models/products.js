import mongoose from "mongoose"
const productsSchema = new mongoose.Schema({
  nombre: String,
  precio_base: Number,
  existencia: Number,
})
const productsModel = mongoose.model("products", productsSchema)
export default productsModel
