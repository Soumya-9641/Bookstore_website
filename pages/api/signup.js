import user from '../models/user';
import connectDb from '../middlewares/mongoose';
var CryptoJS = require("crypto-js");

const handler = async(req,res)=>{
    if(req.method=='POST'){
        console.log(req.body)
        const{username,email}=req.body
        let password=CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    let u = new user({username,email,password});
   await  u.save()
    res.status(200).json({success:"success"})
    
    } 
   
    else{
        res.status(400).json({error:"this method is not allowed"})
    }
}
export default connectDb(handler);