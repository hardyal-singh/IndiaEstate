import React from 'react'
import Input from "../component/Input.jsx"
import Button from '../component/Button.jsx';
import {Link} from 'react-router-dom'

export default function SignOut() {
  return (
    <div className='mx-auto p-3 mx-w-lg'>
      <h1 class="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <Input type="text" placeholder="Username" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button text='Sign Up'/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
