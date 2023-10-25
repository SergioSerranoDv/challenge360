import { Router } from "express"
import {
  getProducts,
  getProductsWithSpecialPrices,
} from "../controllers/products.js"

const productsRouter = Router()

productsRouter.get("/products", getProducts)
productsRouter.get(
  "/price/:user_id/:nombre_producto",
  getProductsWithSpecialPrices
)
export default productsRouter
