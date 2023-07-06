

const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')

import payment from '../models/paymentdetails';
import connectDb from '../middlewares/mongoose';
const razorpay = new Razorpay({
	key_id: 'rzp_test_NqBEWmLJAJOnjU',
	key_secret: 'aZ9IjR6mvLs3C6N1ZDU8CPyE'
})
export default async function handler (req,res){


    if(req.method=='POST'){
        const payment_capture = 1
       // const amount = 1
        const currency = 'INR'
        
       // console.log(req.body.subTotal);
        console.log("hello")
        const options = {
            amount: req.body.subTotal*100,
            currency,
            receipt: req.body.oid,
            payment_capture
        }
        console.log(options)
    //     let paymentdetails =  new payment({
    //         name : req.body.name,
    //     email :req.body.email,
    //     mobile: req.body.mobile,
    //     currency ,
    //     reciept:req.body.oid,
    //     amount:req.body.subTotal
    //    })
    //  await  paymentdetails.save();
        try {
            const response = await razorpay.orders.create(options)
            
            console.log(response)
            res.status(200).json({
                id: response.id,
                currency: response.currency,
                amount: response.amount
            })
        } catch (error) {
            console.log(error)
        }
    }


}