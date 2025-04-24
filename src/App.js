
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import crypto from 'crypto'
const app = express()
// Middlewares
app.use(cors())//No:1 priority.it allows to interract with client which is located  in differnt domain.
app.use(express.json())//instructing the app to accept the data in json format.
app.use(cookieParser())
app.use(morgan("dev"))

  //routes
  app.use("/api/v1/auth",authRoutes)

  //generate secret keys
 /* const key=crypto.randomBytes(64).toString("hex")
  console.log(key)
  */


app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})
export default app