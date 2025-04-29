const express=require("express")
const Location=require("../models/location")
const router=express.Router()


router.post("/",async(req,res)=>{
const loc1=new Location(req.body)
try {
    await loc1.save()
    res.status(200).json(loc1)
} catch (error) {
    res.status(404).json({message:error.message})
    
}
})

router.put("/:id",async(req,res)=>{
    try {
        const loc1 = await Location.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
            );
            res.status(200).json(loc1);  
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})

router.get('/',async(req,res)=>{

    try {
        const loc= await Location.find({}, null, {sort: {'_id': -1}})
        res.status(200).json(loc)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
   
})
router.get("/:id",async(req,res)=>{
try {
    const loc=await Location.findById(req.params.id)
    res.status(200).json(loc)
} catch (error) {
    res.status(404).json({message:error.message})
}

})
router.delete("/:id",async(req,res)=>{
    try {
        await Location.findByIdAndDelete(req.params.id)
        res.status(200).json({messge:"location supprimée"})
    } catch (error) {
        res.status(404).json({message:error.message})
    }
    
})


module.exports=router