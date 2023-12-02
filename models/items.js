const mongoose = require('mongoose')
const itemsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    sale:{
        type:Boolean,
        required:true
    },
    inStock:{
        type:Boolean,
        required:true
    },
    review:{
        type:Object,
        required:false
    },
    rating:{
        type:Number,
        required:false
    },
    imgurl:{
        type:String,
        required:true
    },
});

module.exports = mongoose.model('Items',itemsSchema,'Items')