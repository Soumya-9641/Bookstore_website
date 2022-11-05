const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {type: String,required:true},
    email:{type:String,required:true},
    paymentInfo:{type:String,default:''},
    products:{type:Object , required:true},
    address:{type:String,required:true},
    amount:{type:Number,required:true},
    status:{type:String,default:'initiated',required:true}
},{timestamps:true});

export default mongoose.model("order",orderSchema);