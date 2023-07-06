const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    reciept:{
        type:String,
        required:true
    }
},{timestamps:true})

mongoose.models ={}
const paymentschema =mongoose.model.paymentschema ||  mongoose.model("paymentschema",paymentSchema)
export default paymentschema ;