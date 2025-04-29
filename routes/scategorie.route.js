const express=require("express")
const Scategorie=require("../models/scategorie")
const router=express.Router()

router.post("/",async(req,res)=>{
const scat1=new Scategorie(req.body)
try {
    await scat1.save()
    res.status(200).json(scat1)
} catch (error) {
    res.status(404).json({message:error.message})
    
}
})

router.put("/:id",async(req,res)=>{
    try {
        const scat1 = await Scategorie.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
            );
            res.status(200).json(scat1);  
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})

router.get('/',async(req,res)=>{

    try {
        const scat= await Scategorie.find({}, null, {sort: {'_id': -1}}).populate("categorieID")
        res.status(200).json(scat)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
   
})
router.get("/:id",async(req,res)=>{
try {
    const scat=await Scategorie.findById(req.params.id)
    res.status(200).json(scat)
} catch (error) {
    res.status(404).json({message:error.message})
}

})
router.delete("/:id",async(req,res)=>{
    try {
        await Scategorie.findByIdAndDelete(req.params.id)
        res.status(200).json({messge:"sous catégorie supprimée"})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
})


module.exports=router