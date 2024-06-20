import React from 'react'
export default function Button({text, className, textColor="text-white" ,...rest}) {
  return (
    <button {...rest} className={`${className} ${textColor} p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 `}>{text}</button>
  )
}
