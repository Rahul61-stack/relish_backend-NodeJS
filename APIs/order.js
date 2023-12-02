const mongoose = require('mongoose')
const express = require('express')
const orderRouter = express.Router()
const Order = require('../models/orders')
orderRouter.use(express.json())
//API TO CREATE ORDER
orderRouter.post('/',async(req,res)=>{
    let order = new Order({
        customerId:req.body.customerId,
        itemList:req.body.itemList,
        address:req.body.address,
        paymentMethod:req.body.pType
    })
    try{
        const newOrder = await order.save()
        res.status(201).json({message:"Order placed successfully"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = orderRouter