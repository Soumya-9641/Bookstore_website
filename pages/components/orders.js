import {React ,useEffect,useState}from 'react'
import Link from 'next/Link';
import { useRouter } from 'next/router';
const orders = () => {
  const [orders, setOrders] = useState([])
    const router = useRouter()
    useEffect(()=>{
      const fetchOrders = async ()=>{
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
          method: 'POST', // or 'PUT'
          headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({token : JSON.parse(localStorage.getItem('myuser')).token}),
       })
       let res = await a.json()
      setOrders(res.orders)

       //console.log(res)
      }
     
        if(!localStorage.getItem('myuser')){
            router.push('/')
        }
        else{
          fetchOrders()
        }

    },[router.query])
  return (
    <div className='min-h-screen'>
        <div className="flex flex-col">
        <h1 className='font-bold text-center px-2 py-4 bg-orange-300'>My Order</h1>
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
               Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Amount
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
          {orders.map((item)=>{
            return <tr key={item._id} className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.orderId}</td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               {item.email}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {item.amount}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <Link href={'/components/checkorder?id='+ item._id}><a>Details</a></Link>
              </td>
            </tr>
          })
              
          }
            
            
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}
// export async function getServerSideProps(context) {
//     if(!mongoose.connections[0].readyState){
//       await mongoose.connect(process.env.MONGO_URI)
//     }
//     let orders = await order.find({})
    
//     return {
//       props: {orders:JSON.parse(JSON.stringify(orders))}, // will be passed to the page component as props
//     }
//   }

export default orders