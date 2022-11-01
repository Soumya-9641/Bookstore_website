import {  useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Myaccount = () => {
    const router = useRouter()
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            router.push('/')
        }

    },[router.query])
  return (
    <div>Myaccount</div>
  )
}

export default Myaccount