import user from '../models/user';
import connectDb from '../middlewares/mongoose';
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async(req,res)=>{
    if(req.method=='POST'){
        //console.log(req.body)
        let User = await user.findOne({"email": req.body.email})
        
        console.log(User.email)
        console.log(User.password)
        const bytes =CryptoJS.AES.decrypt(User.password, process.env.SECRET_KEY);
        let  decryptedData= bytes.toString(CryptoJS.enc.Utf8);
        if(User){
            if(req.body.email==User.email && req.body.password==decryptedData){
                var token = jwt.sign({email:User.email,username:User.username}, process.env.JWT_SECRET); 
                res.status(200).json({success:true,token,email:user.email})
            }
            else{
                res.status(200).json({success:false,error:"Invalid credentials"})
            }
        }
        else{
            res.status(200).json({success:false,error:"No user found"})
        }
    }
   
    else{
        res.status(400).json({error:"this method is not allowed"})
    }
}
export default connectDb(handler);