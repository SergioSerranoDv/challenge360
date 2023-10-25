import express from "express"
import { config } from "dotenv"
import connectDb from "./src/config/db.js"
import productsRouter from "./src/routes/products.js"
const app = express()
config()
connectDb()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", productsRouter)
app.get("/", (req, res) => {
  res.send({
    instructions: "💻 Hi, this is the API for the NodeJS challange ",
    endpoints: {
      products: "/products",
      prices: "/products/:user_id/:nombre_producto",
    },
    author: "Sergio Serrano",
    version: "1.0.0",
    repository: "🌐https://github.com/SergioSerranoDv/challenge360",
  })
})
app.listen(process.env.API_PORT, () => {
  console.log(`Example app listening on port ${process.env.API_PORT}`)
})
