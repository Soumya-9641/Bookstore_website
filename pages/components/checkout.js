import React,{useState} from 'react'
import { AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';
import { BsFillBagCheckFill} from 'react-icons/bs';
import Link from 'next/Link';
import Head from 'next/head';
import Script from 'next/script';
const checkout =  ({cart,addToCart,RemoveFromCart,clearCart,subTotal,saveCart}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [mobile, setMobile] = useState('')
    const [pin, setPin] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [disabled, setdisabled] = useState(true)
    const handleChange= async (e)=>{
      
        if(e.target.name =='name'){
          setName(e.target.value) 
        }
       else if(e.target.name =='email'){
          setEmail(e.target.value)
        }
        else if(e.target.name =='address'){
          setAddress(e.target.value)
        }
        else if(e.target.name =='mobile'){
           setMobile(e.target.value)
        }
       
        else if(e.target.name =='city'){
          setCity(e.target.value)
        }
        else if(e.target.name =='state'){
          setState(e.target.value)
        }
        else if(e.target.name =='pin'){
          setPin(e.target.value)
          if(e.target.value.length==6){
            let pins= await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
            let pinJson = await pins.json();
         // console.log(pinJson,pin);
            if(Object.keys(pinJson).includes(e.target.value)) {
              setCity(pinJson[e.target.value][0])
              setState(pinJson[e.target.value][1])
              
            }else{
              setState('')
              setCity('')
            }
          }else{
            setState('')
              setCity('') 
          }
          
        }

        if(name.length>3 && email.length>3 && address.length>3 && mobile.length>3 && pin.length>3){
          setdisabled(false)
        }
        else{
          setdisabled(true)
        }
    }
    
  const paymentinitiate = async()=>{
    

    let oid = Math.floor(Math.random()*Date.now());
    const data ={cart,subTotal,oid,email:email,name,address,mobile,pin}
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: 'POST', // or 'PUT'
      headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data),
   })
   let txnRes = await a.json()
   console.log(txnRes)
   let txnToken = txnRes.txnToken
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
      "orderId": oid, /* update order id */
      "token": txnToken, /* update token value */
      "tokenType": "TXN_TOKEN",
      "amount": subTotal /* update amount */
      },
      "handler": {
      "notifyMerchant": function(eventName,data){
      console.log("notifyMerchant handler function called");
      console.log("eventName => ",eventName);
      console.log("data => ",data);
      }
      }
      };
      
      // initialze configuration using init method
      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
      // after successfully updating configuration, invoke JS Checkout
      window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error){
      console.log("error => ",error);
      });
      
};
  return (
   
     <div className="container px-5 py-24 mx-auto">
    <Head>
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
    </Head>
    <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}  crossorigin="anonymous"></Script>

    <div className="flex flex-col text-center w-full mb-4">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-8 text-black">Contact Us</h1>
      <h2 className='font-semibold'>1. Delivery Details</h2>
    </div>
   
    <div className="lg:w-1/2 md:w-2/3 mx-auto">
      <div className="flex flex-wrap -m-2">
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
            <input  onChange={handleChange} value={email} type="email" id="email" name="email" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="message" className="leading-7 text-sm text-gray-400">Address</label>
            <textarea onChange={handleChange} value={address} id="address" name="address" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">Contact Number</label>
            <input  onChange={handleChange} value={mobile} type="mobile" id="mobile" name="mobile" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">Pin Code</label>
            <input  onChange={handleChange} value={pin} type="pin" id="pin" name="pin" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">City</label>
            <input  onChange={handleChange} value={city} type="city" id="city" name="city" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <div className="p-2 w-1/2">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-400">State</label>
            <input  onChange={handleChange} value={state} type="state" id="state" name="state" className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
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
            <button disabled={disabled} onClick={paymentinitiate}  className='disabled:bg-orange-100 bg-orange-400 rounded-md font-bold cursor-pointer'>Pay SubTotal:₹{subTotal} </button>
            
    </ol>
  </div>
       
      </div>
    </div>
  </div>
  )
}

export default checkout
