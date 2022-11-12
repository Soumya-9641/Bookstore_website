import order from '../models/order';
import connectDb from '../middlewares/mongoose';
import product from '../models/product';
const handler = async(req,res)=>{
if(req.body.STATUS=='TXN_SUCCESS'){
    await order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'paid',paymentInfo:JSON.stringify(req.body)})
     let Products = order.products
     console.log(Products)
     for(let slug in Products){ 
      console.log(slug,Products[slug].qyt)
      await product.findOneAndUpdate({slug:slug},{$inc :{"availability": -Products[slug].qyt}})
     }
  }
  else if(req.body.STATUS=='PENDING'){
    await order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'paid',paymentInfo:JSON.stringify(req.body)})
  }
  res.redirect('/components/orders',200)
  //res.status(200).json({body:req.body})
}

 export default connectDb(handler);
