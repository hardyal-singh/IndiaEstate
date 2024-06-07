import React, { useState } from 'react'
import Input from "../component/Input.jsx"
import Button from '../component/Button.jsx';
import {Link, useNavigate} from 'react-router-dom'

export default function SignOut() {
  const [error, setError]=useState(null);
  const [user, setUser]=useState(null);
  const [loader, setLoader]=useState(null);

  const navigate=useNavigate();

const onchange =(e)=>{
  setUser(pre=>({...pre, [e.target.name]:e.target.value}))
}

const onsubmit =async(e)=>{
  e.preventDefault();
try {
  setLoader(true)
  const res=await fetch ("/api/auth/signup", {
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(user)
  })
  const data=await res.json();
  console.log(data);
  if(data.success==false){
    setError(data.message);
    setLoader(false);
    return;
  }
  setLoader(false);
  alert(data.message)
  navigate('/sign-in')
  

} catch (error) {
  setLoader(false);
  setError(error.message);
}

}

  return (
    <div className='mx-auto p-3 mx-w-lg'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={onsubmit} className='flex flex-col gap-4'>
        <Input type="text" placeholder="Username" name="username" onChange={onchange} />
        <Input type="email" placeholder="Email" name="email" onChange={onchange}/>
        <Input type="password" placeholder="Password" name="password" onChange={onchange}/>
        <Button text={loader?'loading...':'Sign Up'}/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
