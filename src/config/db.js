/** @format */

import mongoose from "mongoose"
const connectDb = async () => {
  let reconnectionAttempts = 0
  const maxReconnectionAttempts = 10
  try {
    mongoose.set("strictQuery", true)
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    const url = ` ${connection.connection.host}:${connection.connection.port}`
    console.log(`Mongo Db conected in: ${url}`)
  } catch (error) {
    console.log(`error: ${error.message}`)
    process.exit(1)
  }
  mongoose.connection.on("disconnected", async () => {
    console.log("Mongo DB disconnected! Attempting to reconnect.")
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
      })
      console.log("Mongo DB reconnected successfully")
    } catch (error) {
      if (reconnectionAttempts < maxReconnectionAttempts) {
        setTimeout(() => {
          reconnectionAttempts++
          console.log(`Reconnection attempt ${reconnectionAttempts} failed`)
          mongoose.connection.emit("disconnected")
        }, 5000)
      } else {
        console.log(`Reconnection attempts exhausted`)
        process.exit(1)
      }
      console.error(`Reconnection error ${error.message}`)
    }
  })
}
export default connectDb
