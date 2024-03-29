//import { Promise } from 'mongoose';
const https = require('https');
const PaytmChecksum = require('paytmchecksum');

import order from '../models/order';
import connectDb from '../middlewares/mongoose';
import product from '../models/product';
import pincode from "../../pincode.json";
export default async function handler (req,res){
            
            if(req.method=='POST'){
                var paytmParams = {}
            let Product,sumTotal=0;
            // if(!Object.keys(pincode).includes(req.body.pin)){
            //     res.status(200).json({success:false,"error":"This pincode is not servicesable!"})
            //     return 
            // }
            //check the cart is tempered with
            let cart=req.body.cart
            // for( let item in cart){
            //     console.log(item)
            //     sumTotal+=cart[item].price*cart[item].qyt
            //     Product = await product.findOne({slug:item})
            //     if(req.body.subTotal <=0){
            //         res.status(200).json({success:false,"error":"Your cart is empty!please build your cart and try later",clearCart:true});
            //     }
            //     if(Product.availability < cart[item].qyt){
            //         res.status(200).json({success:false,"error":"some items in your cart is out of stock.Please try again later. ",clearCart:true})
            //     }

            //     if(Product.price!=cart[item].price){
            //         res.status(200).json({success:false,"error":"The price of some items in your cart have changes.Please try again"})
            //         return 
            //     }
            // } 
            // if(sumTotal!==req.body.subTotal){
            //     res.status(200).json({success:false,"error":"The price of some items in your cart have changes.Please try again"})
            //     return 
            // }

            // //check if items are out of stock

            // if(req.body.mobile.length!=10 || !Number.isInteger(Number(req.body.mobile))){
            //     res.status(200).json({success:false,"error":" Please enter your 10 digit number",clearCart:false})
            //     return 
            // }
            // if(req.body.pin.length!=6 || !Number.isInteger(Number(req.body.pin))){
            //     res.status(200).json({success:false,"error":" Please enter your 10 digit number",clearCart:false})
            //     return 
            // }

            //check if details are valid 


                // let Order = new order({
                //     email:req.body.email,
                //     orderId:req.body.oid,
                //     address:req.body.address,
                //     amount:req.body.subTotal,
                //     products:req.body.cart,
                //     custid:req.body.cid
                // })
                // await Order.save()

    
    paytmParams.body = {
        "requestType"   : "Payment",
        "mid"           : process.env.NEXT_PUBLIC_PAYTM_MID,
        "websiteName"   : "WEBSTAGING",
        "orderId"       : req.body.oid,
        "callbackUrl"   : `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
        "txnAmount"     : {
            "value"     : req.body.subTotal,
            "currency"  : "INR",
        },
        "userInfo"      : {
            "custId"    : req.body.email,
        },
    };
    
    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
   const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY )
    
        paytmParams.head = {
            "signature"    : checksum
        };
    
        var post_data = JSON.stringify(paytmParams);
        const requestAsync=()=>{
            return new Promise((resolve,reject)=>{
                var options = {
    
                            /* for Staging */
                            hostname: 'securegw-stage.paytm.in',
                    
                            /* for Production */
                            // hostname: 'securegw.paytm.in',
                    
                            port: 443,
                            path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                           
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Content-Length': post_data.length
                            }
                        };
                    
                        var response = "";
                        var post_req = https.request(options, function(post_res) {
                            post_res.on('data', function (chunk) {
                                response += chunk;
                            });
                    
                            post_res.on('end', function(){
                        let ress = JSON.parse(response)
                             console.log('Response: ', ress);
                     ress.success=true
                    resolve(ress);
                            });
                        });
                    
                     post_req.write(post_data);
                        post_req.end();
                    
            })
        }
        let myr = await requestAsync()
        res.status(200).json(myr)
        
    

    }
 }

