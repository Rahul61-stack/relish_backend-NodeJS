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
        paymentMethod:req.body.pType,
        trackking:req.body.tracking
    })
    try{
        const newOrder = await order.save()
        res.status(201).json({message:"Order placed successfully"})
        console.log(newOrder)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})
 //API TO GET ORDERS BASED ON CUSTOMERID
 orderRouter.get('/:id',async(req,res)=>{
    try{
        const orders = await Order.find({customerId:req.params.id})
        res.status(200).json(orders)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
 })
module.exports = orderRouter