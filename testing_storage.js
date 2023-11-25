require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error',(error)=> console.error(error))
db.once('open',()=>console.log('Connect to database'))

// server can accept json
app.use(express.json)

const blockchainRouter = require('./routes/blockchain.js')
app.use(blockchainRouter)

app.listen(3000,() => console.log('Server Started'))