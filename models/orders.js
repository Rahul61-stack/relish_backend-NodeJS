const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    customerId:{
        type:String,
        required:true
    },
    itemList:{
        type:Array,
        required:true
    },
    address:{
        type:Array,
        required:true
    },
    dateOrdered:{
        type:Date,
        required:true,
        default:Date.now
    },
    paymentMethod:{
        type:String,
        required:true
    },
    tracking:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Orders',orderSchema)