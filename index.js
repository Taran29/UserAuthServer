import express from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import {
  register,
  login,
  forgotPassword,
  updateName
} from './routes/index.js'

config()

const app = express()
app.use(express.json())
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, x-forgot-password-token");
  next();
});
app.use('/api/register', register)
app.use('/api/login', login)
app.use('/api/forgotPassword', forgotPassword)
app.use('/api/updateName', updateName)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB...")
  }).catch((err) => {
    console.error(err)
  })

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})