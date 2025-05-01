const express=require("express")
const Categorie=require("../models/categorie")
const router=express.Router()
const {auth} = require('../middleware/auth.js');

router.post("/",async(req,res)=>{ console.log(req.body);    
const cat1=new Categorie(req.body)
try {
    await cat1.save()
    res.status(200).json(cat1)
} catch (error) {
    res.status(404).json({message:error.message})
    
}
})

router.put("/:id",async(req,res)=>{
    try {
        const cat1 = await Categorie.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
            );
            res.status(200).json(cat1);  
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})

router.get('/',async(req,res)=>{

    try {
        const cat= await Categorie.find({}, null, {sort: {'_id': -1}})
        res.status(200).json(cat)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
   
})
router.get("/:id",async(req,res)=>{
try {
    const cat=await Categorie.findById(req.params.id)
    res.status(200).json(cat)
} catch (error) {
    res.status(404).json({message:error.message})
}

})
router.delete("/:id",async(req,res)=>{
    try {
        await Categorie.findByIdAndDelete(req.params.id)
        res.status(200).json({messge:"catégorie supprimée"})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
})


module.exports=router