const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:Array,
        required:false
    }
})

module.exports = mongoose.model('Customers',customerSchema,'Customers')