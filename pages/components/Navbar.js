import React, { useRef,useState } from 'react';
import { BsCart4 } from 'react-icons/bs';
import { AiFillCloseCircle,AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';
import { BsFillBagCheckFill} from 'react-icons/bs';
import {MdAccountCircle} from 'react-icons/md'
import Link from 'next/Link';
import LoadingBar from 'react-top-loading-bar'

const navbar = ({logout,user,cart,addToCart,RemoveFromCart,clearCart,subTotal,saveCart}) => {
  const [dropdown, setDropdown] = useState(false)
 
 // console.log(cart,addToCart,RemoveFromCart,clearCart,subTotal,saveCart);
  const ref = useRef()
  const toggleCart = ()=>{
      if(ref.current.classList.contains('translate-x-full')){
        ref.current.classList.remove('translate-x-full')
        ref.current.classList.add('translate-x-0')
      }
      else if(!ref.current.classList.contains('translate-x-full')){
        ref.current.classList.remove('translate-x-0')
        ref.current.classList.add('translate-x-full')
      }
  }
  
  return (
    <div className='sticky top-0 z-50 text-gray-600 body-font bg-gray-400'>
    <header className=" text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
    <Link href={'/'}>
     <img className='w-12 h-12'src='\Untitled design.jpg' alt='' />
     </Link> 
    
    </a>
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      
    <span className="ml-3 text-xl">Bookstore.com</span>
    </a>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center font-bold">
      <Link href={'/components/NewArrival'}><a className="mr-5 hover:text-gray-900">New Arrival</a></Link>
      <Link href={'/components/Fiction'}><a className="mr-5 hover:text-gray-900">Fiction Books</a></Link>
      <Link href={'/components/Awardwinners'}><a className="mr-5 hover:text-gray-900">Award Winners</a></Link>
      <Link href={'/components/Bestsellers'}><a className="mr-5 hover:text-gray-900">Best Sellers</a></Link>
    </nav>
    <span className='' onMouseOver={()=>{setDropdown(true)}} onMouseLeave={()=>{setDropdown(false)}}>
    {user.value && <button  className="inline-flex items-center bg-orange-400 border-0 py-1 px-3 focus:outline-none hover:bg-orange-200 rounded text-xl md:text-2xl mt-4 md:mt-0 mx-5 text-black">
    <MdAccountCircle />

<svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
  <path d="M5 12h14M12 5l7 7-7 7"></path>
</svg>
</button>}
 {dropdown &&<div  className='cursor-pointer top-0 right-0 bg-orange-200 p-5 font-bold rounded-lg  '>
  
        <ul>
      <Link href={'/components/myaccount'}><a> <li className='py-1 text-black  hover:text-gray-700 text-sm'>My Account</li></a></Link>
      <Link  href={'/components/orders'}><a> <li className='py-1 text-black  hover:text-gray-700 text-sm'>Orders</li></a></Link>
     <li onClick={logout} className='py-1 text-black  hover:text-gray-700 text-sm'>Log Out</li>
        </ul>
    </div>}
</span>
    
    {!user.value && <Link href={'/components/login'}>
    <button className="inline-flex items-center bg-orange-400 border-0 py-1 px-3 focus:outline-none hover:bg-orange-200 rounded text-xl md:text-2xl mt-4 md:mt-0 mx-5 text-black">

      Login
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button></Link>}
   
    <button onClick={toggleCart} className="inline-flex items-center bg-orange-400 border-0 py-1 px-3 focus:outline-none hover:bg-orange-200 rounded text-xl md:text-2xl mt-4 md:mt-0 mx-5 text-black">< BsCart4/>
    
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </div>
 
  <div ref={ref} className='sidebar overflow-y-scroll absolute top-0 right-0 bg-orange-200 p-10 transform transition-transform translate-x-full'>
    <h2 className='font-bold text-xl'>Shopping cart</h2>
    <span onClick={toggleCart} className='absolute top-2 right-2 cursor-pointer text-xl text-orange-700'><AiFillCloseCircle/></span>
    
    <ol className='list-decimal font-semibold'>
    {Object.keys(cart).length==0 && <div className='my-4 font-bold text-base'>Your cart is empty</div>}
     { Object.keys(cart).map((k)=>{return <li key={k} >
        <div className='item flex my-3 text-base'>
        <div className='w-2/3 font-semibold'>{cart[k].name}</div>
        <div className='flex font-semibold item-center justify-center w-1/3'><AiOutlineMinusCircle onClick={()=>{RemoveFromCart(k,1,cart[k].price,cart[k].size,cart[k].name,cart[k].varient)}} className='mt-1 mx-2 cursor-pointer'/>{cart[k].qyt}<AiOutlinePlusCircle onClick={()=>{addToCart(k,1,cart[k].price,cart[k].size,cart[k].name,cart[k].varient)}} className='mt-1 mx-2 cursor-pointer'/></div>
        </div>
      </li>}) }
      <span className='font-bold'>SubTotal:₹{subTotal} </span>
      <div className='flex'>
      <div className="p-2 w-full">
         <button className="flex mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-700 rounded text-lg"><BsFillBagCheckFill className='text-xl m-1'/><Link href={'/components/checkout'}>Checkout</Link> </button>
        </div>
        <div className="p-2 w-full">
          <button onClick={clearCart} className="flex mx-auto text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-orange-700 rounded text-lg"><BsFillBagCheckFill className='text-xl m-1'/>ClearCart </button>
        </div>
      </div>
    </ol>
  </div>
  
</header>
 
</div>

  )
  
}

export default navbar