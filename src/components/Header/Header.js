import React from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';

const Header = () => {
  return (
    <div className='h-14 w-full bg-custom-bgColor flex items-center justify-between'>

      <Link to={"/"}>
        <p className='font-bold text-2xl p-2 text-white flex items-center gap-6'>Fleet Manager <i class="zmdi zmdi-truck  zmdi-hc-lg zmdi-hc-flip-horizontal animate__animated animate__infinite	infinite animate__fadeInLeft"></i></p>
      </Link>

      <nav>
        <ul className='flex gap-3 text-white mx-8 font-bold'>
          <li className='hover:cursor-pointer hover:text-gray-300'>
            <Link to={"/"}>Home</Link>
          </li>
          <li className='hover:cursor-pointer hover:text-gray-300'>
            <Link to={"/driver"}>Drivers</Link>
          </li>
          <li className='hover:cursor-pointer hover:text-gray-300'>
            <Link to={"/vehicle"}>Vehicles</Link>
          </li>
          <li className='hover:cursor-pointer hover:text-gray-300'>
            <Link to={"/trips"}>Trips</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header;