import order from '../models/order';
import connectDb from '../middlewares/mongoose';
import Jsonwebtoken from 'jsonwebtoken';
const handler = async(req,res)=>{
    const token= req.body.token;
    const data = Jsonwebtoken.verify(token,process.env.JWT_SECRET)
    console.log(data)
    let orders = await order.find({email:data.email})
    res.status(200).json({ orders })
  }
  
 export default connectDb(handler);