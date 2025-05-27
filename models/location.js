const mongoose =require("mongoose")
const locationSchema=mongoose.Schema({
    name:{ type: String, required: true},
    description:{ type: String, required: true },
    longitude:{ type: Number, required: true },
    latitude:{ type: Number, required: true },
    photo:{ type: String, required: false }
})
module.exports=mongoose.model('Location',locationSchema)