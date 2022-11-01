import React from 'react'
import { AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';
import { BsFillBagCheckFill} from 'react-icons/bs';
import Link from 'next/Link';
import Head from 'next/head';
const checkout = async ({cart,addToCart,RemoveFromCart,clearCart,subTotal,saveCart}) => {
  
  
  let oid =Math.floor(Math.random()*Date.now())
  //get a transaction token

 const data = { cart,subTotal,oid,email:"email" };

  let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
    method: 'POST', // or 'PUT'
    headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(data),
 })
  let txnToken = await a.json();
  console.log(txnToken)
  const paymentinitiate = {
    "root": "",
    "style": {
        "bodyColor": "",
        "themeBackgroundColor": "",
        "themeColor": "",
        "headerBackgroundColor": "",
        "headerColor": "",
        "errorColor": "",
        "successColor": ""
    },
    "flow": "DEFAULT",
    "data": {
        "orderId":oid ,
        "token": txnToken,
        "tokenType": "TXN_TOKEN",
        "amount": subTotal,
        "userDetail": {
            "mobileNumber": "",
            "name": ""
        }
    },
    "merchant": {
        "mid": "",
        "name": "",
        "redirect": true
    },
    "labels": {},
    "payMode": {
        "labels": {},
        "filter": [],
        "order": []
    },
    "handler": {}
};
  return (
   
     <div className="container px-5 py-24 mx-auto">
    <Head>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
    </Head>
    <div className="flex flex-col text-center w-full mb-4">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-8 text-black">Contact Us</h1>
      <h2 className='font-semibold'>1. Delivery Details</h2>
    </div>
   
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap -m-2">
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">Name</label>
            <input type="text" id="name" name="name" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="message" className="leading-7 text-sm text-gray-400">Address</label>
            <textarea id="message" name="message" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">Contact Number</label>
            <input type="text" id="name" name="name" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">Pin Code</label>
            <input type="text" id="name" name="name" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-full">
          <button className="flex mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg"><Link href={'/components/oders'}>Proceed To Pay</Link></button>
        </div>
        <div className="flex flex-col text-center w-full mb-4">
      
          <h2 className='font-semibold mt-5'>1. Product Review</h2>
       </div>
          <div  className='sidebar bg-orange-200 px-8 py-10'>
            <h2 className='font-bold text-xl'>Shopping cart</h2>
    
            <ol className='list-decimal font-semibold'>
            {Object.keys(cart).length==0 && <div className='my-4 font-bold text-base'>Your cart is empty</div>}
            { Object.keys(cart).map((k)=>{return <li key={k} >
            <div className='item flex my-3 text-base'>
            <div className='w-2/3 font-semibold'>{cart[k].name}</div>
            <div className='flex font-semibold item-center justify-center w-1/3'><AiOutlineMinusCircle onClick={()=>{RemoveFromCart(k,1,cart[k].price,cart[k].size,cart[k].name,cart[k].varient)}} className='mt-1 mx-2 cursor-pointer'/>{cart[k].qyt}<AiOutlinePlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].size,cart[k].name,cart[k].varient)}} className='mt-1 mx-2 cursor-pointer text-lg'/> </div>
            </div>
          </li>}) }
            <span onClick={paymentinitiate} className='font-bold'>SubTotal:₹{subTotal} </span>
            
    </ol>
  </div>
       
      </div>
    </div>
  </div>
  )
}

export default checkout
