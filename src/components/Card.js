import React from 'react'

const Card = ({ data, icon, label }) => {
  return (
    <div className='w-72 md:w-52 h-40 rounded-lg bg-custom-bgColor text-white flex items-center justify-evenly'>
      <div className='mx-3'>
        <i className={`${icon} zmdi-hc-4x`}></i>
        <h2 className='text-2xl font-bold'>{label}</h2>
      </div>

      <div className='flex flex-col text-right'>
        <span className='m-2 mx-3 text-4xl font-bold'>{data.count}</span>
        <span className='m-2 mx-3 font-bold'>active: {data.active}</span>
      </div>
    </div>
  )
}

export default Card;