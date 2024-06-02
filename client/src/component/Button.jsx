import React from 'react'

export default function Button({text}) {
  return (
    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{text}</button>
  )
}
