import React from 'react';
import 'animate.css';

const Header = () => {
  return (
    <div className='h-14 w-full bg-custom-bgColor'>
      <p className='font-bold text-2xl p-2 text-white flex items-center gap-6'>Fleet Manager <i class="zmdi zmdi-truck  zmdi-hc-lg zmdi-hc-flip-horizontal animate__animated animate__infinite	infinite animate__fadeInLeft"></i></p>
    </div>
  )
}

export default Header;