import order from '../models/order';
import connectDb from '../middlewares/mongoose';

const handler = async(req,res)=>{
if(req.body.STATUS=='TXN_SUCCESS'){
    await order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'paid',paymentInfo:JSON.stringify(req.body)})
   
  }
  else if(req.body.STATUS=='PENDING'){
    await order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'paid',paymentInfo:JSON.stringify(req.body)})
  }
  res.redirect('/components/order',200)
  res.status(200).json({body:req.body})
}

 export default connectDb(handler);
