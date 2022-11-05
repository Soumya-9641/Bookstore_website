import React from 'react';
import Link from 'next/Link';
import mongoose from 'mongoose';
import product from '../models/product';
//import connectDb from '../middlewares/mongoose';

const NewArrival = ({products}) => {
  console.log(products)
  return (
    <div>
      <section className="text-gray-600 body-font">
     <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-wrap -m-4 justify-center">
     {products.map((item)=>{

     return  <Link key={item._id} href={`/products/${item.slug}`}>
     <div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-5">
        <a className="block relative  rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center  h-[20vh] block" src={item.img}/>
        </a>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">{item.title}</h2>
          <p className="mt-1">₹{item.price}</p>
        </div>
      </div>
      </Link>})}
    </div>
  </div>
</section>
    </div>
  )
}
export async function getServerSideProps(context) {
  if(!mongoose.connections[0].readyState){
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await product.find({catagory:'new-arrival'})
  console.log(products)
  return {
    props: {products:JSON.parse(JSON.stringify(products))}, // will be passed to the page component as props
  }
}



export default NewArrival