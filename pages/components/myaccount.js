import {  useRouter } from 'next/router'
import React, { useEffect ,useState} from 'react'
import Link from 'next/Link';
import { AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';
const Myaccount = (cart,clearCart,addToCart,RemoveFromCart,subTotal,saveCart) => {
    const router = useRouter()
    useEffect(()=>{
        if(!localStorage.getItem('myuser')){
            router.push('/')
        }

    },[router.query])
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

     
  }
  return (<div>
    <div className="flex flex-col text-center w-full mb-4">
    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-8 text-black">Update your account</h1>
    
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
      <button  className='disabled:bg-orange-100 bg-orange-400 rounded-md font-bold cursor-pointer flex items-center justify-center ml-72'>Update </button>
      <div className="flex flex-col text-center w-full mb-4">
    
       
     </div>
       
     
    </div>
  </div>
  </div>
  )
}

export default Myaccount