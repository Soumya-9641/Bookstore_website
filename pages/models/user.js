const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
},{timestamps:true});

mongoose.models={};

const userschema = mongoose.model.user || mongoose.model('user',userSchema)

  export default userschema ;
