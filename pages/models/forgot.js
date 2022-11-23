const mongoose = require('mongoose');

const forgotSchema = new mongoose.Schema({
  userid:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  token :{type:String , required:true}
},{timestamps:true});

mongoose.models={};

const forgotschema = mongoose.model.user || mongoose.model('user',forgotSchema)

  export default forgotschema ;
