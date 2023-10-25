import express from "express"
import { config } from "dotenv"
import connectDb from "./config/db.js"
import productsRouter from "./routes/products.js"
const app = express()
config()
connectDb()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", productsRouter)
app.listen(process.env.PORT, () => {
  console.log("Example app listening on port 3000!")
})
