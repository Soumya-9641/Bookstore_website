import { useRouter } from 'next/router'
import React,{useEffect,useState} from 'react'

const forgot = () => {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')

  const handleChange= async (e)=>{
    if(e.target.name =='password'){
      setPassword(e.target.value) 
    }
    if(e.target.name =='cpassword'){
      setCpassword(e.target.value) 
    }
    if(e.target.name =='email'){
      setEmail(e.target.value) 
    }
  }
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
    console.log(router.query.token)
    
  }, [])
  

  const  sendEmail= async()=>{
    let data = {
      email,
      sendMail:true
    }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: 'POST', // or 'PUT'
      headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data),
   })
   let res = await a.json()
   if(res.success){
    console.log("Password reset instruction have been sent to your email")
   }else{
    console.log("error")
   }

  }
  const resetPassword = async()=>{
    if(password==cpassword){
    let data = {
      password,
      sendMail:true
    }
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: 'POST', // or 'PUT'
      headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(data),
   })
   let res = await a.json()
   if(res.success){
    console.log("Password has been changed")
   }else{
    console.log("error")
   }}
  }
  
  return (
    <div>
            <section className="h-screen">
  <div className="px-6 h-full text-gray-800">
    <div
      className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6" >
      <div
        className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
       
        <img
          src="https://agethemes.com/wp-content/uploads/edd/2020/02/lt-Web-Design-free-responsive-elementor-wordpress-theme-2.png"
          className="w-full"
          alt="Sample image"
        />
      </div>
      <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
      {router.query.token && <form>
          <div className="flex flex-row items-center justify-center lg:justify-start">
          </div>
          <div className="mb-6">
            <input
            value={password}
             onChange={handleChange}
              type="password"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="password"
              name="password"
              placeholder="New Password"
            />
          </div>
          <div className="mb-6">
            <input
            value={cpassword}
             onChange={handleChange}
              type="password"
              name="cpassword"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="confirm-password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
            </div>
          </div>

          <div className="text-center lg:text-left">
            <button
             onClick={resetPassword}
              type="button"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
            >
              Continue
            </button>
            
          </div>
         {password!==cpassword && 
         <span className='text-red-600'>Password dont match</span>
         }
         {password && password==cpassword && 
         <span className='text-green-600'>Password matched</span>
         }
         
         
        </form>}
      {!router.query.token && <form>
          <div className="flex flex-row items-center justify-center lg:justify-start">
          </div>
          <div className="mb-6">
            <input
            value={email}
             onChange={handleChange}
              type="email"
              name = "email"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="email-address"
              placeholder="Email address"
            />
          </div>


          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
             
             
            </div>
           
          </div>

          <div className="text-center lg:text-left">
            <button
            onClick={sendEmail}
              type="button"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Continue
            </button>
            
          </div>
        </form>}
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default forgot