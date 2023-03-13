import React from 'react';

const Driver = () => {
  return (
    <div className=''>
      <h1 className='text-5xl text-center'>Drivers</h1>

      <div>
        <div className='mx-auto h-14 w-5/6 bg-custom-bgColor mt-6 flex justify-between items-center'>
          <div className='flex items-center'>
            <input type="text" className='m-2 p-2 h-9 w-56 rounded-l-full focus:outline-none outline-none border-none bg-gray-200 text-custom-bgColor text-sm' placeholder='Search for something' />
            <button className='h-9 w-12 bg-gray-500 rounded-r-full relative -left-4'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 relative left-2 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </div>
          
          <div className=''>
            <button className='flex gap-1 p-1 items-center text-center bg-gray-500 w-24 h-9 text-sm rounded-full text-gray-100 mr-4 hover:text-custom-bgColor hover:bg-white font-bold transition-all duration-300'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <p>Add new</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Driver;