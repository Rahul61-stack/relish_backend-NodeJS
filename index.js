const itemRouter = require('./APIs/items')
const customerRouter = require('./APIs/customer')
const connect = require('./connection')
const cors = require('cors')
const express = require('express')
const orderRouter = require('./APIs/order')
const app = express()

connect.ConnectToMongoDB()
app.use(cors())
app.use(express.json())
app.use('/items',itemRouter)
app.use('/customers',customerRouter)
app.use('/orders',orderRouter)

export default app;




