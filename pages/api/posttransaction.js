import order from '../models/order';
import connectDb from '../middlewares/mongoose';
import product from '../models/product';
import PaytmChecksum from 'paytmchecksum';
const handler = async(req,res)=>{

//   var paytmChecksum = "";
//   var paytmParams = {}
//   let data = req.body;
// const recieved_data = JSON.stringify(data);
// console.log(recieved_data)
// for(var key in recieved_data){
//     if(key=='CHECKSUMHASH'){
//         paytmChecksum= recieved_data;
//     }
//     else{
//         paytmParams[key] = recieved_data[key];
//     }
//   }
  
// var isValidChecksum = PaytmChecksum.verifySignature(paytmParams,process.env.PAYTM_MKEY,paytmChecksum);
// if(!isValidChecksum){
//     console.log("checksum mismatched");
//     res.status(500).send("Inter error");
//     return ;
// }

if(req.body.STATUS=='TXN_SUCCESS'){
    await order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'paid',paymentInfo:JSON.stringify(req.body),transactionid:req.body.TXNID})
     let Products = order.products
     console.log(Products)
     for(let slug in Products){ 
      console.log(slug,Products[slug].qyt)
      await product.findOneAndUpdate({slug:slug},{$inc :{"availability": -Products[slug].qyt}})
     }
  }
  else if(req.body.STATUS=='PENDING'){
    await order.findOneAndUpdate({orderId:req.body.ORDERID},{status:'paid',paymentInfo:JSON.stringify(req.body),transactionid:req.body.TXNID})
  }
  res.redirect('/components/orders',200)
  //res.status(200).json({body:req.body})
}

 export default connectDb(handler);
