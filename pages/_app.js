import '../styles/globals.css'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState,useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import LoadingBar from 'react-top-loading-bar'
function MyApp({ Component, pageProps }) {

  const [cart , setCart] = useState({});
  const [subTotal,setSubTotal] = useState(0);
  const [user, setUser] = useState({value:null})
  const [key, setKey] = useState()
  const [progress, setProgress] = useState(0)
  const router = useRouter();

  useEffect(() => {
    router.events.on('routerChangeComplete',()=>{
      setProgress(100)
    })
   console.log("Hey useeffect is running at _app.js");
   try {
    if(localStorage.getItem("cart")){
      setCart(JSON.parse(localStorage.getItem("cart")));
      saveCart(JSON.parse(localStorage.getItem("cart")));
     }
   } catch (error) {
    console.error(error);
     }
     const token = localStorage.getItem('token')
     if(token){
      setUser({value:token})
      setKey(Math.random())
     }
  }, [router.query])
  

  const saveCart=(mycart)=>{
    localStorage.setItem("cart",JSON.stringify(mycart))
     subTotal=0;
    let keys=Object.keys(mycart);
   // console.log(keys);
        for(let i=0;i<keys.length;i++){
        subTotal+= mycart[keys[i]].price * mycart[keys[i]].qyt;
    }
    setSubTotal(subTotal);
    //console.log("Hello")
  }

  const logout = ()=>{
    localStorage.removeItem('token')
    setUser({value:null})
    setKey(Math.random())
    router.push('/')
  }

 const addToCart=(itemcode,qyt,price ,name,size,varient)=>{
     let newCart = cart;
     if(itemcode in cart){
        newCart[itemcode].qyt =cart[itemcode].qyt+qyt;
     }else{
      newCart[itemcode] = {qyt : 1 , name,size,varient,price}
     }
     setCart(newCart);
      saveCart(newCart);
 }
 const RemoveFromCart=(itemcode,qyt,price ,name,size,varient)=>{
  let newCart = cart;
  if(itemcode in cart){
     newCart[itemcode].qyt =cart[itemcode].qyt-qyt;
  }
  console.log(newCart[itemcode])
  if(newCart[itemcode]["qyt"]<=0){
    delete newCart[itemcode];
  }
  setCart(newCart);
   saveCart(newCart);
}
const buyNow=(itemcode,qyt,price ,name,size,varient)=>{
  let newCart = {itemcode: {qyt : 1 , name,size,name,varient,price}};
  // if(itemcode in cart){
  //    newCart[itemcode].qyt =cart[itemcode].qyt+qyt;
  // }else{
  //  newCart[itemcode] = {qyt : 1 , name,size,varient,price}
  // }
  setCart(newCart);
   saveCart(newCart);
   router.push("/components/checkout")
 
}
 const clearCart=()=>{
 // console.log("cart has been cleared")
  setCart({});
  saveCart({});
  
 }
  return <>
   <LoadingBar
        color='#00FF00'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
  {key && <Navbar logout={logout} user={user} key={key} cart={cart} addToCart={addToCart} saveCart={saveCart} RemoveFromCart={RemoveFromCart} clearCart={clearCart} subTotal={subTotal} />}

  <Component  buyNow ={buyNow} cart={cart} addToCart={addToCart} saveCart={saveCart} RemoveFromCart={RemoveFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
  <Footer/>
  </> 
}

export default MyApp
