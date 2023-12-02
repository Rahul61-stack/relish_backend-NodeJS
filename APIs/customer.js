const express = require('express')
const customerRouter = express.Router()
const Customer = require('../models/customers')
const bcrypt = require('bcrypt')
const saltRounds = 10

//API TO GET ALL THE CUSTOMERS
customerRouter.get('/getall',async(req,res)=>{
    try{
        const customers = await Customer.find()
        res.json(customers)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

//API TO ADD CUSTOMER TO DB
customerRouter.post('/',checkEmail,hashPassowrd,async(req,res)=>{
    console.log(req.body)
    const customer = new Customer({
        name:req.body.name,
        email:res.email,
        password:res.password
    })
    try{
        const newCustomer = customer.save()
        res.status(201).json({message:"New Customer Added successfully"})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

//API TO VALIDATE THE LOGIN ATTEMPT, ENTIRE VALIDATION DONE IN MIDDLEWARE
customerRouter.post('/loginvalidation',loginValidation,(req,res)=>{})

//API TO ADD ADDRESS TO A CUSTOMER
customerRouter.patch('/:id',getCustomer,async(req,res)=>{
    res.customer.address = [...res.customer.address,req.body]
    try{
        const updatedCustomer = await res.customer.save()
        res.status(200).json({message:"Address added successfullly",bool:true})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})
//TO GET ONE CUSTOMER BASED ON ID
customerRouter.get('/:id',getCustomer,(req,res)=>[
    res.json(res.customer)
])
//MIDDLEWARES

//FUNCTION TO GET CUSTOMER BASED ON ID
async function getCustomer(req,res,next){
    let customer
    try{
        customer = await Customer.findById(req.params.id)
        if(customer == null){
            return res.status(404).json({message:"Customer not found"})
        }
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
    res.customer = customer
    next()
}

//FUNCTION TO HASH PASSWORD
async function hashPassowrd(req,res,next){
    let password = req.body.password
    bcrypt.hash(password,saltRounds,function(err,hash){
        if(err){
            return res.status(500).json({message:err.message})
        }
        console.log(hash)
        res.password = hash
        next()
    })
}

//FUNCTION TO VALIDATE LOGIN
async function loginValidation(req,res,next){
    let email = req.body.email
    let password = req.body.password
    try{
       const existingUser = await Customer.findOne({email})
        //EMAIL VALIDATION
       if(!existingUser){
        return res.status(404).json({message:"Email not found",isLoggedIn:false})
       }
       //PASSWORD VALIDATION
       const match = await bcrypt.compare(password,existingUser.password)
       if(match){
        return res.status(200).json({message:"Login Verified Successfully",isLoggedIn:true,id:existingUser._id})
       }
       else{
        return res.status(400).json({message:"Password is incorrect",isLoggedIn:false})
       }
       //ERROR HANDLING
    }catch(err){
        return res.status(500).json({message:"Something went wrong, Please try again later",isLoggedIn:false})
    }
}

//FUNCTION TO CHECK WHETHER THE EMAIL USED IS UNIQUE
async function checkEmail(req,res,next){
    const email = req.body.email
    try{
        const existingUser = await Customer.findOne({email})
        console.log(existingUser)
        if(existingUser){
            return res.status(400).json({message:"Email already exists"})
        }
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
    res.email = email
    next()
}

module.exports = customerRouter