import user from '../models/user';
import connectDb from '../middlewares/mongoose';
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async(req,res)=>{
    if(req.method=='POST'){
        //console.log(req.body)
        let User = await user.findOne({"email": req.body.email})
        const bytes =CryptoJS.AES.decrypt(User.password, 'secret key 123');
        let  decryptedData= bytes.toString(CryptoJS.enc.Utf8);
        if(User){
            if(req.body.email==User.email && req.body.password==decryptedData){
                var token = jwt.sign({email:User.email,username:User.username}, 'jwtsecret', {
                    expiresIn: "10h"}); 
                res.status(200).json({success:true,token})
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