const mongoose = require('mongoose'); 
//import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title:{type:String, required:true},
    slug:{type:String,required:true,unique:true},
    desc: {type:String},
    img:{type:String,required:true},
    catagory:{type:String,required:true},
    Type:{type:String},
   
    price:{type:Number,required:true},
    availability:{type:Number,required:true},

    
},{timestamps:true});
mongoose.models ={}
export default mongoose.model("product",productSchema);