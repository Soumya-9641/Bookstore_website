import user from '../models/user';
import connectDb from '../middlewares/mongoose';
var CryptoJS = require("crypto-js");

const handler = async(req,res)=>{
    if(req.method=='POST'){
        console.log(req.body)
        const{username,email}=req.body
    let u = new user({username,email,password:CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString()});
    u.save()
    res.status(200).json({success:"success"})
    
    }
   
    else{
        res.status(400).json({error:"this method is not allowed"})
    }
}
export default connectDb(handler);