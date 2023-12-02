const express = require('express')
const Item = require('../models/items')
const itemRouter = express.Router()
itemRouter.use(express.json())

//GET ALL ITEMS 
itemRouter.get('/getall',async(req,res)=>{
    try{
        const items = await Item.find()
        res.json(items)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

//CREATE A NEW ITEM
itemRouter.post('/',async(req,res)=>{
    const item = new Item(req.body)
    try{
        const newItem = await item.save()
        res.status(201).send("New Item added successfully")
    }
    catch(err){
        res.status(400).json({message:"Something wrong with the data"})
    }
})

//GET ONE ITEM BASED ON ID *NEEDS WORK*
itemRouter.get('/:id',getItem,(req,res)=>{
    res.json(res.item)
})

//PATCH ITEM TO ADD REVIEW


//

//MIDDLEWARE TO GET THE ITEM
async function getItem(req,res,next){
    let item
    try{
        item = await Item.findById(req.params.id)
        if(item===null){
            return(
                res.status(404).json({message:"Item not found"})
            )
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
    res.item = item
    next()
}
module.exports = itemRouter