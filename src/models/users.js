import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
  id: Number,
  nombre: String,
  metadata: Object,
})
const usersModel = mongoose.model("users", userSchema)
export default usersModel
