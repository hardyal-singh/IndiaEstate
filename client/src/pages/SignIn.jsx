import React, { useState } from 'react'
import Input from "../component/Input.jsx"
import Button from '../component/Button.jsx';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFaliure } from '../redux/user/userSlice.js';

export default function SignOut() {
  const dispatch=useDispatch();
  const selector=useSelector(state=>state.user);
  const {error, loading}=selector;
 
  const [user, setUser]=useState(null);
  

  const navigate=useNavigate();

const onchange =(e)=>{
  setUser(pre=>({...pre, [e.target.name]:e.target.value}))
}

const onsubmit =async(e)=>{
  e.preventDefault();
try {
  dispatch(signInStart());
  const res=await fetch ("/api/auth/signin", {
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body:JSON.stringify(user)
  })
  const data=await res.json();
  console.log(data);
  if(data.status==false){
    dispatch(signInFaliure(data.message))
    return;
  }
  dispatch(signInSuccess(data))
  navigate('/')
  

} catch (error) {
  dispatch(signInFaliure(error.message))
}

}

  return (
    <div className='mx-auto p-3 mx-w-lg sm:w-2/3'>
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={onsubmit} className='flex flex-col gap-4'>
        <Input type="email" placeholder="Email" name="email" onChange={onchange}/>
        <Input type="password" placeholder="Password" name="password" onChange={onchange}/>
        <Button disabled ={loading} text={loading?'loading...':'Sign In'}/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-out'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
