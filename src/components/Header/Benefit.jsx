import React from 'react'
function Benefit({Comp,heading,para}) {
  return (
    <div className='bg-white shadow-lg p-2  max-w-96 h-32'>
        <div className='grid grid-cols-[90px,auto] mt-4'>
        <div className='inline-block w-8 ms-4 bg-gray-300 shadow-2xl rounded-full p-1 '>
        <Comp className='text-green-500 p-0  rounded-full'/>
        </div>
        <h2 className=''>{heading}</h2>
        <p className='col-start-2'>{para}</p>

        </div>
    </div>
  )
}

export default Benefit