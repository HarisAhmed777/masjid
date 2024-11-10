import React from 'react'

function Button({name,bgcolor}) {
  return (
    <button className={`p-2 ${bgcolor} text-white rounded`}>{name}</button>
  )
}

export default Button