import React from 'react'

export default function Button({text, className, ...rest}) {
  return (
    <button {...rest} className={`${className} text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 `}>{text}</button>
  )
}
