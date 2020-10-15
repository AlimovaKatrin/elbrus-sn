const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config({ path: '../.env' })

const app = express()

const PORT = process.env.PORT_FOR_DEV || 6000

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

const start = () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION_FOR_DEV, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }).then(() => console.log('DB connected'))

    app.listen(PORT, () => {console.log(`Server start... on port ${PORT}`)})
  } catch (e) {
    console.log('Error on server...', e.message)
  }
}

start()
